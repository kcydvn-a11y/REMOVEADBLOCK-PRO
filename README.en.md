# 🛡️ REMOVEADBLOCK PRO

**🇻🇳 [Phiên bản Tiếng Việt](README.md)** · A multi-layer, stealth ad-blocking extension — not just YouTube, but every website

![Version](https://img.shields.io/badge/Version-14.9.36-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave-red?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-orange?style=for-the-badge)

> Doesn't rely on a single static domain list — combines network-layer blocking (EasyList + a self-built list), structural/known-name hiding, and a manual "Element Zapper" tool so you can clean up anything that slips through, while the system **keeps learning** so you never have to fix the same thing twice.

---

## ✨ CORE FEATURES

- **Blocks video ads everywhere** — not just YouTube (internal JSON proxy + Main World interception), but also popular third-party players (JW Player, Video.js, Google IMA SDK...) on any movie/video site. Auto-recovers playback when it freezes or gets throttled in a background tab.
- **Blocks banner/native/popup ads** — 3 layers working together: network-level domain blocking (EasyList + a self-built rule set, thousands of domains), hiding by known class/id names (CSS injected at `document_start`, zero flash), and structural heuristics that infer ads on sites never seen before.
- **Blocks popups/popunders & click-hijacking — even when the target domain keeps changing.** 3 layers:
  1. *Click-token*: allows only 1 new window per genuine click, detects a video/link wrapped for hijacking purely by structure (no need to know the target domain in advance).
  2. *Transparent overlay detection*: only neutralizes an overlay when there's clear evidence (an outbound link sitting exactly at the overlay's visual center — not just "some external link somewhere inside it," which would false-positive on large page-wrapping containers).
  3. *Tab-level interception (background.js)*: watches AFTER a multi-step HTTP redirect chain has already finished — catches popunders designed to keep changing their final domain specifically to dodge any static href check.
