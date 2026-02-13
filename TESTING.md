# Testing Guide for FINN Housing Commute Extension

## Prerequisites

1. Google Chrome browser
2. A Google Maps API key with Directions API enabled
3. The extension loaded in Chrome

## Installation for Testing

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `finn-housing-commute-extension` directory
5. The extension should now appear in your extensions list

## Configuration

1. Click the extension icon in Chrome toolbar
2. Click "Open Settings"
3. Enter the following:
   - **Google Maps API Key**: Your API key
   - **Destination Address**: e.g., "Karl Johans gate 22, Oslo, Norway"
   - **Desired Arrival Time**: e.g., "08:30"
   - **Maximum Commute Time**: e.g., "60" minutes
   - **Hide listings above maximum**: Check or uncheck as desired
4. Click "Save Settings"
5. Verify the success message appears

## Test Cases

### Test 1: Basic Functionality on Test Page

**Setup:**
1. Open `test-page.html` in Chrome
2. Make sure to enable "Allow access to file URLs" for the extension in chrome://extensions

**Expected Results:**
- Each article should show a commute time badge at the top
- Badges should be color-coded:
  - Green (🚇) for commutes within max time
  - Yellow (⏱️) for commutes exceeding max time
  - Red (⚠️) for errors
- The last listing (invalid address) should show an error

**What to Check:**
- [ ] Commute badges appear on all listings
- [ ] Colors are appropriate based on commute time
- [ ] Error message appears for invalid address
- [ ] After 3 seconds, a new listing is dynamically added and processed

### Test 2: Real FINN.no Testing

**Setup:**
1. Navigate to https://www.finn.no/realestate/homes/search.html
2. Ensure extension is configured

**Expected Results:**
- Commute times appear on visible listings
- As you scroll, new listings are processed
- Hidden listings (if filtering enabled) are not visible

**What to Check:**
- [ ] Extension works on real FINN.no pages
- [ ] Commute times are accurate
- [ ] MutationObserver detects new listings when scrolling
- [ ] No JavaScript errors in console (F12)

### Test 3: Caching

**Setup:**
1. Load test page or FINN.no search
2. Wait for commute times to load
3. Refresh the page

**Expected Results:**
- On first load: Commute times take a few seconds to appear
- On second load: "(cached)" appears next to commute times
- Commute times appear faster

**What to Check:**
- [ ] Cache indicator "(cached)" appears on refresh
- [ ] Cached results load faster than initial requests
- [ ] Results remain consistent

### Test 4: Filtering (Hide Above Max)

**Setup:**
1. Configure extension with max commute time of 30 minutes
2. Enable "Hide listings above maximum"
3. Load test page or FINN.no

**Expected Results:**
- Listings with commute > 30 minutes are hidden
- Only listings within 30 minutes are visible

**What to Check:**
- [ ] Listings are hidden based on commute time
- [ ] Disabling the setting shows all listings again
- [ ] DOM attribute `data-finn-commute-hidden="true"` is set on hidden elements

### Test 5: Configuration Changes

**Setup:**
1. Load test page with listings processed
2. Change destination in options
3. Observe the page

**Expected Results:**
- All existing commute badges are removed
- New commute times are calculated with new destination
- Page updates automatically without refresh

**What to Check:**
- [ ] Configuration changes trigger reprocessing
- [ ] Old data is cleared
- [ ] New calculations use updated settings

### Test 6: Error Handling

**Test 6a: No API Key**
1. Clear the API key in settings
2. Load a page with listings

**Expected:** Error badges appear on all listings with message about missing API key

**Test 6b: Invalid API Key**
1. Enter an invalid API key
2. Load a page with listings

**Expected:** Error badges with "API request denied" message

**Test 6c: No Destination**
1. Clear destination address
2. Load a page

**Expected:** No processing occurs (no badges appear)

**Test 6d: Invalid Address**
1. Use the test listing with invalid address

**Expected:** Error badge with appropriate message

**What to Check:**
- [ ] Errors don't break the page
- [ ] Error messages are clear and helpful
- [ ] Other listings still process despite errors

### Test 7: Cache Management

**Setup:**
1. Process several listings
2. Open extension popup
3. Click "Clear Cache"

**Expected Results:**
- Success message appears
- Number of cleared entries is shown
- Refresh page to see non-cached results

**What to Check:**
- [ ] Cache clears successfully
- [ ] Count of cleared items is accurate
- [ ] After clearing, "(cached)" indicator doesn't appear

### Test 8: Popup Status Display

**Setup:**
1. Click extension icon

**Expected Results:**
- Shows configuration status
- Displays current settings
- Provides quick access to settings and cache management

**What to Check:**
- [ ] Status shows "configured" when API key and destination are set
- [ ] Status shows "needs configuration" when missing required fields
- [ ] Current settings are displayed accurately
- [ ] "Open Settings" button works
- [ ] "Clear Cache" button works

### Test 9: Performance

**Setup:**
1. Load FINN.no page with many listings
2. Scroll through the page

**Expected Results:**
- Only visible listings are processed
- No lag or freezing
- API calls are batched/throttled

**What to Check:**
- [ ] Page remains responsive
- [ ] Console shows no performance warnings
- [ ] Network tab shows reasonable API usage
- [ ] Scrolling is smooth

### Test 10: Different Arrival Times

**Setup:**
1. Test with arrival time in the past (today)
2. Test with arrival time in the future

**Expected Results:**
- Past times are interpreted as tomorrow
- Future times work correctly
- Transit schedules are considered

**What to Check:**
- [ ] Arrival time parameter is correctly sent to API
- [ ] Results reflect time-of-day differences

## Debugging

### Browser Console
Press F12 to open Developer Tools and check:
- Console for errors or warnings
- Network tab for API requests/responses
- Application > Storage > Chrome Local/Sync Storage to inspect saved data

### Common Issues

**Issue: No commute times appear**
- Check: API key is valid
- Check: Destination is set
- Check: Console for errors
- Check: Extension has required permissions

**Issue: "API request denied"**
- Check: Directions API is enabled in Google Cloud Console
- Check: API key has correct restrictions
- Check: Billing is enabled (if needed)

**Issue: Commute times are inaccurate**
- Check: Destination address is correct
- Check: Arrival time is set properly
- Check: Listings have valid addresses

## Manual Validation Checklist

Before considering the extension complete:

- [ ] All test cases pass
- [ ] No console errors on test page
- [ ] No console errors on FINN.no
- [ ] Extension loads without errors
- [ ] All settings save correctly
- [ ] Cache works as expected
- [ ] Filtering works correctly
- [ ] Dynamic content is detected
- [ ] Error handling is graceful
- [ ] Performance is acceptable
- [ ] UI is clear and user-friendly
- [ ] Documentation is accurate

## Browser Testing

Test in multiple Chrome versions if possible:
- [ ] Chrome Stable (latest)
- [ ] Chrome Beta (if available)

## API Quota Monitoring

Monitor your Google Cloud Console to ensure:
- [ ] API calls are within expected range
- [ ] No unexpected costs
- [ ] Caching is working (fewer API calls on subsequent loads)

## Notes

- Keep the test-page.html for future regression testing
- Document any issues found in GitHub Issues
- Consider adding automated tests in the future
