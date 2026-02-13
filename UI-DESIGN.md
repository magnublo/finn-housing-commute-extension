# UI/UX Design Documentation

## Visual Design Overview

This document describes the visual appearance and user interaction flow of the FINN Housing Commute Extension.

## Color Scheme

### Primary Colors
- **Extension Blue**: `#0084ff` - Main branding color
- **Background**: `#f5f5f5` - Subtle gray for pages
- **White**: `#ffffff` - Card backgrounds

### Status Colors
- **Success Green**: `#d4edda` (background), `#155724` (text)
- **Warning Yellow**: `#fff3cd` (background), `#856404` (text)
- **Error Red**: `#f8d7da` (background), `#721c24` (text)
- **Info Blue**: `#e8f4fd` (background)

## Component Designs

### 1. Commute Badge (Injected into FINN Listings)

#### Good Commute (Within Max)
```
┌──────────────────────────────────────┐
│ 🚇 PT commute: 32 min                │  ← Green background
└──────────────────────────────────────┘
```
- Background: #d4edda
- Border: #c3e6cb
- Text: #155724
- Icon: 🚇 (metro/train)

#### Warning Commute (Exceeds Max)
```
┌──────────────────────────────────────┐
│ ⏱️  PT commute: 65 min                │  ← Yellow background
└──────────────────────────────────────┘
```
- Background: #fff3cd
- Border: #ffeaa7
- Text: #856404
- Icon: ⏱️ (timer)

#### Error State
```
┌──────────────────────────────────────┐
│ ⚠️  No public transport routes found │  ← Red background
└──────────────────────────────────────┘
```
- Background: #f8d7da
- Border: #f5c6cb
- Text: #721c24
- Icon: ⚠️ (warning)

#### Cached Result
```
┌──────────────────────────────────────┐
│ 🚇 PT commute: 32 min 💾             │  ← Green with disk icon
└──────────────────────────────────────┘
```
- Same styling as above
- Additional 💾 icon indicates cached data

### 2. Extension Popup (Click on Extension Icon)

```
┌────────────────────────────────────────┐
│ 🚇 FINN Commute Extension              │
├────────────────────────────────────────┤
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ ✅ Extension is configured and     │ │
│ │    active                          │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Destination: Karl Johans gate 22, Oslo│
│ Arrival time: 08:30                   │
│ Max commute: 60 minutes               │
│ Hide listings: Yes                    │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │      Open Settings                 │ │  ← Primary button
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │      Clear Cache                   │ │  ← Secondary button
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
Width: 320px
```

### 3. Options Page

```
┌─────────────────────────────────────────────────────────────┐
│ 🚇 FINN Commute Extension Settings                          │
│ Configure your commute preferences for FINN housing search  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ╔═══════════════════════════════════════════════════════╗  │
│ ║ Google Maps API Configuration                         ║  │
│ ╠═══════════════════════════════════════════════════════╣  │
│ ║                                                        ║  │
│ ║ Google Maps API Key * [Get API Key]                  ║  │
│ ║ ┌──────────────────────────────────────────────────┐ ║  │
│ ║ │ AIza...                                          │ ║  │
│ ║ └──────────────────────────────────────────────────┘ ║  │
│ ║ Required for calculating commute times. Make sure to ║  │
│ ║ enable the Directions API.                           ║  │
│ ╚═══════════════════════════════════════════════════════╝  │
│                                                              │
│ ╔═══════════════════════════════════════════════════════╗  │
│ ║ Commute Settings                                      ║  │
│ ╠═══════════════════════════════════════════════════════╣  │
│ ║                                                        ║  │
│ ║ Destination Address *                                 ║  │
│ ║ ┌──────────────────────────────────────────────────┐ ║  │
│ ║ │ Karl Johans gate 22, Oslo                        │ ║  │
│ ║ └──────────────────────────────────────────────────┘ ║  │
│ ║ Your work or desired destination address             ║  │
│ ║                                                        ║  │
│ ║ Desired Arrival Time                                  ║  │
│ ║ ┌──────────┐                                          ║  │
│ ║ │  08:30   │                                          ║  │
│ ║ └──────────┘                                          ║  │
│ ║ Target arrival time for commute calculation           ║  │
│ ║                                                        ║  │
│ ║ Maximum Commute Time (minutes)                        ║  │
│ ║ ┌──────────┐                                          ║  │
│ ║ │    60    │                                          ║  │
│ ║ └──────────┘                                          ║  │
│ ║ Listings with longer commutes will be highlighted     ║  │
│ ║                                                        ║  │
│ ║ ☑ Hide listings above maximum commute time           ║  │
│ ║ Automatically hide listings that exceed your maximum  ║  │
│ ║ commute time                                          ║  │
│ ╚═══════════════════════════════════════════════════════╝  │
│                                                              │
│ ╔═══════════════════════════════════════════════════════╗  │
│ ║ ℹ️  How it works                                      ║  │
│ ╠═══════════════════════════════════════════════════════╣  │
│ ║ • Calculates public transport commute times           ║  │
│ ║ • Results cached for 24 hours to reduce API usage     ║  │
│ ║ • Green indicators show commutes within max time      ║  │
│ ║ • Yellow indicators show commutes exceeding max time  ║  │
│ ║ • Only visible listings are processed for performance ║  │
│ ╚═══════════════════════════════════════════════════════╝  │
│                                                              │
│ ┌──────────────────┐ ┌──────────────────┐                  │
│ │  Save Settings   │ │   Clear Cache    │                  │
│ └──────────────────┘ └──────────────────┘                  │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ ✓ Settings saved successfully! Refresh FINN.no pages │   │
│ │   to see changes.                                     │   │
│ └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## User Interaction Flow

### First Time Setup
```
1. User installs extension
   ↓
