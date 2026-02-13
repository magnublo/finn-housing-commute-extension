# Extension Screenshots and Visual Examples

Since this is a Chrome extension that requires installation and API configuration to function, this document provides textual representations of what users will see.

## 1. Extension Icon in Chrome Toolbar

```
┌─────────────────────────────────────────────────┐
│ Chrome Browser Toolbar                          │
├─────────────────────────────────────────────────┤
│  [Home] [Bookmark] ... [Extensions]  [🚇]  [⋮] │
└─────────────────────────────────────────────────┘
                                         ↑
                          FINN Commute Extension Icon
                          (Blue square with train symbol)
```

## 2. Extension Popup (When Icon is Clicked)

### Configured State:
```
┌────────────────────────────────────────┐
│ 🚇 FINN Commute Extension              │
├────────────────────────────────────────┤
│                                        │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ ✅ Extension is configured and   ┃ │
│ ┃    active                        ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                        │
│ Destination: Karl Johans gate 22, Oslo│
│ Arrival time: 08:30                   │
│ Max commute: 60 minutes               │
│ Hide listings: No                     │
│                                        │
│ ╔════════════════════════════════════╗ │
│ ║      Open Settings                 ║ │
│ ╚════════════════════════════════════╝ │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │      Clear Cache                   │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### Unconfigured State:
```
┌────────────────────────────────────────┐
│ 🚇 FINN Commute Extension              │
├────────────────────────────────────────┤
│                                        │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ ⚠️ Extension needs configuration ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                        │
│ Please configure the following:       │
│ Google Maps API key, Destination      │
│ address                               │
│                                        │
│ ╔════════════════════════════════════╗ │
│ ║      Open Settings                 ║ │
│ ╚════════════════════════════════════╝ │
└────────────────────────────────────────┘
```

## 3. Options/Settings Page

```
┌──────────────────────────────────────────────────────────────────┐
│ 🚇 FINN Commute Extension Settings                              │
│ Configure your commute preferences for FINN housing search      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ╔══════════════════════════════════════════════════════════════╗ │
│ ║ Google Maps API Configuration                                ║ │
│ ╠══════════════════════════════════════════════════════════════╣ │
│ ║                                                               ║ │
│ ║ Google Maps API Key *          [Get API Key ↗]              ║ │
│ ║ ┌────────────────────────────────────────────────────────┐  ║ │
│ ║ │ AIzaSyC8X...                                           │  ║ │
│ ║ └────────────────────────────────────────────────────────┘  ║ │
│ ║ Required for calculating commute times. Make sure to        ║ │
│ ║ enable the Directions API.                                  ║ │
│ ╚══════════════════════════════════════════════════════════════╝ │
│                                                                  │
│ ╔══════════════════════════════════════════════════════════════╗ │
│ ║ Commute Settings                                             ║ │
│ ╠══════════════════════════════════════════════════════════════╣ │
│ ║                                                               ║ │
│ ║ Destination Address *                                        ║ │
│ ║ ┌────────────────────────────────────────────────────────┐  ║ │
│ ║ │ Karl Johans gate 22, Oslo, Norway                      │  ║ │
│ ║ └────────────────────────────────────────────────────────┘  ║ │
│ ║ Your work or desired destination address                    ║ │
│ ║                                                               ║ │
│ ║ Desired Arrival Time                                         ║ │
│ ║ ┌──────────┐                                                 ║ │
│ ║ │  08:30   │ (24-hour format)                               ║ │
│ ║ └──────────┘                                                 ║ │
│ ║ Target arrival time for commute calculation                  ║ │
│ ║                                                               ║ │
│ ║ Maximum Commute Time (minutes)                               ║ │
│ ║ ┌──────────┐                                                 ║ │
│ ║ │    60    │                                                 ║ │
│ ║ └──────────┘                                                 ║ │
│ ║ Listings with longer commutes will be highlighted            ║ │
│ ║                                                               ║ │
│ ║ ☑ Hide listings above maximum commute time                  ║ │
│ ║ Automatically hide listings that exceed your maximum         ║ │
│ ║ commute time                                                 ║ │
│ ╚══════════════════════════════════════════════════════════════╝ │
│                                                                  │
│ ╔══════════════════════════════════════════════════════════════╗ │
│ ║ ℹ️  How it works                                             ║ │
│ ╠══════════════════════════════════════════════════════════════╣ │
│ ║ • Calculates public transport commute times from listings   ║ │
│ ║ • Results cached for 24 hours to reduce API usage           ║ │
│ ║ • Green indicators show commutes within max time            ║ │
│ ║ • Yellow indicators show commutes exceeding max time        ║ │
│ ║ • Only visible listings processed for performance           ║ │
│ ╚══════════════════════════════════════════════════════════════╝ │
│                                                                  │
│ ╔════════════════╗  ┌────────────────┐                          │
│ ║  Save Settings ║  │  Clear Cache   │                          │
│ ╚════════════════╝  └────────────────┘                          │
│                                                                  │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃ ✓ Settings saved successfully! Refresh FINN.no pages to  ┃  │
│ ┃   see changes.                                            ┃  │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
└──────────────────────────────────────────────────────────────────┘
```

## 4. FINN.no Page with Commute Information

### Before Extension:
```
┌─────────────────────────────────────────────────────────────┐
│ FINN.no - Boliger til salgs                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌───────────────────────────────────────────────────────┐  │
│ │                                                         │  │
│ │ Fin leilighet i Grünerløkka                            │  │
│ │ Thorvald Meyers gate 30, 0555 Oslo                     │  │
│ │ 4 500 000 kr                                           │  │
│ │                                                         │  │
│ │ Flott 3-roms leilighet i populært område...           │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐  │
│ │                                                         │  │
│ │ Moderne leilighet i Majorstuen                         │  │
│ │ Bogstadveien 50, 0366 Oslo                            │  │
│ │ 6 200 000 kr                                           │  │
│ │                                                         │  │
│ │ Nyoppusset 2-roms med balkong...                      │  │
│ └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### After Extension (With Commute Info):
```
┌─────────────────────────────────────────────────────────────┐
│ FINN.no - Boliger til salgs                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │  │
│ │ ┃ 🚇 PT commute: 32 min 💾                         ┃  │  │
│ │ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │  │
│ │                                                         │  │
│ │ Fin leilighet i Grünerløkka                            │  │
│ │ Thorvald Meyers gate 30, 0555 Oslo                     │  │
│ │ 4 500 000 kr                                           │  │
│ │                                                         │  │
│ │ Flott 3-roms leilighet i populært område...           │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ ┌──────────────────────────────────────────────────┐  │  │
│ │ │ ⏱️  PT commute: 65 min                            │  │  │
│ │ └──────────────────────────────────────────────────┘  │  │
│ │                                                         │  │
│ │ Moderne leilighet i Majorstuen                         │  │
│ │ Bogstadveien 50, 0366 Oslo                            │  │
│ │ 6 200 000 kr                                           │  │
│ │                                                         │  │
│ │ Nyoppusset 2-roms med balkong...                      │  │
│ └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 5. Different Badge States

### Good Commute (Within Maximum):
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🚇 PT commute: 32 min 💾         ┃  Green background (#d4edda)
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
- Border: #c3e6cb
- Text: #155724 (dark green)
- Icon: 🚇 (metro/train)
- 💾 indicates cached result
```

