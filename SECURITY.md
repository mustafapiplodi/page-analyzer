# 🔒 Security Guide

## API Key Protection

### ✅ What We Do to Protect Your API Key

1. **Server-Side Only**
   - API keys are NEVER exposed to the client
   - All requests go through our serverless proxy
   - Keys are stored in environment variables

2. **Git Protection**
   - `.env` files are in `.gitignore`
   - Never commit secrets to version control
   - Use `.env.example` as a template only

3. **Environment Isolation**
   - Development keys separate from production
   - Use different keys for testing
   - Rotate keys regularly

### 🚀 Setup Instructions

#### Local Development

1. **Copy the template:**
   ```bash
   cp .env.example .env
   ```

2. **Get your API key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable PageSpeed Insights API
   - Create credentials → API Key
   - Copy the key

3. **Add to `.env`:**
   ```bash
   PAGESPEED_API_KEY=YOUR_ACTUAL_KEY_HERE
   ```

4. **Verify it's gitignored:**
   ```bash
   git status
   # .env should NOT appear in untracked files
   ```

#### Production Deployment (Vercel)

1. **Go to Vercel Dashboard:**
   - Select your project
   - Go to Settings → Environment Variables

2. **Add variable:**
   ```
   Name: PAGESPEED_API_KEY
   Value: your_actual_key_here
   Environment: Production, Preview, Development
   ```

3. **Redeploy:**
   ```bash
   vercel --prod
   ```

#### Production Deployment (Netlify)

1. **Go to Netlify Dashboard:**
   - Select your site
   - Go to Site settings → Build & deploy → Environment

2. **Add variable:**
   ```
   Key: PAGESPEED_API_KEY
   Value: your_actual_key_here
   ```

3. **Trigger deploy:**
   ```bash
   netlify deploy --prod
   ```

### ⚠️ Security Best Practices

#### ✅ DO

- ✅ Use environment variables for secrets
- ✅ Keep `.env` in `.gitignore`
- ✅ Use different keys for dev/staging/prod
- ✅ Rotate API keys every 90 days
- ✅ Monitor API usage for anomalies
- ✅ Set up rate limiting
- ✅ Use HTTPS only
- ✅ Implement CORS properly

#### ❌ DON'T

- ❌ Commit `.env` files to git
- ❌ Share API keys in chat/email
- ❌ Use production keys in development
- ❌ Expose keys in client-side code
- ❌ Push keys to public repositories
- ❌ Hardcode secrets in source files
- ❌ Share screenshots with visible keys
- ❌ Log API keys to console

### 🔍 Checking for Leaked Secrets

#### Before Committing

```bash
# Check what's being committed
git diff --staged

# Verify .env is not tracked
git status

# Search for potential secrets
git grep -i "api" | grep -i "key"
```

#### If You Accidentally Committed a Secret

**IMMEDIATE ACTIONS:**

1. **Rotate the key immediately:**
   - Go to Google Cloud Console
   - Delete the exposed key
   - Generate a new one

2. **Remove from git history:**
   ```bash
   # For recent commit
   git reset HEAD~1
   git commit -m "your message" --amend

   # For older commits (use with caution)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force push (if already pushed):**
   ```bash
   git push --force
   ```

4. **Notify your team**

### 🛡️ Rate Limiting

#### API Key Rate Limits

Google PageSpeed Insights API limits (with key):
- 25,000 requests per day
- 400 requests per 100 seconds

**We implement additional limits:**
- Client-side: 1 test per 5 seconds
- Server-side: 10 tests per hour (free tier)
- Authenticated users: Higher limits

#### Monitoring Usage

```javascript
// Check your quota usage
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=example.com&key=YOUR_KEY
// Response headers include:
// X-RateLimit-Limit: 400
// X-RateLimit-Remaining: 385
```

### 🔐 Additional Security Measures

#### Input Validation

```javascript
// We validate all URLs before testing
function validateUrl(url) {
  try {
    const parsed = new URL(url);
    // Only allow http/https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    // Prevent localhost/internal IPs
    if (parsed.hostname === 'localhost' ||
        parsed.hostname.startsWith('192.168.') ||
        parsed.hostname.startsWith('10.')) {
      throw new Error('Cannot test internal URLs');
    }
    return true;
  } catch (error) {
    return false;
  }
}
```

#### CORS Configuration

```javascript
// api/pagespeed.js
res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

#### Request Sanitization

```javascript
// Remove sensitive headers
delete req.headers.authorization;
delete req.headers.cookie;

// Sanitize URLs
const cleanUrl = url.split('?')[0]; // Remove query params if needed
```

### 📊 Monitoring & Alerts

#### Set up alerts for:

1. **Unusual API usage:**
   - Sudden spike in requests
   - Requests from unknown IPs
   - Failed authentication attempts

2. **Rate limit reached:**
   - Approaching daily quota
   - Hitting per-second limits

3. **Error rates:**
   - >5% 403 errors (auth issues)
   - >10% 429 errors (rate limits)

#### Example: Google Cloud Monitoring

```bash
# Enable API monitoring
gcloud services enable monitoring.googleapis.com

# Create alert policy
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="PageSpeed API Usage Alert" \
  --condition-threshold-value=20000 \
  --condition-threshold-duration=3600s
```

### 🔄 Key Rotation Schedule

**Recommended rotation:**
- Development keys: Every 90 days
- Production keys: Every 90 days or after employee departure
- Emergency rotation: Immediately if compromised

**Rotation checklist:**
1. Generate new key in Google Cloud Console
2. Update `.env` locally
3. Update environment variables in Vercel/Netlify
4. Test with new key
5. Delete old key
6. Update documentation
7. Notify team

### 📝 Incident Response Plan

**If API key is compromised:**

1. **Immediate (0-5 minutes):**
   - Revoke the exposed key
   - Generate new key
   - Update all environments

2. **Short-term (5-30 minutes):**
   - Review recent API logs
   - Check for unauthorized usage
   - Assess impact

3. **Follow-up (30+ minutes):**
   - Document incident
   - Update security procedures
   - Team debrief

### 📞 Support

**If you suspect a security issue:**
- Email: security@yoursite.com
- Do NOT post in public issues
- Do NOT share details on social media

**For API key issues:**
- Check [Google Cloud Status](https://status.cloud.google.com/)
- Review [API documentation](https://developers.google.com/speed/docs/insights/v5/get-started)
- Contact support: support@yoursite.com

---

## Quick Reference

### ✅ Setup Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Get API key from Google Cloud Console
- [ ] Add key to `.env`
- [ ] Verify `.env` is gitignored
- [ ] Test locally
- [ ] Add to Vercel/Netlify environment variables
- [ ] Deploy and test production
- [ ] Set up monitoring alerts
- [ ] Schedule key rotation reminder

### 🚨 Emergency Contacts

- **Google Cloud Support:** https://cloud.google.com/support
- **Vercel Support:** support@vercel.com
- **Security Issues:** security@yoursite.com

---

**Last Updated:** 2024-11-07
**Review Schedule:** Quarterly
