# Invest With Diomin — Next.js (Vercel-ready)

## Quickstart
1) Create `.env` based on `.env.example`
2) `npm install`
3) `npm run dev`

## Deploy on Vercel
- Import repo on Vercel, add env vars, deploy
- DNS: A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com

## API Endpoints
- POST /api/v1/contact
- POST /api/v1/catalog/sign
- GET  /api/v1/fintech/status
- GET  /api/v1/fintech/oracle?assets=BTC,ETH,SPY
- POST /api/v1/ops/webhooks (HubSpot/Mailchimp)

## Notes
- Keep service keys server-only. Do not expose in client code.
