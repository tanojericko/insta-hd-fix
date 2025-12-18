# Instagram High-Resolution Image Fix

This repository provides a **Zen / Firefox-specific fix** for Instagram images downgrading to low resolution after load. Works with Chronium-based browsers as well. 

It packages a **document-start userscript** that blocks Instagram’s responsive image downgrade logic at the correct interception layer.

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

## How to Install & Use

1. Install **Violentmonkey** in Zen or Firefox

2. Open the file: `userscript/instagram-hd-fix.js`

3. Click “Raw” → Violentmonkey will prompt to install

4. Save the script and reload Instagram

---

## Limitations

- Increased bandwidth usage (expected)

- If Instagram switches to **canvas / blob-based rendering**, client-side interception may no longer be possible

---

## Credits

Root cause analysis and fix validated via Zen + Firefox DevTools inspection and renderer comparison. 
