# Vercel Deployment Guide for DeFi Therapist

## Quick Deploy to Vercel (Free Tier)

### Prerequisites
1. GitHub account
2. Vercel account (free at vercel.com)
3. OpenAI API key

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your project code to the repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/defi-therapist.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration

### Step 3: Configure Environment Variables
In your Vercel project settings, add these environment variables:
- `OPENAI_API_KEY` - Your OpenAI API key

### Step 4: Deploy
1. Click "Deploy" 
2. Vercel will build and deploy your application
3. You'll get a live URL like `https://your-project.vercel.app`

## Project Structure for Vercel

Your project is now configured with:

### API Routes (Serverless Functions)
- `/api/solana/price` - Fetches current SOL price
- `/api/trades/[walletAddress]` - Gets trading data for a wallet
- `/api/analyze` - Performs AI trading psychology analysis

### Frontend
- Built with React + Vite
- Optimized for production deployment
- All assets bundled and optimized

## Environment Variables Needed

Make sure to set these in your Vercel dashboard:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Deployment Features

✅ **Completely Free** - Uses Vercel's generous free tier
✅ **Automatic HTTPS** - SSL certificates included
✅ **Global CDN** - Fast loading worldwide
✅ **Automatic Deployments** - Updates when you push to GitHub
✅ **Serverless Functions** - No server management needed

## Live App Features

Your deployed app will have:
- Phantom wallet connection (demo mode)
- AI-powered trading psychology analysis
- Beautiful, responsive design
- Real-time Solana price data

## Custom Domain (Optional)

Once deployed, you can add a custom domain in Vercel settings for a professional look.

## Support

If you need help with deployment or want to add real Phantom wallet integration, just let me know!