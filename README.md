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

## Stack

- [Vite](https://vitejs.dev/) — build tool
- Vanilla HTML + CSS
- [@vercel/analytics](https://vercel.com/docs/analytics) — page view tracking
- [Vercel](https://vercel.com/) — hosting

## Built by

- [buildbyravi](https://github.com/buildbyravi)
- [CryptoExplor](https://github.com/CryptoExplor)
