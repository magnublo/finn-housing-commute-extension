# Quick Start Guide 🚀

Get up and running with the FINN Housing Commute Extension in 5 minutes!

## Step 1: Get a Google Maps API Key (5 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services** → **Library**
4. Search for "Directions API" and click **Enable**
5. Go to **APIs & Services** → **Credentials**
6. Click **Create Credentials** → **API Key**
7. Copy your API key (starts with `AIza...`)

**Important:** Keep your API key secure! Don't share it publicly.

### Optional: Restrict Your API Key

For better security:
1. Click on your API key to edit it
2. Under "API restrictions", select "Restrict key"
3. Choose "Directions API" from the list
4. Save

## Step 2: Install the Extension (1 minute)

### For Chrome Users:

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `finn-housing-commute-extension` folder
6. The extension icon (blue square with train) should appear in your toolbar

## Step 3: Configure the Extension (2 minutes)

1. **Click the extension icon** in your Chrome toolbar
2. Click **"Open Settings"**
3. Fill in the required information:

   ```
   Google Maps API Key: [Paste your API key here]
   Destination Address: Karl Johans gate 22, Oslo, Norway
   Desired Arrival Time: 08:30
   Maximum Commute Time: 60 minutes
   ☐ Hide listings above maximum commute time
   ```

4. Click **"Save Settings"**
5. You should see: ✓ "Settings saved successfully!"

## Step 4: Use the Extension (Instant!)

1. Navigate to [FINN.no housing search](https://www.finn.no/realestate/homes/search.html)
2. Search for homes in your preferred area
3. **Watch the magic happen!** Each listing will show:
   - 🚇 Green badge = Good commute (within your max)
   - ⏱️ Yellow badge = Long commute (exceeds your max)
   - ⚠️ Red badge = Error (e.g., no public transport available)

### Example Result:

```
┌─────────────────────────────────────┐
│ 🚇 PT commute: 32 min               │  ← Automatically added!
└─────────────────────────────────────┘
Fin leilighet i Grünerløkka
Thorvald Meyers gate 30, 0555 Oslo
4 500 000 kr
```

## Common Settings Explained

### Destination Address
**What it is:** Your work address or anywhere you commute to regularly.

**Examples:**
- `Karl Johans gate 22, Oslo, Norway`
- `Oslo Sentralstasjon`
- `Universitetsgaten 1, Oslo`

**Tip:** Use full addresses for better accuracy.

### Desired Arrival Time
**What it is:** What time you want to arrive at your destination.

**Examples:**
- `08:30` - For 8:30 AM arrival
- `17:00` - For 5:00 PM arrival

**Why it matters:** Public transport schedules vary throughout the day. The extension calculates based on when you need to arrive.

### Maximum Commute Time
**What it is:** The longest commute you're willing to accept (in minutes).

**Examples:**
- `30` - Only see homes within 30-minute commute
- `60` - See homes within 1-hour commute
- `90` - See homes within 1.5-hour commute

**Tip:** Start conservative (30-45 min) and increase if needed.

### Hide Listings Above Maximum
**What it does:** Automatically hides listings that exceed your maximum commute time.

**When to enable:**
- ✓ When you have a strict commute requirement
- ✓ When you want to reduce listing clutter
- ✓ When browsing large result sets

**When to disable:**
- ✓ When you want to see all options
- ✓ When you're flexible about commute time
- ✓ When you're just exploring

## Tips for Best Results

### 1. Enable File URL Access (For Testing)
If you want to test with `test-page.html`:
1. Go to `chrome://extensions/`
2. Find "FINN Commute Extension"
3. Click "Details"
4. Enable "Allow access to file URLs"

### 2. Check Your Results are Cached
Look for the 💾 icon next to commute times. This means:
- The result was loaded from cache (faster!)
- No API call was made
- You're saving on API quota

### 3. Clear Cache When Needed
**When to clear cache:**
- After changing your destination
- When you think routes have changed
- When testing different scenarios

**How to clear:**
- Click extension icon → "Clear Cache"
- Or go to Settings → "Clear Cache"

### 4. Monitor Your API Usage
Visit [Google Cloud Console](https://console.cloud.google.com/) to check:
- How many API requests you've made
- Your current costs (should be $0 with free tier)
- Any errors or issues

**Expected usage:** ~3,000 requests/month = ~$15 (within $200 free credit)

### 5. Adjust for Weekdays vs Weekends
**Note:** Currently, the extension uses the next occurrence of your arrival time. 

**Planning tip:** Test on the same day of the week you'd be commuting:
- Check on a Wednesday for weekday commutes
- Check on a Saturday for weekend commutes

## Troubleshooting

### "Extension needs configuration" Warning
**Solution:** Click "Open Settings" and enter your API key and destination.

### No Commute Times Appearing
**Possible causes:**
1. ❌ No API key set → Go to settings and add your API key
2. ❌ No destination set → Add your destination address
3. ❌ Not on FINN.no → Make sure you're on a FINN housing search page
4. ❌ Extension not enabled → Check `chrome://extensions/`

**Debug:** Press F12 → Console tab → Look for errors

### "API request denied" Errors
**Possible causes:**
1. ❌ Invalid API key → Double-check your API key
2. ❌ Directions API not enabled → Enable it in Google Cloud Console
3. ❌ Billing not set up → Add billing info (you won't be charged with free tier)

**Fix:** Visit Google Cloud Console and verify your setup

### "No public transport routes found"
**What it means:** There's no public transport connection between the listing and your destination.

**This is normal for:**
- Remote/rural properties
- Properties far from public transport
- Invalid addresses

**Solution:** This is just informational. The property might require a car.

### Listings Not Updating When Scrolling
**Try:**
1. Refresh the page (F5)
2. Clear cache (extension icon → "Clear Cache")
3. Check console for errors (F12)

### Cache Not Working
**Verify:**
1. Look for 💾 icon after refreshing the page
2. Second loads should be much faster
3. Check Application → Storage in DevTools

## Getting Help

### Check the Documentation
- **README.md** - Comprehensive user guide
- **TESTING.md** - Detailed testing instructions
- **IMPLEMENTATION.md** - Technical details

### Common Questions

**Q: Is my data safe?**
A: Yes! The extension only sends addresses to Google Maps API. No personal data is collected or shared.

**Q: How much will this cost?**
A: Most users will stay within Google's $200/month free tier. Typical usage is ~$15/month.

**Q: Can I use this on mobile?**
A: Not currently. This is a Chrome extension for desktop browsers.

**Q: Does it work on other real estate sites?**
A: No, it's specifically designed for FINN.no. However, the code could be adapted.

**Q: Can I contribute or report bugs?**
A: Yes! Please open an issue on GitHub.

## Next Steps

Now that you're set up:

1. ✓ Browse FINN.no and watch commute times appear
2. ✓ Adjust your settings as needed
3. ✓ Use the filtering feature to hide long commutes
4. ✓ Share feedback or report issues on GitHub

Happy house hunting! 🏠🚇
