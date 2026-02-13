// Options page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  loadOptions();
  
  document.getElementById('saveBtn').addEventListener('click', saveOptions);
  document.getElementById('clearCacheBtn').addEventListener('click', clearCache);
});

function loadOptions() {
  chrome.storage.sync.get(
    ['googleMapsApiKey', 'destination', 'arrivalTime', 'maxCommuteMinutes', 'hideAboveMax'],
    (result) => {
      document.getElementById('apiKey').value = result.googleMapsApiKey || '';
      document.getElementById('destination').value = result.destination || '';
      document.getElementById('arrivalTime').value = result.arrivalTime || '08:30';
      document.getElementById('maxCommuteMinutes').value = result.maxCommuteMinutes || 60;
      document.getElementById('hideAboveMax').checked = result.hideAboveMax || false;
    }
  );
}

function saveOptions() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const destination = document.getElementById('destination').value.trim();
  const arrivalTime = document.getElementById('arrivalTime').value;
  const maxCommuteMinutes = parseInt(document.getElementById('maxCommuteMinutes').value);
  const hideAboveMax = document.getElementById('hideAboveMax').checked;
  
  // Validate inputs
  if (!apiKey) {
    showStatus('Please enter a Google Maps API key', 'error');
    return;
  }
  
  if (!destination) {
    showStatus('Please enter a destination address', 'error');
    return;
  }
  
  if (isNaN(maxCommuteMinutes) || maxCommuteMinutes < 1) {
    showStatus('Please enter a valid maximum commute time', 'error');
    return;
  }
  
  // Save to chrome.storage
  chrome.storage.sync.set(
    {
      googleMapsApiKey: apiKey,
      destination: destination,
      arrivalTime: arrivalTime,
      maxCommuteMinutes: maxCommuteMinutes,
      hideAboveMax: hideAboveMax
    },
    () => {
      if (chrome.runtime.lastError) {
        showStatus('Error saving settings: ' + chrome.runtime.lastError.message, 'error');
      } else {
        showStatus('Settings saved successfully! Refresh FINN.no pages to see changes.', 'success');
      }
    }
  );
}

function clearCache() {
  chrome.storage.local.get(null, (items) => {
    const keysToRemove = Object.keys(items).filter(key => key.startsWith('finn-commute-'));
    
    if (keysToRemove.length === 0) {
      showStatus('Cache is already empty', 'success');
      return;
    }
    
    chrome.storage.local.remove(keysToRemove, () => {
      if (chrome.runtime.lastError) {
        showStatus('Error clearing cache: ' + chrome.runtime.lastError.message, 'error');
      } else {
        showStatus(`Cache cleared! Removed ${keysToRemove.length / 2} cached entries.`, 'success');
      }
    });
  });
}

function showStatus(message, type) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  statusEl.classList.remove('hidden');
  
  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      statusEl.classList.add('hidden');
    }, 5000);
  }
}
