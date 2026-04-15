# Vercel Deployment Guide

## Deployment Status: ✅ Ready

Your application is now configured for Vercel deployment.

## Files Configured

| File | Status |
|------|--------|
| `vercel.json` | ✅ Configured |
| `api/index.ts` | ✅ Configured |
| `package.json` | ✅ Configured (build:vercel script) |

## Deployment Steps

### 1. Push Changes to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Click "Deploy"

### 3. Add Environment Variables

In Vercel project settings, add these variables from your `.env` file:

```
ADMIN_PASSWORD=your_bcrypt_hash
BREVO_API_KEY=your_brevo_key
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CONTACT_EMAIL=your_email
DB_NAME=jain_foam
MONGODB_URI=your_mongodb_uri
NODE_ENV=production
SESSION_SECRET=your_secret
```

### 4. Deploy

- Click "Deploy" after adding variables
- Wait 2-3 minutes for build
- Your site will be live at `https://your-project.vercel.app`

## Known Limitations

| Feature | Status | Notes |
|---------|--------|-------|
| Frontend | ✅ Works | React + Vite |
| Backend API | ✅ Works | Express on Vercel |
| MongoDB | ✅ Works | External (Atlas) |
| Cloudinary Images | ✅ Works | External storage |
| Admin Sessions | ⚠️ Limited | May need re-login |

## Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `NODE_ENV=production` is set
4. Make sure build command is: `npm run build:vercel`

---

For help, visit: https://vercel.com/docs
