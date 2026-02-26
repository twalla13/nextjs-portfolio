# Deployment Guide — tonidocs.com

Full step-by-step for deploying the portfolio on AWS (S3 + CloudFront) with HTTPS,
and setting up the contact form (Lambda + SES).

---

## 0. Check if HTTPS is working right now

Open your terminal and run:
```bash
curl -sI https://tonidocs.com | head -5
```
- If you see `HTTP/2 200` → HTTPS is already working ✅
- If you get a certificate error or see `HTTP/1.1 301` → follow Section 3 below.

You can also check in Chrome: click the padlock icon in the address bar → "Connection is secure".

---

## 1. Local development

```bash
# Install dependencies
npm install

# Generate optimized WebP images (first time only)
npm run setup

# Start dev server
npm run dev
```

Create `.env.local` from the example:
```bash
cp .env.example .env.local
# Edit .env.local and fill in your values
```

---

## 2. Build & deploy the static site

```bash
npm run build          # generates ./out
```

Upload `./out` to your S3 bucket:
```bash
aws s3 sync out/ s3://YOUR_BUCKET_NAME/ --delete
```

Or let AWS CodeBuild do it automatically (the `buildspec.yml` is already configured).

### CodeBuild environment variables to add
In your CodeBuild project → Environment → Additional configuration:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_CONTACT_API_URL` | API Gateway URL (from Step 4) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key |

---

## 3. HTTPS with CloudFront + ACM certificate

### Step-by-step

1. **Request a certificate in ACM**
   - Open [AWS Certificate Manager](https://console.aws.amazon.com/acm) in **us-east-1** (required for CloudFront)
   - Click "Request" → "Public certificate"
   - Add domain names: `tonidocs.com` and `www.tonidocs.com`
   - Choose "DNS validation"
   - Click "Request"

2. **Validate via DNS**
   - ACM shows you a CNAME record (name + value)
   - Log in to your domain registrar / DNS provider
   - Add the CNAME record ACM gives you
   - Wait ~5 minutes — ACM will show "Issued" ✅

3. **Attach the certificate to CloudFront**
   - Open your CloudFront distribution → "Edit"
   - Alternate domain names (CNAMEs): add `tonidocs.com` and `www.tonidocs.com`
   - Custom SSL certificate: select the ACM cert you just issued
   - Security policy: `TLSv1.2_2021` (recommended)
   - Save → wait for distribution to deploy (~5 min)

4. **Enforce HTTPS redirect**
   - In CloudFront → Behaviors → Default → Edit
   - Viewer Protocol Policy: **"Redirect HTTP to HTTPS"**
   - Save

5. **Point DNS to CloudFront**
   - In your DNS provider, add/update:
     ```
     Type   Name   Value
     CNAME  www    XXXXXXXXXXXX.cloudfront.net
     ALIAS  @      XXXXXXXXXXXX.cloudfront.net   ← use ALIAS/ANAME for root domain
     ```
   - Or if using Route 53: create an A record with "Alias to CloudFront distribution"

6. **Fix subdirectory routing (important for multi-page site)**

   Because Next.js static export creates `out/about.html` (not `out/about/index.html`),
   you need a CloudFront Function to rewrite paths.

   Create a CloudFront Function (Viewer Request):
   ```javascript
   function handler(event) {
     var request = event.request;
     var uri = request.uri;
     // Append .html to paths that don't have an extension
     if (!uri.includes('.') && !uri.endsWith('/')) {
       request.uri = uri + '.html';
     }
     return request;
   }
   ```
   Attach it to your CloudFront distribution → Default behavior → Viewer Request.

   *(Alternatively, enable `trailingSlash: true` in `next.config.mjs` and configure
   S3 website hosting with index documents — see the commented-out option in next.config.mjs.)*

---

## 4. Contact form — Lambda + SES

### One-time SES setup
1. Open [SES Console](https://console.aws.amazon.com/ses) (same region as Lambda, e.g. us-east-1)
2. Go to **Verified identities** → "Create identity"
3. Verify your sender email or domain:
   - **Email**: enter `toniwallace97@outlook.com` → click the link in the verification email
   - **Domain** (recommended): enter `tonidocs.com` → add the CNAME records to DNS
4. If your AWS account is still in **SES sandbox**, you can only send to verified addresses.
   To send to anyone: request **production access** via SES → "Account dashboard" → "Request production access"

### Deploy the Lambda function
Prerequisites: [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

```bash
cd lambda

# Build the function
sam build

# First deploy (interactive — saves answers to samconfig.toml)
sam deploy --guided
# Answer the prompts:
#   Stack name:         portfolio-contact
#   AWS Region:         us-east-1
#   FromEmail:          noreply@tonidocs.com  (or toniwallace97@outlook.com if verified)
#   ToEmail:            toniwallace97@outlook.com
#   TurnstileSecretKey: (your secret key, or press Enter to skip)
#   AllowedOrigin:      https://tonidocs.com

# Future deploys
sam deploy
```

After deploy, SAM prints the `ContactApiUrl` output. Copy it.

### Wire it up to the frontend
1. Add to CodeBuild environment variables:
   ```
   NEXT_PUBLIC_CONTACT_API_URL = https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/Prod/contact
   ```
2. Add to `.env.local` for local testing
3. Rebuild and redeploy the site

---

## 5. Cloudflare Turnstile (spam protection)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Turnstile → "Add site"
2. Domain: `tonidocs.com` → Widget type: **Managed** → Create
3. Copy the **Site Key** (public) → add to CodeBuild + `.env.local` as `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
4. Copy the **Secret Key** (private) → add to SAM deploy as `TurnstileSecretKey` (never in frontend code)

---

## 6. Plausible analytics

1. Sign up at [plausible.io](https://plausible.io) (free for 1 site on trial, then ~$9/mo)
2. Add site: `tonidocs.com`
3. The tracking script is already in `src/app/layout.tsx` — no code changes needed

---

## 7. Resume PDF

Place your resume at:
```
public/resume.pdf
```
The "Resume ↓" link in the nav and About page will automatically serve it.

---

## 8. Lighthouse / performance checklist

Run locally after `npm run build`:
```bash
# Serve the static export
npx serve out -p 3000

# In another terminal — requires Chrome
npx lighthouse http://localhost:3000 --view
```

Target scores:
| Metric | Target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

Key wins already in place:
- Hero image uses `priority` (preloaded)
- All images are WebP (4.7 MB → 260 KB)
- Below-fold images lazy-load
- Google Fonts use `display: swap`
- No render-blocking scripts
- Plausible loads `afterInteractive`
- Skip-to-content link for keyboard users

---

## 9. Security headers (CloudFront)

Create a **CloudFront Response Headers Policy** with these headers:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

For a CSP, start with:
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com https://plausible.io 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://plausible.io https://*.execute-api.us-east-1.amazonaws.com; frame-src https://challenges.cloudflare.com;
```

Attach the policy to your CloudFront distribution → Default behavior.

---

## 10. Adding/updating projects

Edit `src/data/projects.ts`. Copy one of the placeholder entries and fill in:
- `title`, `summary`, `description`
- `techStack` array
- `github` and/or `liveUrl`
- `screenshot`: save the image to `public/imgs/projects/your-project.webp` and set the path
- `whatILearned`
- `featured: true` to show it on the homepage (max 3 shown)

Then rebuild and redeploy.
