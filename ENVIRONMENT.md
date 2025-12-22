# Environment Variables

This project uses environment variables for configuration. Copy `.env.example` to `.env.local` and fill in your values.

## Required Variables

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - Your site's URL (used for SEO and metadata)

### Contact Form
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` - Web3Forms API endpoint
- `NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY` - Your Web3Forms access key

## Optional Variables

### Analytics
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (format: G-XXXXXXXXXX)
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Vercel Analytics ID (optional, works automatically on Vercel)

## Setup Instructions

### 1. Contact Form (Web3Forms)

1. Go to [Web3Forms](https://web3forms.com/)
2. Sign up for a free account
3. Create a new form and get your access key
4. Add the access key to your `.env.local` file

### 2. Google Analytics (Optional)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Get your Measurement ID (starts with G-)
4. Add it to your `.env.local` file

### 3. Vercel Analytics (Optional)

1. Deploy your site to Vercel
2. Enable Analytics in your Vercel dashboard
3. Analytics will work automatically (no configuration needed)

## Example .env.local

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Contact Form
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY=1ddb24a6-3980-4e81-a3a1-8b2448d251c6

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Security Notes

- Never commit `.env.local` to version control
- Only use `NEXT_PUBLIC_` prefix for variables that should be exposed to the browser
- Keep your Web3Forms access key secure
- Regularly rotate your access keys