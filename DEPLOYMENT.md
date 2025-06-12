# Netlify Deployment Guide

## Prerequisites
- GitHub account
- Netlify account (free tier available)

## Step-by-Step Deployment

### 1. Prepare Repository
```bash
git add .
git commit -m "Portfolio ready for deployment"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Git Integration (Recommended)
1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose your Git provider (GitHub)
4. Select your portfolio repository
5. Configure build settings:
   - **Build command**: `vite build`
   - **Publish directory**: `dist/public`
6. Click "Deploy site"

#### Option B: Manual Upload
1. Run `npm run build` locally
2. Upload the `dist/public` folder to Netlify

### 3. Custom Domain (Optional)
1. In Netlify dashboard, go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed

### 4. Environment Variables
No environment variables needed for this static portfolio.

## Build Configuration

The `netlify.toml` file includes:
- Node.js 20 environment
- SPA routing redirects
- Optimized build settings

## Performance Optimizations

The build includes:
- Minified CSS and JavaScript
- Optimized images
- Gzip compression
- CDN delivery via Netlify Edge

## Troubleshooting

### Build Fails
- Check Node.js version (should be 20+)
- Verify all dependencies are installed
- Check for TypeScript errors

### Spline Not Loading
- Ensure external script loading is enabled
- Check browser console for errors
- Verify Spline URL is accessible

### Navigation Issues
- Confirm SPA redirects are working
- Check `_redirects` file in public folder

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All sections navigate properly
- [ ] Spline 3D background displays
- [ ] Social links work
- [ ] Email links function
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable

Your portfolio will be available at: `https://[site-name].netlify.app`