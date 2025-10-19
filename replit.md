# Invest With Diomin Platform - Webhook Integration

## Project Overview
HubSpot to Supabase to Mailchimp webhook automation server for lead management and email marketing automation.

## Architecture
- **Framework**: Node.js Express server
- **Deployment**: Replit (this server)
- **Database**: Supabase (PostgreSQL with RLS)
- **Email Marketing**: Mailchimp
- **CRM**: HubSpot (form submissions)

## Current Implementation

### Server Endpoints
- `GET /` - Health check (returns "Webhook server is live")
- `POST /webhooks` - HubSpot webhook receiver (saves to Supabase + syncs to Mailchimp)
- `GET /leads` - Visual dashboard to view all captured leads

### Webhook Flow
1. HubSpot form submission triggers webhook
2. Server receives event at `/webhooks`
3. Lead data extracted (email, firstname, event type)
4. Saved to Supabase `leads` table with retry logic
5. Automatically synced to Mailchimp audience
6. Mailchimp triggers email automation sequence

### Environment Variables (Configured)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_KEY` - Service role key for API access
- `HUBSPOT_ACCESS_TOKEN` - HubSpot private app token
- `MAILCHIMP_API_KEY` - Mailchimp API key
- `MAILCHIMP_SERVER_PREFIX` - us5
- `MAILCHIMP_AUDIENCE_ID` - Target audience list ID

### Database Schema
Supabase table: `leads`
- `email` (text) - Contact email address
- `firstname` (text) - Contact first name
- `event` (text) - Event type from HubSpot
- `source` (text) - Always "hubspot-webhook"
- `created_at` (timestamp) - UTC timestamp

### Key Features
- Automatic retry logic (3 attempts with 800ms delay)
- Handles both single events and batch events
- Graceful error handling with console logging
- Visual dashboard for monitoring leads

## Production URLs
- **Webhook**: https://hubspot-supabase-webhook.rustybm1.repl.co/webhooks
- **Dashboard**: https://hubspot-supabase-webhook.rustybm1.repl.co/leads
- **Health Check**: https://hubspot-supabase-webhook.rustybm1.repl.co/

## Dependencies
- express - Web server framework
- node-fetch - HTTP client for Supabase API
- axios - HTTP client for Mailchimp API
- body-parser - JSON parsing middleware
- dotenv - Environment variable loading

## Recent Changes
- 2025-10-19: Added Mailchimp sync functionality to webhook endpoint
- 2025-10-19: Created visual leads dashboard
- 2025-10-19: Configured all environment secrets
- 2025-10-19: Server running on port 5000

## Notes
- Port 5000 required for webview output in Replit
- Server binds to 0.0.0.0 for external access
- Mailchimp sync gracefully skips if credentials missing
