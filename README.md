# wallet-tracker-docs

Documentation website for the **Wallet Balance Tracker** Google Sheets™ add-on.

Live at: `https://wallet-tracker-docs.vercel.app`

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

## Releasing a New Version

### 1. Deploy from the library project

```
Extensions → Apps Script (in your library project)
→ Deploy → Manage deployments
→ ✏️ Edit the existing deployment
→ Version dropdown → "New version"
→ Description: e.g. "v8 - ERC-20 tokens, portfolio sheet, fallback RPC"
→ Deploy
```

The Script ID never changes. Only the version number increments.

### 2. How users get the update

| How they installed | What they need to do |
|---|---|
| **Option A — copied the Sheet** | Extensions → Apps Script → Libraries → WalletTracker → change Version to the new number → Save |
| **Option B — added library manually** | Same as above, or select HEAD to always auto-update |
| **HEAD (development mode)** | Nothing — they get every deploy instantly |

> ⚠️ Users who copied the Sheet have a **frozen version** from the day they copied it. There is no push-notification mechanism in Apps Script. Communicate new versions via GitHub Releases or release notes.

### 3. Updating the public "Make a Copy" Sheet

After deploying a new version, update the source Sheet so new copiers get the latest code:

```
1. Open the source Sheet linked in the docs hero button
2. Extensions → Apps Script → Libraries → WalletTracker
3. Change Version to the new number → Save
```

Existing copies are unaffected. Only new copies pick up the updated version.

### 4. Release checklist

```
1. Test changes against a local test Sheet (not the public copy)
2. Deploy → New version
3. Update this README + CHANGELOG
4. Update support.html if setup steps changed
5. Update the public Make-a-Copy Sheet (step 3 above)
6. Post a GitHub Release with changelog notes
```

## v8 — What's New

| Feature | Detail |
|---|---|
| **ERC-20 token support** | Track USDC, USDT, WETH, ARB, and any ERC-20 token. Add via menu → Add ERC-20 token |
| **Portfolio sheet** | Auto-built SUMIF totals across all chains and tokens. Rebuilds via menu |
| **Balance delta notes** | Cell tooltip shows change since last fetch: ↑ +1.234500 (prev: 0.000000) |
| **Fallback RPC** | Set a backup RPC URL per sheet — auto-used when primary fails >50% of a batch |
| **Auto-retry on completion** | End of each column: error cells are automatically retried before final toast |
| **LockService** | Concurrent trigger instances skip rather than write the same column twice |
| **Separate token batch size** | Native: 500/run (batch JSON-RPC). Tokens: 50/run (sequential eth_call) |
| **Batch writes** | 4 Sheets API calls per batch instead of N×3. Saves 2–3 minutes per run |
| **Smarter sanitizeRpcKey** | MD5 hash suffix prevents key collisions between same-provider URLs |

## User Code.gs (v8 — 16 wrappers)

Users must replace their entire `Code.gs` with this block. `wt_triggerFetch` is not in the menu but must exist as a trigger target.

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
function wt_clearDecimalsCache() { WalletTracker.clearDecimalsCache(); }
function wt_setFallbackRpc()     { WalletTracker.setFallbackRpc(); }
function wt_refreshPortfolio()   { WalletTracker.refreshDashboardSummary(); }
function wt_clearAllCache()      { WalletTracker.clearAllCache(); }
function wt_help()               { WalletTracker.showHelp(); }
```

## appsscript.json (library project)

Three scopes are required. `script.scriptapp` is needed for `ScriptApp.newTrigger()` — without it, auto-fetch silently fails to install.

```json
{
  "timeZone": "Asia/Kolkata",
  "dependencies": { "libraries": [] },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/script.scriptapp"
  ]
}
```

## Sheet Layout (v8 — frozen)

```
Row 1  = Headers : #  | Wallet Address | ETH      | USDC           | USDT
Row 2  = Config  :    | RPC URL (B2)   | (blank)  | 0xA0b86991...  | 0xdAC17F95...
Row 3+ = Wallets : 1  | 0xABC…         | 0.043200 | 120.000000     | 0.000000
```

Row 2 detection rule:
- **Blank** → native coin balance (ETH, BNB, MATIC…)
- **Valid `0x` contract address** → ERC-20 token balance
- **Anything else** → column skipped with log warning

## Stack

- [Vite](https://vitejs.dev/) — build tool
- Vanilla HTML + CSS
- [@vercel/analytics](https://vercel.com/docs/analytics) — page view tracking
- [Vercel](https://vercel.com/) — hosting

## Built by

- [buildbyravi](https://github.com/buildbyravi)
- [CryptoExplor](https://github.com/CryptoExplor)
