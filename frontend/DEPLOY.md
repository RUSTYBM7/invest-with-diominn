# Deploy Invest With Diomin to Vercel via GitHub

## Step 1: Push to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `invest-with-diomin`
   - Make it Private or Public (your choice)
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Push your code** (run these commands in Replit Shell):
   ```bash
   cd frontend
   git add .
   git commit -m "Initial commit: Invest With Diomin platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/invest-with-diomin.git
   git push -u origin main
   ```

## Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com/new

2. **Import your GitHub repository**
   - Click "Import Project"
   - Select your GitHub account
   - Find and select `invest-with-diomin`
   - Click "Import"

3. **Configure Project**
   - **Project Name**: invest-with-diomin
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Add Environment Variables** ⚠️ IMPORTANT
   Click "Environment Variables" and add these:

   ```
   VITE_SUPABASE_URL=https://rcxggxntuyrdumtuqqsr.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE=YOUR_SUPABASE_SERVICE_ROLE
   
   MAILCHIMP_API_KEY=38f371f39bf8ea36955e766cf4774077-us5
   MAILCHIMP_SERVER=us5
   MAILCHIMP_AUDIENCE_ID=5bb1893f5c
   
   OPENAI_API_KEY=YOUR_OPENAI_KEY
   
   DOMAIN=investwithdiomin.today
   BUSINESS_EMAIL=book@investwithdiomin.today
   ```

   **Note**: You'll need to get the actual values for:
   - `VITE_SUPABASE_ANON_KEY` - From Supabase dashboard → Settings → API → anon public key
   - `SUPABASE_SERVICE_ROLE` - From Supabase dashboard → Settings → API → service_role key
   - `OPENAI_API_KEY` - From https://platform.openai.com/api-keys

5. **Click Deploy**
   - Vercel will build and deploy your app
   - You'll get a live URL like: `https://invest-with-diomin.vercel.app`

## Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `investwithdiomin.today`
4. Follow the DNS instructions:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

## Auto-Deployment

Once connected, every time you push to GitHub `main` branch, Vercel will automatically redeploy your site!

## Webhook Integration

Your Replit webhook backend is at:
- `https://hubspot-supabase-webhook.rustybm1.repl.co/webhooks`

Make sure your HubSpot forms point to this webhook URL.
