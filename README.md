# wallet-tracker-docs

Documentation website for the **Wallet Balance Tracker** Google Sheets™ add-on.

Live at: `https://wallet-tracker-docs.vercel.app`

This repo is the **static docs/marketing site only** — Vite + vanilla HTML/CSS, deployed on Vercel. It does not contain and must never contain the actual `WalletTracker` Apps Script library implementation (batch engine, RPC client, dashboard/portfolio logic, etc.). That code lives in a separate, private Apps Script library project. The only Apps Script code that belongs in this repo is the 18-line `Code.gs` **wrapper block** shown on `/support.html` — thin one-line delegators with zero actual logic, meant to be copy-pasted into a user's own bound project.

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| Privacy Policy | `/privacy.html` |
| Terms of Service | `/terms.html` |
| Support | `/support.html` |

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the build locally
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import repo
3. Build settings (auto-detected):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**

## Store Listing URLs

```
Privacy Policy : https://wallet-tracker-docs.vercel.app/privacy.html
Terms of Service: https://wallet-tracker-docs.vercel.app/terms.html
Support         : https://wallet-tracker-docs.vercel.app/support.html
```

## Releasing a New Library Version

This is a separate release process from deploying THIS repo — the library and the docs site are independent deployments.

### 1. Deploy from the library project

```
Extensions → Apps Script (in your private library project)
→ Deploy → Manage deployments
→ ✏️ Edit the existing deployment
→ Version dropdown → "New version"
→ Description: e.g. "v9 - dust filter, duplicate detection, portfolio accuracy fix"
→ Deploy
```

The Script ID never changes. Only the version number increments.

### 2. How users get the update

| How they installed | What they need to do |
|---|---|
| **Option A — copied the Sheet** | Extensions → Apps Script → Libraries → WalletTracker → change Version to the new number → Save |
| **Option B — added library manually** | Same as above, or select HEAD to always auto-update |
| **HEAD (development mode)** | Nothing — they get every deploy instantly |

> ⚠️ Users who copied the Sheet have a **frozen version** from the day they copied it. There is no push-notification mechanism in Apps Script. Communicate new versions via GitHub Releases on this repo.

### 3. Updating the public "Make a Copy" Sheet

After deploying a new library version:

```
1. Open the source Sheet linked in the docs hero button
2. Extensions → Apps Script → Libraries → WalletTracker
3. Change Version to the new number → Save
```

Existing copies are unaffected. Only new copies pick up the updated version.

### 4. Release checklist

```
1. Test changes against a local test Sheet (not the public copy)
2. Deploy → New version (library project)
3. Update this README + CHANGELOG
4. Update support.html if setup steps or the Code.gs wrapper block changed
5. Update the public Make-a-Copy Sheet (step 3 above)
6. Post a GitHub Release with changelog notes
```

## v9 — What Changed

| Item | Detail |
|---|---|
| **Chunk-level retry resilience** | A network blip on one RPC batch chunk no longer discards already-fetched results from earlier chunks in the same run — only the affected wallets get retried |
| **Decimals cache scoped per chain** | Token decimals are now cached per (RPC host + contract address), not contract address alone — fixes a correctness bug where the same contract address on two different chains could silently apply the wrong decimal count |
| **Duplicate address detection** | Fetching now warns (with row numbers) when the same wallet address appears more than once on a sheet, instead of silently double-counting it |
| **Invalid address marking, tightened** | Only text starting with `0x` that fails the 42-character check gets flagged `INVALID` — placeholder/instructional text no longer triggers a false alarm on a brand-new sheet |
| **Sr No auto-numbering** | Column A fills in automatically after each fetch — no manual row numbering |
| **Portfolio auto-rebuild** | Portfolio sheet rebuilds automatically once a full (non-partial) fetch completes on any chain sheet |
| **Portfolio wallet count — exact match** | Replaced a loose `COUNTIF("0x*")` wildcard with an exact 42-character regex match, bounded to the sheet's actual data range — the Wallets total now reconciles with what's actually being fetched |
| **Minimum balance (dust) filter** | New `Set min balance filter` menu item dims wallets below a threshold; the check is fully skipped (zero extra API calls) for sheets that never use it |
| **Clear stuck batch (targeted reset)** | New `Clear stuck batch` menu item resets only the active sheet's saved progress, instead of requiring a full `Clear ALL cache` |
| **Redundant fallback RPC read removed** | Internal fallback-retry logic no longer re-reads the same saved fallback RPC URL a second time within the same fetch — small efficiency cleanup, no user-visible behavior change |
| **`drive.file` OAuth scope removed** | Was requested but never used anywhere in the library — an unused sensitive scope adds unnecessary consent friction and contradicts the tool's own zero-data-collection privacy stance |

