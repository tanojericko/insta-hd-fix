// ==UserScript==
// @name         Instagram Force HD
// @namespace    https://github.com/tanojericko/insta-preview-fix
// @version      1.0
// @description  Prevent Instagram from downgrading images in Firefox-based browsers (Zen, Firefox). Works with Chromium-based browsers as well.
// @author       Jericko James Tano
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