2. Clicks extension icon
   ↓
3. Sees "needs configuration" warning
   ↓
4. Clicks "Open Settings"
   ↓
5. Enters API key and destination
   ↓
6. Saves settings
   ↓
7. Navigates to FINN.no
   ↓
8. Sees commute times appear automatically
```

### Regular Usage
```
User on FINN.no housing search
   ↓
Extension automatically:
   ├─ Detects listing cards
   ├─ Extracts addresses
   ├─ Checks cache
   ├─ Requests commute times (if not cached)
   └─ Injects badges into cards
```

### Configuration Update
```
User changes destination in settings
   ↓
Extension automatically:
   ├─ Detects storage change
   ├─ Removes old commute badges
   ├─ Clears processed listings set
   └─ Recalculates with new destination
```

## Responsive Behavior

### Desktop (> 768px)
- Full layout as shown above
- Side-by-side buttons
- Comfortable spacing

### Mobile/Tablet (≤ 768px)
- Single column layout
- Stacked buttons
- Reduced padding
- Font sizes adjusted

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Status colors have sufficient contrast
- Icons supplement color coding

### Keyboard Navigation
- All buttons are keyboard accessible
- Tab order is logical
- Focus indicators visible

### Screen Readers
- Semantic HTML used
- Labels properly associated
- Status messages announced

## Animation/Transitions

### Badge Injection
- Smooth fade-in when commute time loads
- No jarring layout shifts
- Progressive enhancement

### Loading States
- Brief loading indicator while API request pending
- Clear visual feedback
- Error states clearly distinguished

## Branding

### Extension Icon
- Blue square background (#0084ff)
- White train/metro symbol
- Simple, recognizable design
- Scales well at all sizes (16px, 48px, 128px)

### Typography
- System font stack for native feel
- Clear hierarchy
- Readable sizes (14px minimum)

## Example FINN Listing with Badge

```
┌────────────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────────────┐ │
│ │ 🚇 PT commute: 32 min 💾                           │ │ ← Injected badge
│ └────────────────────────────────────────────────────┘ │
│                                                         │
│ Fin leilighet i Grünerløkka                            │
│ Thorvald Meyers gate 30, 0555 Oslo                    │
│ 4 500 000 kr                                           │
│                                                         │
│ Flott 3-roms leilighet i populært område med kort     │
│ vei til alt.                                           │
│                                                         │
│ [Original FINN content continues...]                   │
└────────────────────────────────────────────────────────┘
```

## Error Messages

### User-Friendly Messages
- ✅ "Settings saved successfully!"
- ⚠️ "Please enter a Google Maps API key"
- ⚠️ "No public transport routes found"
- ⚠️ "API request denied. Check your API key and permissions."
- ✅ "Cache cleared! Removed 15 cached entries."

### Technical Details Hidden
- Full API errors logged to console only
- Users see simplified, actionable messages
- Help links provided where appropriate

## Performance Indicators

### Visual Feedback
- Loading spinner during API calls (optional)
- Cache icon (💾) for cached results
- Instant updates when using cached data

### Status Information
- API usage visible in popup
- Cache statistics available
- Clear indication of extension state

---

This UI/UX design ensures a clean, intuitive, and accessible experience while maintaining visual consistency with Chrome extension best practices.
