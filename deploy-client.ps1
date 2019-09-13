param (
    [string]$env = "dev"
 )

$S3Bucket = "s3://$($env)www.cryptointheblack.com/"
Write-Host "Environment: $env"
Push-Location "client"
npm run build
Pop-Location
aws s3 cp client/build/ $S3Bucket --recursive
Write-Host "Finished uploading client code to S3 bucket: $S3Bucket"