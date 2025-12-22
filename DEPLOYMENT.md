# Deployment Guide

## Pre-deployment Checklist

### 1. Environment Variables
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Configure any analytics IDs if using tracking
- [ ] Set up contact form endpoint if using external service

### 2. Content Updates
- [ ] Update personal information in `src/app/layout.tsx`
- [ ] Update social media links in structured data
- [ ] Replace placeholder content in data files
- [ ] Add your actual resume PDF to `/public/resume.pdf`
- [ ] Add your profile image and update references

### 3. SEO Optimization
- [ ] Create and add Open Graph image (`/public/og-image.jpg`)
- [ ] Verify sitemap is accessible at `/sitemap.xml`
- [ ] Check robots.txt configuration
- [ ] Test structured data with Google's Rich Results Test

### 4. Performance Testing
- [ ] Run `npm run build` to ensure no build errors
- [ ] Test animations in production build
- [ ] Verify image optimization is working
- [ ] Check Core Web Vitals with Lighthouse

## Vercel Deployment

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure build settings
3. Set environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables in Vercel
Set these in your Vercel project settings:
- `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g., https://your-domain.vercel.app)

## Post-deployment Verification

### 1. Functionality Tests
- [ ] Navigation smooth scrolling works
- [ ] Theme toggle functions correctly
- [ ] Contact form submits (if implemented)
- [ ] Resume download works
- [ ] All animations play correctly
- [ ] Mobile responsiveness

### 2. SEO Tests
- [ ] Meta tags appear correctly in page source
- [ ] Open Graph preview works on social media
- [ ] Sitemap is accessible and valid
- [ ] Google Search Console setup
- [ ] Structured data validation

### 3. Performance Tests
- [ ] Lighthouse score > 90 for all metrics
- [ ] Images load with proper optimization
- [ ] No console errors
- [ ] Fast loading on mobile networks

## Monitoring and Maintenance

### Analytics Setup
- Set up Vercel Analytics for performance monitoring
- Configure Google Analytics if needed
- Monitor Core Web Vitals

### Regular Updates
- Keep dependencies updated
- Monitor and fix any accessibility issues
- Update content regularly
- Check for broken links

## Troubleshooting

### Common Issues
1. **Build Failures**: Check for TypeScript errors and missing dependencies
2. **Image Loading Issues**: Verify image paths and formats
3. **Animation Problems**: Ensure Framer Motion is properly configured
4. **SEO Issues**: Validate structured data and meta tags

### Performance Issues
1. **Slow Loading**: Check image sizes and compression
2. **Large Bundle**: Use bundle analyzer (`npm run analyze`)
3. **Poor Core Web Vitals**: Optimize images and reduce JavaScript

For more help, check the [Next.js deployment documentation](https://nextjs.org/docs/deployment).