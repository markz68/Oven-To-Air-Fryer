# Oven to Air Fryer Calculator

A lightweight, installable, offline-capable PWA that converts conventional-oven recipes into air-fryer starting estimates.

**Version:** 1.0.0

## Live app

Once GitHub Pages is enabled: https://markz68.github.io/Oven-To-Air-Fryer/

## How conversion works

- Reduce oven temperature by **25°F** (about **13.9°C**).
- Reduce conventional oven cooking time by **20%**, multiplying minutes by **0.8**.
- Temperature is rounded to the nearest 5° in the selected unit to provide practical controls.
- Cooking time displays up to one decimal minute. Start checking for doneness a few minutes early.
- Leave room for air circulation and shake or flip foods when appropriate.

Conversion rules adapted from [Inch Calculator's Oven to Air Fryer Conversion Calculator](https://www.inchcalculator.com/oven-to-air-fryer-conversion-calculator/). Independent project, not affiliated with Inch Calculator.

**Food safety:** These are estimates, not universally safe instructions. Check foods for appropriate internal temperatures.

## Features

- Instant recalculation; Fahrenheit and Celsius oven inputs
- Device-local preference for default temperature unit
- Reset and early-doneness guidance
- Mobile-first responsive design
- App version in title bar, settings dialog, and footer
- Service worker for offline usage after first online load
- Versioned cache and on-demand service worker update check
- Installable web app manifest; no account, tracking, or Google Drive synchronization

## Publish on GitHub Pages

In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**. Choose **main** and **/(root)**, then save. GitHub will publish the app at the URL above after deployment. For Android, open it in Chrome and choose **Install app** or **Add to Home screen**. On Windows, use the browser's app-install option. On iPad, use Safari's Share → Add to Home Screen.

## Files

- `index.html`: app markup and settings
- `styles.css`: responsive visual design
- `app.js`: conversion logic, preferences, update check
- `sw.js`: offline cache
- `manifest.webmanifest`: installation metadata
- `icon.svg`: app icon

## Testing checklist

1. Enter 400°F and 30 minutes: expect 375°F and 24 minutes.
2. Enter 350°F and 15 minutes: expect 325°F and 12 minutes.
3. Switch to °C and enter 200°C and 30 minutes: expect 185°C and 24 minutes (nearest 5°C).
4. Clear either input: see validation instead of a fabricated result.
5. Open Settings, change the default unit, reload, and verify persistence.
6. Install from Chrome/Edge or Add to Home Screen in Safari.
7. Load successfully online once, then go offline and relaunch.
8. After a future version bump, verify title version and cache refresh.

## Versioning

When publishing updates, bump the number in `index.html`, `app.js`, `sw.js` cache name, and `README.md` together. The update-check button checks the service worker; clients will reload when an updated worker activates.
