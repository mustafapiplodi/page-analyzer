# Deployment Guide - Vercel Free Plan

This guide will help you deploy the Website Speed Test Tool to Vercel's free plan.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Google PageSpeed Insights API Key
- Git repository pushed to GitHub/GitLab/Bitbucket

## Quick Deploy

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy the project**
   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N** (first time) or **Y** (subsequent deployments)
   - What's your project's name? `page-speed-analyzer` (or your preferred name)
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

3. **Set Environment Variables**
   ```bash
   vercel env add PAGESPEED_API_KEY
   ```

   When prompted:
   - What's the value? Paste your Google PageSpeed Insights API key
   - Add to which environments? Choose: **Production, Preview, Development**

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Import Repository**
   - Go to https://vercel.com/new
   - Import your Git repository
   - Framework Preset: **Other** (or **Vite**)
   - Root Directory: `./`

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following:
     - **Name:** `PAGESPEED_API_KEY`
     - **Value:** Your Google PageSpeed Insights API key
     - **Environments:** Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)

## Getting Your Google PageSpeed Insights API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable the PageSpeed Insights API:
   - Navigate to [API Library](https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com)
   - Click "Enable"
4. Create credentials:
   - Go to [Credentials](https://console.cloud.google.com/apis/credentials)
   - Click "Create Credentials" → "API Key"
   - Copy the API key
5. (Optional but Recommended) Restrict the API key:
   - Click "Edit API Key"
   - Under "API restrictions", select "Restrict key"
   - Choose "PageSpeed Insights API"
   - Under "Website restrictions", add your Vercel domain

## Post-Deployment Steps

1. **Verify Deployment**
   - Visit your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
   - Test the speed analyzer with a sample URL
   - Check that all features work (dark mode, about section, etc.)

2. **Set Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `speedanalyzer.scalinghigh.com`)
   - Update DNS records as instructed by Vercel
   - Update meta tags in `index.html` with your new domain

3. **Monitor Usage**
   - Vercel Free Plan Limits:
     - 100 GB bandwidth per month
     - 100 hours of serverless function execution
     - 6,000 serverless function invocations per day
   - Check your usage in Vercel Dashboard → Settings → Usage

## Troubleshooting

### Build Fails

**Error:** `Module not found` or `Cannot find module`
- **Solution:** Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify
- Check that `node_modules` is in `.gitignore`

**Error:** `Build exceeded time limit`
- **Solution:** Optimize build (already optimized in this project)
- Vercel free plan allows up to 45 seconds build time

### API Not Working

**Error:** `Failed to fetch` or `API key invalid`
- **Solution:**
  - Verify `PAGESPEED_API_KEY` is set in Vercel Environment Variables
  - Check that the API key is valid and PageSpeed Insights API is enabled
  - Ensure no extra spaces in the API key value
  - Redeploy after adding environment variables

**Error:** `429 Too Many Requests`
- **Solution:**
  - You've hit Google's API rate limit
  - Wait a few minutes before testing again
  - Consider implementing caching (Redis) for production
  - Restrict API key to your domain only

### Routing Issues

**Error:** API routes return 404
- **Solution:**
  - Verify `vercel.json` includes API rewrites
  - Ensure `api/` folder is in the project root
  - Check that serverless functions are in `api/*.js` format

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PAGESPEED_API_KEY` | Yes | Google PageSpeed Insights API key | `AIzaSyD...` |
| `RATE_LIMIT_FREE_TIER` | No | Requests per hour limit | `10` |
| `RATE_LIMIT_PAID_TIER` | No | Requests per hour limit | `100` |
| `REDIS_URL` | No | Redis connection for caching | `redis://...` |

## Vercel Free Plan Specifications

- ✅ **100 GB Bandwidth** per month
- ✅ **6,000 Serverless Function Invocations** per day
- ✅ **100 Hours Serverless Function Execution** per month
- ✅ **Automatic HTTPS** with SSL certificate
- ✅ **Automatic deployments** from Git branches
- ✅ **Preview deployments** for pull requests
- ✅ **Custom domains** (bring your own domain)
- ✅ **Edge Network** (global CDN)

## Performance Optimization Tips

1. **Enable Caching** (for production with high traffic):
   - Set up Redis (Upstash offers free tier)
   - Add `REDIS_URL` environment variable
   - Cache PageSpeed API responses for 1 hour

2. **Implement Rate Limiting**:
   - Set `RATE_LIMIT_FREE_TIER=10` to prevent API quota exhaustion
   - Consider adding CAPTCHA for public access

3. **Monitor Analytics**:
   - Add Vercel Analytics (free for hobby plans)
   - Track page views and performance

## Support

- **Vercel Documentation:** https://vercel.com/docs
- **Vercel Community:** https://github.com/vercel/vercel/discussions
- **Google PageSpeed API Docs:** https://developers.google.com/speed/docs/insights/v5/get-started

## Next Steps After Deployment

1. ✅ Test all features thoroughly
2. ✅ Update `index.html` meta tags with production URL
3. ✅ Submit to Google Search Console for indexing
4. ✅ Add sitemap.xml for SEO
5. ✅ Set up Google Analytics (optional)
6. ✅ Monitor API usage and optimize as needed

---

**Deployed by:** Scaling High Technologies (https://www.scalinghigh.com)
