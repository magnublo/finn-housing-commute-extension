// Background service worker for handling Google Maps API requests

const CACHE_PREFIX = 'finn-commute-';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCommuteTime') {
    handleCommuteRequest(request.data)
      .then(sendResponse)
      .catch(error => sendResponse({ error: error.message }));
    return true; // Will respond asynchronously
  }
  
  if (request.action === 'getApiKey') {
    chrome.storage.sync.get(['googleMapsApiKey'], (result) => {
      sendResponse({ apiKey: result.googleMapsApiKey || '' });
    });
    return true;
  }
});

async function handleCommuteRequest(data) {
  const { origin, destination, arrivalTime } = data;
  
  // Create cache key
  const cacheKey = `${CACHE_PREFIX}${origin}-${destination}-${arrivalTime}`;
  
  // Check cache first
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) {
    return { success: true, data: cachedData, fromCache: true };
  }
  
  // Get API key from storage
  const config = await chrome.storage.sync.get(['googleMapsApiKey', 'destination', 'arrivalTime']);
  const apiKey = config.googleMapsApiKey;
  
  if (!apiKey) {
    return { success: false, error: 'Google Maps API key not configured. Please set it in the extension options.' };
  }
  
  // Make API request
  try {
    const result = await fetchCommuteTime(origin, destination, arrivalTime, apiKey);
    
    // Cache the result
    await cacheData(cacheKey, result);
    
    return { success: true, data: result, fromCache: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function fetchCommuteTime(origin, destination, arrivalTime, apiKey) {
  // Convert arrival time to Unix timestamp if it's provided
  let arrivalTimestamp = '';
  if (arrivalTime) {
    const now = new Date();
    const [hours, minutes] = arrivalTime.split(':').map(Number);
    const arrival = new Date(now);
    arrival.setHours(hours, minutes, 0, 0);
    
    // If the time has passed today, set it for tomorrow
    if (arrival < now) {
      arrival.setDate(arrival.getDate() + 1);
    }
    
    arrivalTimestamp = Math.floor(arrival.getTime() / 1000);
  }
  
  // Build Google Maps Directions API URL
  const params = new URLSearchParams({
    origin: origin,
    destination: destination,
    mode: 'transit',
    key: apiKey
  });
  
  if (arrivalTimestamp) {
    params.append('arrival_time', arrivalTimestamp);
  } else {
    // If no arrival time, use departure time as current time
    params.append('departure_time', 'now');
  }
  
  const url = `https://maps.googleapis.com/maps/api/directions/json?${params}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status !== 'OK') {
    if (data.status === 'ZERO_RESULTS') {
      throw new Error('No public transport routes found');
    } else if (data.status === 'REQUEST_DENIED') {
      throw new Error('API request denied. Check your API key and permissions.');
    } else {
      throw new Error(`API error: ${data.status}`);
    }
  }
  
  // Extract duration from the first route
  const route = data.routes[0];
  const leg = route.legs[0];
  const durationMinutes = Math.ceil(leg.duration.value / 60);
  
  return {
    duration: durationMinutes,
    durationText: leg.duration.text,
    origin: leg.start_address,
    destination: leg.end_address
  };
}

async function getCachedData(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key, `${key}_timestamp`], (result) => {
      const data = result[key];
      const timestamp = result[`${key}_timestamp`];
      
      if (!data || !timestamp) {
        resolve(null);
        return;
      }
      
      // Check if cache has expired
      const now = Date.now();
      if (now - timestamp > CACHE_TTL) {
        // Cache expired, remove it
        chrome.storage.local.remove([key, `${key}_timestamp`]);
        resolve(null);
        return;
      }
      
      resolve(data);
    });
  });
}

async function cacheData(key, data) {
  return new Promise((resolve) => {
    const cacheObject = {
      [key]: data,
      [`${key}_timestamp`]: Date.now()
    };
    chrome.storage.local.set(cacheObject, resolve);
  });
}

// Clear expired cache on startup
chrome.runtime.onStartup.addListener(() => {
  clearExpiredCache();
});

chrome.runtime.onInstalled.addListener(() => {
  clearExpiredCache();
});

function clearExpiredCache() {
  chrome.storage.local.get(null, (items) => {
    const now = Date.now();
    const keysToRemove = [];
    
    for (const key in items) {
      if (key.startsWith(CACHE_PREFIX)) {
        const timestampKey = `${key}_timestamp`;
        const timestamp = items[timestampKey];
        
        if (timestamp && now - timestamp > CACHE_TTL) {
          keysToRemove.push(key);
          keysToRemove.push(timestampKey);
        }
      }
    }
    
    if (keysToRemove.length > 0) {
      chrome.storage.local.remove(keysToRemove);
    }
  });
}
