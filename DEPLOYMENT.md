# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages using GitHub Actions.

## Prerequisites

1. A GitHub repository (https://github.com/nolostra/nolostra.git)
2. GitHub Pages enabled in your repository settings

## Setup Steps

### 1. Initialize Git Repository (if not already done)

```bash
cd personal-portfolio
git init
git add .
git commit -m "Initial commit: Portfolio setup"
```

### 2. Add Remote Repository

```bash
git remote add origin https://github.com/nolostra/nolostra.git
git branch -M main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/nolostra/nolostra
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the changes

### 4. Configure EmailJS (Optional)

If you're using EmailJS for the contact form, add these secrets to your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### 5. Push to GitHub

```bash
git push -u origin main
```

### 6. Deploy

Once you push to the `main` branch, the GitHub Actions workflow will automatically:
1. Build your Next.js app
2. Deploy it to GitHub Pages

The deployment will be available at:
- `https://nolostra.github.io/nolostra/` (if repo name matches username, it might be at root)

## Manual Deployment

If you want to trigger a deployment manually:
1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Troubleshooting

### Build Fails
- Check the **Actions** tab for error logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Pages Not Loading
- Check if GitHub Pages is enabled in repository settings
- Verify the workflow completed successfully
- Check the Pages settings for the correct source

### Contact Form Not Working
- Ensure EmailJS secrets are configured
- Check browser console for errors
- Verify EmailJS service is active

## Notes

- The site is built as a static export (no server-side features)
- Images are unoptimized (required for static export)
- The workflow runs on every push to `main` branch

