param ( [string]$envPrefix = "dev-" )

Write-Host "Starting client deployment to S3"

Write-Host "Environment prefix: '$envPrefix'"

$S3Bucket = "s3://$($envPrefix)www.cryptointheblack.com/"
Write-Host "S3 Bucket: '$S3Bucket'"

Write-Host "Setting 'REACT_APP_ENV_PREFIX' environment variable"
$env:REACT_APP_ENV_PREFIX=$envPrefix

Write-Host "Changing to /client/ directory"
Push-Location "client"

Write-Host "Starting npm build"
npm run build
Write-Host "Npm build completed"

Write-Host "Changing back to original directory"
Pop-Location

Write-Host "Starting upload to S3 bucket"
aws s3 cp client/build/ $S3Bucket --recursive
Write-Host "Upload to S3 bucket completed"

Write-Host "Client deployment to S3 completed"
