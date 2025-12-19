# Instagram High-Resolution Image Fix

This repository provides a **Zen / Firefox–specific fix** for an Instagram issue where images downgrade to low resolution shortly after loading. It **may also work on Chromium-based browsers**, where a similar (though less aggressive) quality downgrade can occur.

It works by injecting a **document-start userscript** that intercepts and disables Instagram’s responsive image downgrade logic at the correct execution layer—**before** Instagram’s client-side optimizations take effect.

As a result, Instagram is forced to load and retain **default (high) image quality**, matching the behavior observed in Instagram’s native mobile application.

---

## Problem Summary

On Zen (Firefox-based browsers), Instagram images often:

1. Load in high resolution

2. Then downgrade to a low-resolution `srcset` candidate (e.g. `p480x480`)

Reloading the page switches Instagram to a different renderer where the downgrade does **not** occur.

This confirms the behavior is **site-controlled responsive image swapping**, amplified by Firefox’s standards-compliant image selection.

---

## Solution

A **prototype-level userscript** that:

- Runs at `document-start`

- Prevents Instagram from setting `srcset` and `sizes`

- Stops Firefox from ever receiving lower-resolution candidates

This is the **only reliable interception point** that survives SPA hydration.

---

## Userscript

**File:** `userscript/zen-instagram-hd-fix.js`

```javascript
// ==UserScript==
// @name         Instagram Force HD
// @namespace    https://github.com/tanojericko/insta-preview-fix
// @version      1.0
// @description  Prevent Instagram from downgrading images in Firefox-based browsers (Zen, Firefox). Works with Chromium-based browsers as well.
// @author       tanojericko
// @match        https://www.instagram.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==


(() => {
    if (window.location.hostname !== 'www.instagram.com') return;

    const ENABLED = true;
    if (!ENABLED) return;

    const origSetAttribute = HTMLImageElement.prototype.setAttribute;
    HTMLImageElement.prototype.setAttribute = function(name, value) {
        if (name === 'srcset' || name === 'sizes') return;
        return origSetAttribute.call(this, name, value);
    };

    Object.defineProperty(HTMLImageElement.prototype, 'srcset', {
        configurable: true,
        set() {},
        get() { return ''; }
    });

    Object.defineProperty(HTMLImageElement.prototype, 'sizes', {
        configurable: true,
        set() {},
        get() { return ''; }
    });
})();
```

---

## How to Install & Use

1. Install **Violentmonkey** in Zen or Firefox

2. Open the file: `userscript/zen-instagram-force-hd.user.js`

3. Click “Raw” → Violentmonkey will prompt to install

4. Save the script and reload Instagram

> The `userscript/` folder in this repository is for **sharing/documentation only**, not for direct placement in Zen browser files.

---

## Image Comparison

Image briefly loads in high resolution, then downgrades to low-resolution (`p480x480`) after Instagram hydration. Noticeable blur when viewing profile posts or modals.



Image remains in full resolution (`_n.jpg`), no downgrade occurs, consistent clarity across feed, profile, and modal views.



---

## Limitations

- Increased bandwidth usage (expected)

- If Instagram switches to **canvas / blob-based rendering**, client-side interception may no longer be possible

---

## Credits

Root cause analysis and fix validated via Zen + Firefox DevTools inspection and renderer comparison.