## User Code.gs (v9 — 18 wrappers)

Users must replace their entire `Code.gs` with this block. `wt_triggerFetch` is not in the menu but must exist as a trigger target — omitting it means auto-fetch installs but silently does nothing.

```javascript
function onOpen()                { WalletTracker.registerMenu(); }
function onInstall()             { WalletTracker.registerMenu(); }
function wt_fetchCurrentSheet()  { WalletTracker.fetchCurrentSheetAllChains(); }
function wt_fetchAllSheets()     { WalletTracker.fetchAllSheetsAllChains(); }
function wt_fetchOneChain()      { WalletTracker.promptFetchOneChain(); }
function wt_startAutoFetch()     { WalletTracker.startAutoFetch(); }
function wt_stopAutoFetch()      { WalletTracker.stopAutoFetch(); }
function wt_triggerFetch()       { WalletTracker.triggerFetch(); }   // trigger target — not in menu
function wt_setupDashboard()     { WalletTracker.setupDashboard(); }
function wt_addWalletSheet()     { WalletTracker.addWalletSheet(); }
function wt_addTokenColumn()     { WalletTracker.addTokenColumn(); }
function wt_setFallbackRpc()     { WalletTracker.setFallbackRpc(); }
function wt_refreshPortfolio()   { WalletTracker.refreshDashboardSummary(); }
function wt_clearDecimalsCache() { WalletTracker.clearDecimalsCache(); }
function wt_setDustThreshold()   { WalletTracker.setDustThreshold(); }
function wt_clearSheetBatch()    { WalletTracker.clearSheetBatch(); }
function wt_clearAllCache()      { WalletTracker.clearAllCache(); }
function wt_help()               { WalletTracker.showHelp(); }
```

## appsscript.json (library project — NOT part of this repo)

This belongs to the separate Apps Script library project, included here only as reference context since both projects are maintained together. Four scopes, minimum required:

```json
{
  "timeZone": "Asia/Kolkata",
  "dependencies": { "libraries": [] },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/script.container.ui",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/script.scriptapp"
  ]
}
```

`script.scriptapp` is required for `ScriptApp.newTrigger()` (auto-fetch). `drive.file` was removed in v9 — `DriveApp` is not called anywhere in the library; keeping it would have requested an unused sensitive scope for no reason.

## Sheet Layout (v9 — frozen)

```
Row 1  = Headers : #  | Wallet Address | ETH      | USDC           | USDT
Row 2  = Config  : (filter) | RPC URL (B2) | (blank)  | 0xA0b86991...  | 0xdAC17F95...
Row 3+ = Wallets : 1  | 0xABC…         | 0.043200 | 120.000000     | 0.000000
```

Row 2 detection rule:
- **Blank** → native coin balance (ETH, BNB, MATIC…)
- **Valid `0x` contract address** → ERC-20 token balance
- **Anything else** → column skipped with log warning

Cell A2 optionally holds a minimum-balance filter threshold (see support.html).

## Stack

- [Vite](https://vitejs.dev/) — build tool
- Vanilla HTML + CSS
- [@vercel/analytics](https://vercel.com/docs/analytics) — page view tracking
- [Vercel](https://vercel.com/) — hosting

## Built by

- [buildbyravi](https://github.com/buildbyravi)
- [CryptoExplor](https://github.com/CryptoExplor)
