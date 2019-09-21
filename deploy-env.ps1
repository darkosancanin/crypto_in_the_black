param ( [string]$envPrefix = "" )

Write-Host "Starting environment deployment"

Write-Host "Environment prefix: '$envPrefix'"

$stackName = "$($envPrefix)cryptointheblack";
Write-Host "Stack Name: '$stackName'"

Write-Host "Starting sam build"
sam build -s ./server/CryptoInTheBlack/

Write-Host "Changing to build directory"
Push-Location ".aws-sam/build"

Write-Host "Starting sam package"
sam package --template-file template.yaml --s3-bucket cryptointheblack --output-template-file packaged.yml

Write-Host "Starting sam deploy"
sam deploy --template-file packaged.yml --stack-name $stackName --capabilities CAPABILITY_IAM --parameter-overrides EnvPrefix=$envPrefix

Write-Host "Changing back to original directory"
Pop-Location

Write-Host "Environment deployment completed"