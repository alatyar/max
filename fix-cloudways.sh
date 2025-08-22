#!/bin/bash

# Fix Cloudways deployment issues
SERVER="209.38.216.128"
USERNAME="extramaxpro"
PASSWORD="eXtr@1122"

echo "Diagnosing and fixing deployment issues..."

# Check current directory structure
echo "Checking directory structure..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "ls -la public_html/"

# Check if Node.js and npm are available
echo "Checking Node.js installation..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "node --version && npm --version"

# Check PM2 status
echo "Checking PM2 status..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "pm2 status"

# Check if port 3000 is being used
echo "Checking port 3000..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "netstat -tlnp | grep :3000"

# Try to start the application manually
echo "Starting application manually..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "cd public_html && npm start &"

# Check web server configuration
echo "Checking web server status..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "ps aux | grep nginx"
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER "ps aux | grep apache"