### Warning (Exceeds Maximum):
```
┌──────────────────────────────────┐
│ ⏱️  PT commute: 65 min            │  Yellow background (#fff3cd)
└──────────────────────────────────┘
- Border: #ffeaa7
- Text: #856404 (dark yellow/brown)
- Icon: ⏱️ (timer/watch)
```

### Error State:
```
┌──────────────────────────────────┐
│ ⚠️  No public transport routes   │  Red background (#f8d7da)
│    found                         │
└──────────────────────────────────┘
- Border: #f5c6cb
- Text: #721c24 (dark red)
- Icon: ⚠️ (warning triangle)
```

## 6. Loading State (While Calculating)

```
┌───────────────────────────────────┐
│ 🔄 Calculating commute...         │  Light blue background
└───────────────────────────────────┘
```

## 7. Hidden Listing (When Filter Enabled)

When "Hide listings above maximum" is enabled:

```
┌─────────────────────────────────────────────────────────────┐
│ FINN.no - Boliger til salgs                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │  │
│ │ ┃ 🚇 PT commute: 32 min                           ┃  │  │
│ │ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │  │
│ │ Fin leilighet i Grünerløkka                            │  │
│ │ Thorvald Meyers gate 30, 0555 Oslo                     │  │
│ │ 4 500 000 kr                                           │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                             │
│ <!-- The 65-minute listing is hidden -->                   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │  │
│ │ ┃ 🚇 PT commute: 45 min                           ┃  │  │
│ │ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │  │
│ │ Leilighet ved Aker Brygge                             │  │
│ │ Stranden 3, 0250 Oslo                                  │  │
│ │ 8 900 000 kr                                           │  │
│ └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Color Legend

### Status Colors:
- **Green** (#d4edda): Commute within maximum (good!)
- **Yellow** (#fff3cd): Commute exceeds maximum (warning)
- **Red** (#f8d7da): Error occurred (address not found, no routes, etc.)
- **Blue** (#e8f4fd): Information/status messages

### Icons:
- 🚇 Metro/train (good commute)
- ⏱️ Timer (long commute)
- ⚠️ Warning (error)
- 💾 Floppy disk (cached result)
- ✅ Checkmark (success)
- 🔄 Arrows (loading)

## Mobile/Responsive View

The extension is designed for desktop Chrome. However, the UI elements scale appropriately:

### Narrow Popup (< 768px):
```
┌──────────────────────┐
│ 🚇 FINN Commute Ext. │
├──────────────────────┤
│ ✅ Extension is      │
│    configured        │
│                      │
│ Destination:         │
│ Karl Johans gate 22  │
│                      │
│ Arrival: 08:30       │
│ Max: 60 min          │
│ Hide: No             │
│                      │
│ ┌──────────────────┐ │
│ │ Open Settings    │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Clear Cache      │ │
│ └──────────────────┘ │
└──────────────────────┘
```

## Browser Console Messages

Users can see extension activity in the browser console (F12):

```
Console:
> FINN Commute Extension loaded
> Configuration loaded: {destination: "Karl Johans gate 22, Oslo", ...}
> Processing 8 visible listings
> Commute calculated for listing #1: 32 minutes (cached)
> Commute calculated for listing #2: 45 minutes
> Error for listing #3: No public transport routes found
```

---

## Summary

The extension provides a clean, non-intrusive interface that:
1. Adds valuable commute information directly on listing cards
2. Uses familiar color coding (green = good, yellow = warning, red = error)
3. Provides easy access to settings via popup
4. Includes clear visual indicators for cached vs. fresh data
5. Handles errors gracefully with helpful messages

All visual elements follow Chrome extension design best practices and maintain consistency with FINN.no's existing UI.
