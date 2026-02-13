// Content script for FINN.no housing search results

let config = {};
let processedListings = new Set();

// Initialize
initialize();

async function initialize() {
  // Load configuration from storage
  config = await loadConfig();
  
  // Process initial listings
  processVisibleListings();
  
  // Set up mutation observer for dynamic content
  setupMutationObserver();
  
  // Listen for scroll events to process newly visible listings
  window.addEventListener('scroll', debounce(processVisibleListings, 500));
}

async function loadConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      ['destination', 'arrivalTime', 'maxCommuteMinutes', 'hideAboveMax', 'googleMapsApiKey'],
      (result) => {
        resolve({
          destination: result.destination || '',
          arrivalTime: result.arrivalTime || '08:30',
          maxCommuteMinutes: result.maxCommuteMinutes || 60,
          hideAboveMax: result.hideAboveMax || false,
          googleMapsApiKey: result.googleMapsApiKey || ''
        });
      }
    );
  });
}

function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    // Check if new listings were added
    let shouldProcess = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldProcess = true;
        break;
      }
    }
    
    if (shouldProcess) {
      processVisibleListings();
    }
  });
  
  // Observe the search results container
  const resultsContainer = document.querySelector('main') || document.body;
  observer.observe(resultsContainer, {
    childList: true,
    subtree: true
  });
}

function processVisibleListings() {
  if (!config.destination || !config.googleMapsApiKey) {
    return; // Not configured yet
  }
  
  // Find all listing cards
  const listingCards = findListingCards();
  
  listingCards.forEach(card => {
    const listingId = getListingId(card);
    
    // Skip if already processed
    if (processedListings.has(listingId)) {
      return;
    }
    
    // Check if the card is visible in the viewport
    if (!isInViewport(card)) {
      return;
    }
    
    processedListings.add(listingId);
    processListing(card);
  });
}

function findListingCards() {
  // FINN uses article elements for listing cards
  // This selector may need adjustment based on FINN's actual DOM structure
  const cards = document.querySelectorAll('article[class*="ads__unit"]');
  return Array.from(cards);
}

function getListingId(card) {
  // Try to extract a unique ID from the card
  // Could be from data attributes, href, or other unique identifiers
  const link = card.querySelector('a[href*="/realestate/homes/ad.html"]');
  if (link) {
    return link.href;
  }
  
  // Fallback to a generated ID based on position
  return `card-${Array.from(card.parentElement.children).indexOf(card)}`;
}

function extractAddress(card) {
  // Extract address from the listing card
  // This selector may need adjustment based on FINN's actual DOM structure
  
  // Try different possible selectors
  const addressSelectors = [
    '[class*="address"]',
    '[class*="location"]',
    'h2 + div',
    '[data-testid*="address"]'
  ];
  
  for (const selector of addressSelectors) {
    const element = card.querySelector(selector);
    if (element && element.textContent.trim()) {
      return element.textContent.trim();
    }
  }
  
  // Try to extract from heading
  const heading = card.querySelector('h2, h3');
  if (heading) {
    // Often the address is near the heading
    const nextElement = heading.nextElementSibling;
    if (nextElement && nextElement.textContent.trim()) {
      return nextElement.textContent.trim();
    }
  }
  
  return null;
}

async function processListing(card) {
  const address = extractAddress(card);
  
  if (!address) {
    injectCommuteInfo(card, {
      error: 'Address not found',
      duration: null
    });
    return;
  }
  
  // Send request to background script to get commute time
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'getCommuteTime',
      data: {
        origin: address,
        destination: config.destination,
        arrivalTime: config.arrivalTime
      }
    });
    
    if (response.success) {
      injectCommuteInfo(card, {
        duration: response.data.duration,
        durationText: response.data.durationText,
        fromCache: response.fromCache
      });
      
      // Apply hiding if needed
      if (config.hideAboveMax && response.data.duration > config.maxCommuteMinutes) {
        hideListingCard(card);
      }
    } else {
      injectCommuteInfo(card, {
        error: response.error,
        duration: null
      });
    }
  } catch (error) {
    injectCommuteInfo(card, {
      error: error.message,
      duration: null
    });
  }
}

function injectCommuteInfo(card, info) {
  // Create or update commute info element
  let commuteElement = card.querySelector('.finn-commute-info');
  
  if (!commuteElement) {
    commuteElement = document.createElement('div');
    commuteElement.className = 'finn-commute-info';
    
    // Insert at the top of the card
    const insertTarget = card.querySelector('[class*="result-item"]') || card.firstElementChild;
    if (insertTarget) {
      insertTarget.insertAdjacentElement('afterbegin', commuteElement);
    } else {
      card.insertAdjacentElement('afterbegin', commuteElement);
    }
  }
  
  if (info.error) {
    commuteElement.innerHTML = `
      <div class="finn-commute-error">
        <span class="finn-commute-icon">⚠️</span>
        <span class="finn-commute-text">${escapeHtml(info.error)}</span>
      </div>
    `;
    commuteElement.classList.add('error');
  } else {
    const icon = info.duration <= config.maxCommuteMinutes ? '🚇' : '⏱️';
    const statusClass = info.duration <= config.maxCommuteMinutes ? 'good' : 'warning';
    const cacheIcon = info.fromCache ? ' 💾' : '';
    
    commuteElement.innerHTML = `
      <div class="finn-commute-success ${statusClass}">
        <span class="finn-commute-icon">${icon}</span>
        <span class="finn-commute-text">PT commute: ${info.duration} min${cacheIcon}</span>
      </div>
    `;
    commuteElement.classList.remove('error');
  }
}

function hideListingCard(card) {
  card.style.display = 'none';
  card.setAttribute('data-finn-commute-hidden', 'true');
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  // Consider elements that are within or near the viewport (with some buffer)
  const buffer = 500; // pixels
  return (
    rect.top < windowHeight + buffer &&
    rect.bottom > -buffer &&
    rect.left < windowWidth + buffer &&
    rect.right > -buffer
  );
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Listen for configuration changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    // Reload config and reprocess all listings
    loadConfig().then(newConfig => {
      config = newConfig;
      processedListings.clear();
      
      // Remove all existing commute info
      document.querySelectorAll('.finn-commute-info').forEach(el => el.remove());
      
      // Show all hidden cards
      document.querySelectorAll('[data-finn-commute-hidden="true"]').forEach(card => {
        card.style.display = '';
        card.removeAttribute('data-finn-commute-hidden');
      });
      
      // Reprocess
      processVisibleListings();
    });
  }
});
