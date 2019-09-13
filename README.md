## CryptoInTheBlack.com - AWS Serverless Application Project

Simple one page app created to play around with the following technologies: React and AWS serverless (Lambda, S3, API Gateway, SAM templates).

Made up of the following projects:

#### /client/

Simple one page React app which uses create-react-app (https://github.com/facebook/create-react-app).

**build & deploy**

```
# start the development server
npm run start

# build the production build:
npm run build

# deploy AWS cloudformation stack (change stackname as required):
aws cloudformation deploy --template template.yml --stack-name dev-www-cryptointheblack

# copy files to S3 bucket
aws s3 cp build/ s3://www.cryptointheblack.com --recursive
```

**delete**

```
# delete all files from S3 Bucket
aws s3 rm s3://dev-www.cryptointheblack.com --recursive

# delete stack (change stackname as required)
aws cloudformation delete-stack --stack-name dev-www-cryptointheblack
```

* * *

#### /server/CryptoInTheBlack/

.NET Core project with the AWS Lambda functions.

**build & deploy**

```
# build the project (using SAM)
# note: artifacts are saved to '.aws-sam\build'
sam build

# change directory to the build directory
cd .aws-sam\build

# package SAM template
sam package --template-file template.yaml --s3-bucket cryptointheblack --output-template-file packaged.yml

# deploy packaged SAM template (change stackname as required):
sam deploy --template-file packaged.yml --stack-name staging-cryptointheblack --capabilities CAPABILITY_IAM --parameter-overrides EnvironmentPrefix=staging
```

**delete**

```
# delete stack (change stackname as required)
aws cloudformation delete-stack --stack-name dev-api-cryptointheblack
```

* * *

#### /server/CryptoInTheBlack.IntegrationTests/

Integration tests for the /CryptoInTheBlack/ project.

```
#run tests
dotnet test
```

* * *


#### /server/CryptoInTheBlack.Tests/

Unit tests for the /CryptoInTheBlack/ project.

```
#run tests
dotnet test
```

* * *


#### /server/CryptoInTheBlack.Cli/

Console app created to run some periodic offline processes, currently used to generate the sitemap.xml file and also dynamically creates the CoinData file which stores basic information for each coin so users can search without having to hit the CoinGecko api for every call.

```
# generate sitemap (change output location as required)
dotnet run sitemap -o C:\location\of\sitemap.xml

# generate CoinData file (change output location as required)
dotnet run coindata -o C:\location\of\CoinData.cs
```