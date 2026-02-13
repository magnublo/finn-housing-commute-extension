# FINN Housing Commute Extension 🚇

A Chrome extension that adds public transport commute times to FINN.no housing search results, helping you find homes with convenient commutes to your workplace.

## Features

- **Automatic Commute Calculation**: Shows public transport commute time on each FINN housing listing
- **Configurable Destination**: Set your work address or any destination
- **Arrival Time**: Configure desired arrival time for accurate schedule-based calculations
- **Smart Filtering**: Hide listings that exceed your maximum commute threshold
- **Intelligent Caching**: Caches results for 24 hours to minimize API usage
- **Dynamic Content Support**: Works with FINN's infinite scroll and dynamic loading
- **Visual Indicators**: Color-coded badges showing whether commutes are within your preference

## Installation

### Prerequisites

1. A Google Maps API key with the Directions API enabled
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Directions API"
   - Create credentials (API key)

### Install the Extension

#### Option 1: Install from Chrome Web Store (when published)
*Coming soon*

#### Option 2: Install as Unpacked Extension (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/magnublo/finn-housing-commute-extension.git
   cd finn-housing-commute-extension
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top-right corner)

4. Click "Load unpacked" and select the extension directory

5. The extension icon should now appear in your Chrome toolbar

## Configuration

1. Click the extension icon in your Chrome toolbar
2. Click "Open Settings" to access the configuration page
3. Enter your settings:
   - **Google Maps API Key**: Your API key (required)
   - **Destination Address**: Your work or target destination (e.g., "Karl Johans gate 22, Oslo")
   - **Desired Arrival Time**: Target arrival time in 24-hour format (default: 08:30)
   - **Maximum Commute Time**: Your preferred maximum commute in minutes (default: 60)
   - **Hide listings above maximum**: Toggle to automatically hide listings exceeding your max commute

4. Click "Save Settings"

## Usage

1. Navigate to [FINN.no housing search](https://www.finn.no/realestate/homes/search.html)
2. The extension will automatically process visible listings
3. Each listing will show a commute time badge:
   - 🚇 **Green badge**: Commute within your maximum time
   - ⏱️ **Yellow badge**: Commute exceeds your maximum time
   - ⚠️ **Red badge**: Error calculating commute (e.g., address not found)
4. Scroll down to load more listings - they'll be processed automatically

## Features in Detail

### Commute Calculation
- Uses Google Maps Directions API with `mode=transit`
- Calculates based on your configured arrival time
- Takes into account public transport schedules
- Results are cached for 24 hours to reduce API calls

### Filtering
- When "Hide listings above maximum" is enabled, listings exceeding your max commute are automatically hidden
- Toggle this setting in the options page to show/hide filtered listings

### Cache Management
- Commute times are cached for 24 hours
- Clear cache manually from the popup or options page
- Cache is automatically cleaned on browser startup

### Error Handling
- Gracefully handles missing or ambiguous addresses
- Shows error messages on individual listings
- Doesn't break the page if API calls fail

## API Usage and Costs

This extension uses the Google Maps Directions API. Be aware of:

- **Free tier**: Google provides $200 credit per month
- **Cost**: Directions API costs $5 per 1000 requests (as of 2024)
- **Caching**: The extension caches results for 24 hours to minimize costs
- **Batch processing**: Only visible listings are processed

**Estimated usage**: If you view 100 listings/day and each is cached for 24h, you'll use ~3,000 requests/month = ~$15/month (well within the free $200 credit).

## Development

### Project Structure

```
finn-housing-commute-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for API requests
├── content.js            # Content script for DOM manipulation
├── content.css           # Styles for injected elements
├── options.html          # Settings page HTML
├── options.js            # Settings page logic
├── options.css           # Settings page styles
├── popup.html            # Extension popup HTML
├── popup.js              # Extension popup logic
├── icons/                # Extension icons
└── README.md             # This file
```

### Key Components

- **Content Script** (`content.js`): Injected into FINN.no pages, extracts addresses and displays commute times
- **Background Service Worker** (`background.js`): Handles Google Maps API requests and caching
- **Options Page** (`options.html`, `options.js`): User configuration interface
- **Popup** (`popup.html`, `popup.js`): Quick status and settings access

### Building and Testing

The extension doesn't require a build step. To test:

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Refresh any FINN.no tabs to see changes

## Troubleshooting

### Extension not working
- Verify you've entered a valid Google Maps API key
- Ensure the Directions API is enabled in your Google Cloud project
- Check that you've set a destination address
- Open the browser console (F12) to check for errors

### No commute times showing
- Make sure you're on a FINN.no housing search page
- Verify your API key has permissions for the Directions API
- Check the extension popup to see configuration status

### API errors
- **"API request denied"**: Check your API key and ensure Directions API is enabled
- **"No public transport routes found"**: The address may not have public transport access
- **Rate limit errors**: You may have exceeded your API quota

### Clear cache if needed
- Click the extension icon
- Click "Clear Cache"
- Refresh the FINN.no page

## Privacy and Data

- **No data collection**: This extension doesn't collect or transmit any personal data
- **Local storage only**: All settings and cache are stored locally in your browser
- **API calls**: Only addresses from FINN listings and your configured destination are sent to Google Maps API
- **Open source**: All code is available for inspection in this repository

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See LICENSE file for details

## Acknowledgments

- FINN.no for providing the housing search platform
- Google Maps API for transit directions data

## Support

For issues, questions, or suggestions, please [open an issue](https://github.com/magnublo/finn-housing-commute-extension/issues) on GitHub.