- **Detects fake/phishing financial sites** — a self-learning algorithm (fuzzy-matching + homograph/punycode detection) catches brand-new domains impersonating banks/e-wallets/social networks **that have never appeared on any blocklist**, plus flags scam pages by CONTENT (an OTP/password form + scam language) even when they don't impersonate any known brand at all.
- **Warns about malicious downloads** — auto-blocks when the source matches a known malware-distribution domain list; warns (doesn't auto-block) only for unusual script/executable file types (`.vbs/.ps1/.hta/.js/.bat`...) — **does not** warn on `.exe`/`.apk` (common, legitimate installer formats; warning on every one of those would train users to ignore real warnings too).
- **Element Zapper** — a manual, 3-mode tool to clean up any ad that slips through the automatic layers, now with a **"Smart Layer Picker" panel** on right-click (full guide below).
- **Instant Pause** — turns ALL ad blocking on the current tab on/off instantly, no page reload needed.
- **Exclude a whole site** — right-click any page to disable every ad-blocking content script for that domain, for when a site breaks before a proper fix ships — no need to wait for an update.
- **"Aggressive auto-detect" mode (off by default)** — accepts a few higher-risk detection signals (responsive/disguised banners, elements that look out of place in the page's own structure) to catch more ads, always still checked against the whitelist before hiding anything.
- **Continuous self-learning** — every manual Zapper action helps train the detector for next time, on that same site and on other sites sharing the same template. A pattern is only auto-applied after being independently confirmed on ≥2-3 different sites — so one coincidence never teaches the system something wrong.
- **Advanced browser fingerprint cloaking** — fakes AudioContext/WebGL/Canvas/hardware info, and disguises every patched function's `.toString()`/`.name`/`.length` to look completely native, defeating even scripts that inspect for tampering. Every element it hides also reports a plausible non-zero `offsetWidth`/`offsetHeight` — defeating anti-adblock scripts that re-measure an element after hiding it to infer "this got blocked."
- **Automatic update check** — checks for a new version on its own and shows a badge on the "Update" button in the popup, no need to manually check GitHub.
- **Per-tab blocked-ad counter** — shown right on the extension icon.

---

## 🖱️ ELEMENT ZAPPER — USER GUIDE

When the 3 automatic layers (network blocking + cosmetic hiding + heuristics) still miss an ad, use the Zapper to clean it up on the spot.

### Activating
- Click the round 🎯 button in the corner of the screen (drag to reposition — the position is remembered across every site), **or**
- Press **`Alt + Shift + X`**

While aiming, the cursor turns into a crosshair and the element under it gets a dashed red outline as a preview.

### 🔴 Left-click — Destroy
Use this when **the element itself** is the ad to get rid of entirely (a banner, an ad box, a fake button...).

- Hover over the exact element → **left-click**
- It's removed from the page outright and remembered for that site — next time you visit, it's gone from the start, no need to aim again.
- Absolute safety checks apply: it can never remove `<body>`, an input field/editable area (chat, forms...), a real video that's currently playing, or the extension's own UI.

### 🔵 Right-click — "Smart Layer Picker" panel *(new)*
Use this when a **real** button/video is covered by one or more other layers, or when you'd rather choose exactly which layer to remove yourself instead of letting the system guess.

- Hover over the spot → **right-click** → a floating panel appears right there, automatically flipping position (left/right, up/down) so it's never cut off by the edge of the screen.
- The panel lists **every** layer stacked exactly at that click point, each row showing:
  - A checkbox to select that layer for removal.
  - A plain-language description (e.g. *"Suspicious overlay - possible ad or click-hijack layer"*, *"Embedded frame (iframe) from another site"*, *"Fixed layer on screen"*...).
  - Hover over a row to see that layer's real HTML source in the preview box below it, so you can be sure before deciding.
- **Real content is always locked and dimmed, uncheckable**: input fields, a video that's actually playing, or a container that's wrapping other layers underneath it (removing the whole box would take everything inside it with it).
- **Real-time preview**: check a layer and it disappears INSTANTLY so you can see the exact result; uncheck it and it comes right back — nothing is actually lost until you confirm.
- Click **"✅ Confirm"** to permanently save the checked layers (they'll stay hidden automatically next time you visit that site). Click **"Cancel"**, press `Esc`, or click outside the panel to discard every unconfirmed change — nothing is lost.

### 🟢 Alt + Ctrl + Right-click — Protect forever
Use this when an automatic rule (heuristic) mistakenly flags a real content block as an ad.

- Hover over the box → hold **Alt + Ctrl** → **right-click**
- That box is added to a per-site protected list — from now on it will **never** be auto-removed/hidden by any automatic layer (heuristics or the Zapper itself), even if it happens to match some ad rule.
- If it's hidden at that exact moment (by JS), it reappears instantly. *A real limitation:* if it's hidden by a fixed static CSS rule (not JS), you'll need to reload the page to see the protection take effect.
- Included in Export/Import just like the other lists — it survives a reinstall.

---

### Other shortcuts
| Key | Function |
|---|---|
| `Esc` | Cancel aiming mode (or just close the layer-picker panel if it's open, without exiting aiming mode) |
| Drag the 🎯 button | Move its position (remembered across every site) |
| `Alt` + Right-click | Learn a video-ad pattern (from the ad video currently playing) — once confirmed, a video ad sharing that same pattern on **any other site** will also get auto-muted/skipped |
| `Alt + Shift` + Right-click | Forget the video-ad pattern you just learned |
| `Alt + Ctrl` + Right-click | 🟢 Protect forever — see above |

### Reviewing / Restoring
Open the extension popup → see everything you've destroyed/cleaned/protected, grouped by site and by day, with a **"Restore"** button to undo any of it at any time (per-site, or all at once).

---

## ⏸️ INSTANT PAUSE

The **"Pause"** button in the popup turns off ALL ad blocking (network + hiding) on the current tab **instantly, with no page reload** — useful when a page gets over-aggressively blocked and you need to see the real, unmodified page right away. Click it again to resume, also instantly. YouTube's dedicated ad-blocking (the JSON proxy) keeps working while paused — Pause only affects the general blocking layers (network/hiding/heuristics) on the current page.

## 🚫 EXCLUDE A WHOLE SITE

Right-click any page → choose **"Exclude this page from REMOVEADBLOCK PRO"**. Every ad-blocking content script (except the two dedicated YouTube ones) turns off for that root domain, applied instantly with no reload needed. Use this when a site is being broken by a heuristic rule that doesn't have a targeted fix yet — click the same menu item (now labeled "Re-enable...") to turn it back on anytime. Manage the full excluded list from the **"🚫 Excluded"** tab in the popup.

## 🧪 "AGGRESSIVE AUTO-DETECT" MODE (off by default)

A toggle in the popup — turn it on to let the system accept a few higher-risk detection signals (responsive/disguised banners, elements that look structurally out of place) to catch more ads, at the cost of a slightly higher risk of hiding real content by mistake — always still checked against the whitelist before hiding anything. Off by default to favor safety. Reload any open tabs to apply.

## 📤 EXPORT / IMPORT DATA

- **Export**: saves the Zapper's entire "memory" into a single JSON file — all 3 lists (destroyed / cleaned layers / protected) across every site you've ever zapped, every self-learned pattern (Skip buttons, video ads), **and the list of sites you've fully excluded**. Domains/URLs are obfuscated before export (not real encryption — just enough that someone opening the file by eye can't immediately read which sites you've visited).
- **Import**: load that file back in (your own, after reinstalling, or one someone else shared with you) — the data is **automatically merged, never overwritten**, on top of whatever's already on your machine.
- Everything ships as ONE single export file (there's no "export only this category" option) — since all of this data shares the same lifecycle (a personal backup for when you switch machines) and the same privacy policy (domains are always obfuscated), splitting it up would only add complexity with no real benefit.

---

## 🧠 MULTI-LAYER ALGORITHM ARCHITECTURE

```
Core Engine = (Network Blocking + Structural Detection) × Self-Learning × Anti-Detection
```

| Layer | Mechanism | Description |
|---|---|---|
| 1 | **YouTube JSON Proxy** | Injects a script into the Main World, intervening directly on `playerResponse`/`ytplayer.config` — strips the ad markers before the player ever reads them |
| 2 | **Network-layer blocking (EasyList)** | Automatically fetches and refreshes a community ad-domain list (the same source AdGuard/uBlock use), converted into `declarativeNetRequest` rules |
| 3 | **Cosmetic hiding** | A list of common ad class/id names, hidden instantly via a self-injected `<style>` tag (created by JS, not declared through the manifest) right as the page starts loading — can be toggled on/off by Pause |
| 4 | **Structural heuristics** | Infers ads from self-declared names/labels, standard IAB sizes, and geometric position — catches sites it has never seen before, no specific domain needed |
| 5 | **Element Zapper + Self-Learning** | A manual, 3-mode tool (destroy / pick layers / protect) — every action retrains the system, but a pattern only gets auto-applied after being confirmed independently on ≥2-3 sites, to avoid learning the wrong thing |
| 6 | **Fuzzy Brand-Guard** | Fuzzy matching (Levenshtein) + homograph/punycode detection — catches a brand-new brand-impersonation domain on sight |
| 7 | **Popunder & Click-Hijack Guard** | "Click-token" (only 1 new window per genuine click) + evidence-based transparent-overlay detection at the page layer, PLUS a tab-level layer (background.js) that catches multi-step HTTP redirect chains designed to keep changing their final domain |
| 8 | **Anti-Detection Cloaking** | Fakes AudioContext/WebGL/Canvas + disguises `.toString()`/`.name`/`.length` on every patched function, plus fakes `offsetWidth`/`offsetHeight` on hidden elements — defeats both tamper-inspection scripts and scripts that re-measure elements to detect an ad blocker |

---

## 📥 INSTALLATION

1. Download the extension's source (folder or zip, then unzip it)
2. Open your browser (**Chrome / Edge / Brave**)
3. Go to `chrome://extensions/` (or `edge://extensions/`)
4. Turn on **Developer Mode** in the top-right corner
5. Click **"Load unpacked"** → select the folder containing the extension
6. Done — it works immediately, no browser restart needed

> After updating the source code, you need to click the reload button (⟳) on the extension's card at `chrome://extensions` to apply the new version — just refreshing the page (F5) is NOT enough.

---

## ⚙️ TECHNICAL ARCHITECTURE

- **Language**: plain JavaScript (content scripts) + Manifest V3 (service worker)
- **Key technologies**: `declarativeNetRequest`, Main World script injection (kept as a separate script from the isolated-world one, bridged via `CustomEvent` whenever a feature needs both `chrome.*` access AND a guaranteed run-order ahead of the page's own script), debounced `MutationObserver`s, IndexedDB (a shared central learning store used by Export/Import), Proxy/`Object.defineProperty` (spoofing browser APIs)
- **Design principle**: safety first — no automatic action ever fires off a single weak/isolated signal alone; every change made to a page can be undone from the popup; every observer/loop is debounced or scope-limited so nothing lags even on pages packed with ads

---

## 🔧 CONTACT & SUPPORT

- **Author:** Thái Thông
- **Email:** [ThaiThongsj@gmail.com](mailto:ThaiThongsj@gmail.com)

### 💰 Support this project

**Vietcombank account**
`9898661918` — **NGUYỄN NGỌC THÁI THÔNG**

---

**Thank you for using REMOVEADBLOCK PRO!**
Browse freely, ad-free, and safer. ✨
