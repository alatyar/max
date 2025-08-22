@echo off
echo Deploying MAX TV PRO to Cloudways...

REM Create deployment package
echo Creating deployment package...
tar -czf max-tv-pro.tar.gz --exclude=node_modules --exclude=.git --exclude=.next *

REM Upload via SCP with password
echo Uploading files...
pscp -pw eXtr@1122 max-tv-pro.tar.gz extramaxpro@209.38.216.128:~/

REM Connect and setup
echo Connecting to server...
plink -pw eXtr@1122 extramaxpro@209.38.216.128 "cd ~ && tar -xzf max-tv-pro.tar.gz -C public_html/ && cd public_html && npm install && npm run build"

echo Deployment completed!
pause
