## CryptoInTheBlack.com - AWS Serverless Application Project

Simple one page app created to play around with the following technologies: React and AWS serverless (Lambda, S3, API Gateway, SAM templates).

Made up of the following projects:

#### /client/

Simple one page React app which uses create-react-app (https://github.com/facebook/create-react-app).

To start the development server:
```
npm run start
```

To build the production build:
```
npm run build
```

Build artifacts : /build

* * *

#### /server/CryptoInTheBlack/

.NET Core project with the AWS Lambda functions.

To build the project: 

```
sam build
```

Built artifacts  : .aws-sam\build
Built template   : .aws-sam\build\template.yaml

Change directory to the build directory:
```
cd .aws-sam\build
```

Package SAM template
```
sam package --template-file template.yaml --s3-bucket cryptointheblack --output-template-file packaged.yml
```

Deploy packaged SAM template:
```
sam deploy --template-file packaged.yml --stack-name dev-cryptointheblack --capabilities CAPABILITY_IAM
```

Delete stack
```
aws cloudformation delete-stack --stack-name dev-cryptointheblack
```

* * *

#### /server/CryptoInTheBlack.IntegrationTests/

Integration tests for the /CryptoInTheBlack/ project.

Run tests:
```
dotnet test
```

* * *


#### /server/CryptoInTheBlack.Tests/

Unit tests for the /CryptoInTheBlack/ project.

Run tests:
```
dotnet test
```

* * *


#### /server/CryptoInTheBlack.Cli/

Console app created to run some periodic offline processes, currently used to generate the sitemap.xml file and also dynamically creates the CoinData file which stores basic information for each coin so users can search without having to hit the CoinGecko api for every call.

Generate sitemap:
```
dotnet run sitemap -o C:\location\of\sitemap.xml
```

Generate CoinData file:
```
dotnet run coindata -o C:\location\of\CoinData.cs
```