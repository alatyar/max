@echo off
echo Fixing Cloudways deployment...

REM Check server connection
echo Testing server connection...
ping -n 1 209.38.216.128

REM Create a simple index.html for testing
echo Creating test file...
echo ^<html^>^<body^>^<h1^>MAX TV PRO - Test Page^</h1^>^<p^>Server is working!^</p^>^</body^>^</html^> > test.html

REM Upload test file using WinSCP (if available) or manual instructions
echo.
echo Manual steps to fix the issue:
echo.
echo 1. Connect to server via SSH or file manager
echo 2. Go to public_html directory
echo 3. Check if files are uploaded correctly
echo 4. For Next.js app, you need to:
echo    - Install Node.js dependencies: npm install
echo    - Build the app: npm run build
echo    - Start with PM2: pm2 start npm --name max-tv-pro -- start
echo    - Configure Nginx to proxy port 3000
echo.
echo 5. For static hosting, upload the built files from .next/static
echo.
echo Cloudways typically uses Apache/Nginx on port 80
echo Next.js runs on port 3000 and needs reverse proxy setup
echo.
pause
