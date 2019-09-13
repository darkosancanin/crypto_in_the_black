param (
    [string]$env = "dev"
 )

 aws s3 rm s3://$($env)www.cryptointheblack.com --recursive
 
 aws cloudformation delete-stack --stack-name $env-cryptointheblack