# Vercel Deployment Guide

This guide will walk you through deploying your Secure Authentication System to Vercel step by step.

## Prerequisites

1. ✅ GitHub account with your repository: [https://github.com/Aayushgupta24/Login-System](https://github.com/Aayushgupta24/Login-System)
2. ✅ Vercel account: [https://vercel.com](https://vercel.com)
3. ✅ MongoDB Atlas account (recommended for production) or MongoDB connection string

## Step 1: Set Up MongoDB Atlas (Recommended)

Since Vercel uses serverless functions, you'll need a cloud MongoDB instance:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier is fine)
4. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Save the username and password
5. Whitelist IP addresses:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for Vercel
6. Get your connection string:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/auth_system?retryWrites=true&w=majority`

## Step 2: Prepare Your Code

The project has been configured for Vercel with:
- ✅ `vercel.json` configuration file
- ✅ `api/index.js` serverless function entry point
- ✅ Updated `server.js` for Vercel compatibility
- ✅ Optimized database connection for serverless

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your repository: `Aayushgupta24/Login-System`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Other (or leave as default)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   | Name | Value | Description |
   |------|-------|-------------|
   | `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | `your_super_secret_jwt_key` | A strong random string (use a password generator) |
   | `JWT_EXPIRES_IN` | `7d` | JWT expiration time |
   | `NODE_ENV` | `production` | Environment mode |
   | `FRONTEND_URL` | `https://your-app.vercel.app` | Your Vercel app URL (optional) |

   **Important**: 
   - Generate a strong JWT_SECRET (at least 32 characters)
   - Use your MongoDB Atlas connection string for MONGODB_URI
   - You can update FRONTEND_URL after deployment with your actual Vercel URL

5. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete (usually 1-2 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd "/Users/aayushkumargupta/Downloads/Login System"
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? No (first time)
   - Project name: login-system (or your choice)
   - Directory: ./
   - Override settings? No

4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add JWT_EXPIRES_IN
   vercel env add NODE_ENV
   ```
   
   Enter the values when prompted.

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 4: Update CORS Settings (After First Deployment)

After your first deployment:

1. Go to your Vercel project dashboard
2. Note your deployment URL (e.g., `https://login-system.vercel.app`)
3. Go to Settings → Environment Variables
4. Add or update `FRONTEND_URL` with your Vercel URL
5. Redeploy (Vercel will auto-redeploy if connected to GitHub)

## Step 5: Test Your Deployment

1. **Visit your deployed app**
   - Go to your Vercel dashboard
   - Click on your deployment
   - Open the URL (e.g., `https://login-system.vercel.app`)

2. **Test Registration**
   - Go to `/register.html`
   - Create a test account
   - Verify it works

3. **Test Login**
   - Go to `/login.html`
   - Login with your test account
   - Verify it works

4. **Test Protected Route**
   - Go to `/dashboard.html`
   - Verify you can access it after login

## Step 6: Connect GitHub for Auto-Deployments

1. In Vercel dashboard, go to Settings → Git
2. Connect your GitHub repository
3. Enable "Automatic deployments from Git"
4. Now, every push to your main branch will auto-deploy

## Troubleshooting

### Issue: MongoDB Connection Error

**Solution**: 
- Verify your MongoDB Atlas connection string
- Check that your IP is whitelisted (or use 0.0.0.0/0)
- Verify database user credentials
- Check Vercel environment variables are set correctly

### Issue: CORS Errors

**Solution**:
- Update `FRONTEND_URL` in Vercel environment variables
- Make sure CORS is configured to allow your Vercel domain
- Check browser console for specific CORS errors

### Issue: Cookies Not Working

**Solution**:
- Vercel uses HTTPS by default, so cookies should work
- Verify cookie settings in `routes/auth.js`
- Check that `credentials: true` is set in CORS
- Test in an incognito window

### Issue: Environment Variables Not Working

**Solution**:
- Go to Vercel dashboard → Settings → Environment Variables
- Verify all variables are set
- Make sure they're set for "Production" environment
- Redeploy after adding/updating variables

### Issue: Function Timeout

**Solution**:
- Vercel free tier has 10-second timeout for serverless functions
- MongoDB connection might be slow on first request
- The connection caching should help with subsequent requests
- Consider upgrading to Pro plan for longer timeouts

## Production Checklist

Before going live:

- [ ] MongoDB Atlas cluster is set up and accessible
- [ ] Strong JWT_SECRET is generated and set
- [ ] All environment variables are configured in Vercel
- [ ] CORS is configured for your domain
- [ ] Test registration, login, and protected routes
- [ ] Verify cookies work correctly
- [ ] Check error handling works
- [ ] Review security settings
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)

## Custom Domain (Optional)

1. Go to Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `FRONTEND_URL` environment variable with your custom domain

## Monitoring

- **Vercel Dashboard**: Monitor deployments, logs, and analytics
- **MongoDB Atlas**: Monitor database connections and performance
- **Function Logs**: Check Vercel dashboard → Deployments → Function Logs

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js)

## Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Test MongoDB connection separately
4. Review the troubleshooting section above

---

**Your app should now be live on Vercel! 🚀**

