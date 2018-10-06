# ZHAW Issue Tracker Server(less)

This is the issue tracker server implementation for the ZHAW web3 module written in Node.js as a serverless application for AWS Lambda

## Prerequisites

1) Node.js (8.10 or higher)
2) Amazon Web Services (AWS) Account

## Local development
For the local development of this application please run the following command:
```
node app.local.js
```
This will start a local server on port 3000. You have to start the application in this way, because the file `app.js` just exports the app module (required to use AWS Lambda) and does not execute `app.listen` to actually start the server and listen for incoming requests.

## Deployment to AWS Lambda
For ease of deploying to AWS Lambda this project uses [claudia.js](https://claudiajs.com/tutorials/installing.html).

You can find more information on `claudia.js` here: https://claudiajs.com/

To deploy a new lambda function to `eu-west-1 execute the following command:
````
claudia create --handler lambda.handler --deploy-proxy-api --policies policy --region eu-west-1
````
**HINT**: Before you can create a new function make sure you delete the file `claudia.json` in the projects directory. Also make sure to delete all previous IAM roles that were automatically created by claudia.js.

To update an existing function in the region `eu-west-1` execute the following command:
````
claudia update --handler lambda.handler --deploy-proxy-api --policies policy --region eu-west-1
````

If you do not need your lambda function anymore, you can delete it by executing the following command:
````
claudia destroy
````

**HINT**: If you have troubles deleting your function it is because you have added a path mapping in your AWS API Gateway. You have to remove all mappings first before you can delete the function.

#### Permissions
If you want to access other services from AWS such as S3 or DynamoDB you have to add permissions to the lambda execution role by adding or adjusting policy files inside the `policy` folder.
 
#### AWS Region Table
| Region Code   | Name              |
| ------------- |-------------------|
| eu-central-1  | EU (Frankfurt)    |
| eu-west-1     | EU (Ireland)      |
| eu-west-2     | EU (London)       |
| eu-west-3     | EU (Paris)        |
| ...           | ...               |

## Useful Resources

#### Tutorial:

https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35
https://claudiajs.com/tutorials/lambda-api-dynamo-db.html

#### Setting up Claudia.js and AWS:

https://claudiajs.com/tutorials/installing.html