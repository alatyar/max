#!/bin/bash

# Fix Cloudways deployment issues
echo "Fixing Cloudways Node.js and npm issues..."

# Fix npm cache permissions first
echo "1. Fixing npm cache permissions..."
sudo chown -R $(whoami):$(whoami) ~/.npm
npm cache clean --force

# Alternative: Clear npm cache completely
rm -rf ~/.npm
mkdir ~/.npm

# Install with --force to bypass engine warnings
echo "2. Installing dependencies with --force..."
npm install --force --no-optional

# If that fails, try with legacy peer deps
echo "3. Alternative: Installing with legacy peer deps..."
npm install --legacy-peer-deps --force

# Check Node.js version
echo "4. Current Node.js version:"
node --version

echo "5. If build still fails, try:"
echo "   - Update Node.js to v18.18.0+ or v20+"
echo "   - Or downgrade packages to support v18.17.1"

# Try to build
echo "6. Attempting build..."
npm run build

echo "Setup completed!"
