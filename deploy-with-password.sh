#!/bin/bash

# MAX TV PRO Deployment Script with Password
SERVER="209.38.216.128"
USERNAME="extramaxpro"
PASSWORD="eXtr@1122"

echo "Starting deployment to Cloudways..."

# Create deployment package
echo "Creating deployment package..."
tar -czf max-tv-pro-deploy.tar.gz --exclude=node_modules --exclude=.git --exclude=.next --exclude=*.sh --exclude=*.bat --exclude=*.ps1 .

# Upload files using sshpass
echo "Uploading files..."
sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no max-tv-pro-deploy.tar.gz $USERNAME@$SERVER:~/

# Extract files on server
echo "Extracting files on server..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "cd public_html && rm -rf * && cd ~ && tar -xzf max-tv-pro-deploy.tar.gz -C public_html/"

# Install dependencies
echo "Installing dependencies..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "cd public_html && npm install"

# Build project
echo "Building project..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "cd public_html && npm run build"

# Start with PM2
echo "Starting application with PM2..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "cd public_html && pm2 delete max-tv-pro 2>/dev/null || true && pm2 start npm --name 'max-tv-pro' -- start"

# Save PM2 configuration
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "pm2 save"

echo "Deployment completed successfully!"
echo "Your site should be available at: http://$SERVER"
