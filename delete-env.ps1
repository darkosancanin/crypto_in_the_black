param ( [string]$envPrefix = "dev-" )

Write-Host "Starting to delete environment"

Write-Host "Environment prefix: '$envPrefix'"

$S3Bucket = "s3://$($envPrefix)www.cryptointheblack.com/"
Write-Host "S3 Bucket: '$S3Bucket'"

$stackName = "$envPrefix-cryptointheblack";
Write-Host "Stack Name: '$stackName'"

Write-Host "Starting to delete content from S3 bucket"
aws s3 rm $S3Bucket --recursive
Write-Host "Completed delete of all content from S3 bucket"

Write-Host "Starting to delete stack"
aws cloudformation delete-stack --stack-name $stackName
Write-Host "Delete stack completed"

Write-Host "Delete environment completed"