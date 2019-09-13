param (
    [string]$env = "dev"
 )

sam build -s ./server/CryptoInTheBlack/
Push-Location ".aws-sam/build"
sam package --template-file template.yaml --s3-bucket cryptointheblack --output-template-file packaged.yml
sam deploy --template-file packaged.yml --stack-name $env-cryptointheblack --capabilities CAPABILITY_IAM --parameter-overrides EnvironmentPrefix=$env
Pop-Location