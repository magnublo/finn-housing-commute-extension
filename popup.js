// Popup JavaScript

document.addEventListener('DOMContentLoaded', () => {
  loadStatus();
  
  document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  
  document.getElementById('clearCache').addEventListener('click', clearCache);
});

function loadStatus() {
  chrome.storage.sync.get(
    ['googleMapsApiKey', 'destination', 'arrivalTime', 'maxCommuteMinutes', 'hideAboveMax'],
    (result) => {
      const statusEl = document.getElementById('status');
      const infoEl = document.getElementById('info');
      
      const hasApiKey = result.googleMapsApiKey && result.googleMapsApiKey.length > 0;
      const hasDestination = result.destination && result.destination.length > 0;
      
      if (hasApiKey && hasDestination) {
        statusEl.className = 'status configured';
        statusEl.textContent = '✅ Extension is configured and active';
        
        infoEl.innerHTML = `
          <strong>Destination:</strong> ${escapeHtml(result.destination)}<br>
          <strong>Arrival time:</strong> ${result.arrivalTime || '08:30'}<br>
          <strong>Max commute:</strong> ${result.maxCommuteMinutes || 60} minutes<br>
          <strong>Hide listings:</strong> ${result.hideAboveMax ? 'Yes' : 'No'}
        `;
      } else {
        statusEl.className = 'status not-configured';
        statusEl.textContent = '⚠️ Extension needs configuration';
        
        const missing = [];
        if (!hasApiKey) missing.push('Google Maps API key');
        if (!hasDestination) missing.push('Destination address');
        
        infoEl.innerHTML = `
          Please configure the following:<br>
          <strong>${missing.join(', ')}</strong>
        `;
      }
    }
  );
}

function clearCache() {
  chrome.storage.local.get(null, (items) => {
    const keysToRemove = Object.keys(items).filter(key => key.startsWith('finn-commute-'));
    
    if (keysToRemove.length === 0) {
      alert('Cache is already empty');
      return;
    }
    
    chrome.storage.local.remove(keysToRemove, () => {
      if (chrome.runtime.lastError) {
        alert('Error clearing cache: ' + chrome.runtime.lastError.message);
      } else {
        alert(`Cache cleared! Removed ${keysToRemove.length / 2} cached entries.`);
      }
    });
  });
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
