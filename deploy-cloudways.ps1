# MAX TV PRO Deployment Script for Cloudways
Write-Host "Starting deployment to Cloudways..." -ForegroundColor Green

# Server details
$server = "209.38.216.128"
$username = "extramaxpro"
$password = "eXtr@1122"
$remotePath = "public_html"

# Create deployment archive (excluding unnecessary files)
Write-Host "Creating deployment package..." -ForegroundColor Yellow
$excludeItems = @("node_modules", ".git", ".next", "deploy-cloudways.ps1", "deploy.bat", "*.log")

# Create a temporary directory for clean files
$tempDir = ".\temp-deploy"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files excluding unwanted items
Get-ChildItem -Path "." | Where-Object { 
    $item = $_
    -not ($excludeItems | Where-Object { $item.Name -like $_ })
} | Copy-Item -Destination $tempDir -Recurse

# Create tar.gz archive
Write-Host "Compressing files..." -ForegroundColor Yellow
Set-Location $tempDir
tar -czf "../max-tv-pro-deploy.tar.gz" *
Set-Location ..

# Upload using WinSCP or similar
Write-Host "Files ready for upload in: max-tv-pro-deploy.tar.gz" -ForegroundColor Green
Write-Host ""
Write-Host "Manual deployment steps:" -ForegroundColor Cyan
Write-Host "1. Upload max-tv-pro-deploy.tar.gz to your server" -ForegroundColor White
Write-Host "2. SSH to server: ssh $username@$server" -ForegroundColor White
Write-Host "3. Extract: cd $remotePath && tar -xzf ../max-tv-pro-deploy.tar.gz" -ForegroundColor White
Write-Host "4. Install: npm install" -ForegroundColor White
Write-Host "5. Build: npm run build" -ForegroundColor White
Write-Host "6. Start: pm2 start npm --name 'max-tv-pro' -- start" -ForegroundColor White

# Cleanup
Remove-Item $tempDir -Recurse -Force

Write-Host ""
Write-Host "Deployment package created successfully!" -ForegroundColor Green
