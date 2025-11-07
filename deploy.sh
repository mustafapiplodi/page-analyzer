#!/bin/bash

echo "=========================================="
echo "Website Speed Test - Vercel Deployment"
echo "=========================================="
echo ""

# Check if user is logged in
if ! vercel whoami >/dev/null 2>&1; then
  echo "📝 You need to login to Vercel first"
  echo "Run: vercel login"
  echo ""
  exit 1
fi

echo "✅ Logged in as: $(vercel whoami)"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "⚠️  Warning: .env file not found"
  echo "Make sure you have your PAGESPEED_API_KEY ready"
  echo ""
fi

echo "🚀 Starting deployment..."
echo ""

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
  echo ""
  echo "=========================================="
  echo "✅ Deployment successful!"
  echo "=========================================="
  echo ""
  echo "Next steps:"
  echo "1. Set your API key if not already set:"
  echo "   vercel env add PAGESPEED_API_KEY"
  echo ""
  echo "2. If you added environment variables, redeploy:"
  echo "   vercel --prod"
  echo ""
  echo "3. Visit your deployment URL and test the app"
  echo ""
else
  echo ""
  echo "❌ Deployment failed"
  echo "Check the error messages above"
  echo ""
  echo "Common issues:"
  echo "- Not logged in: Run 'vercel login'"
  echo "- Missing dependencies: Run 'npm install'"
  echo "- Build errors: Run 'npm run build' locally to test"
  echo ""
fi
