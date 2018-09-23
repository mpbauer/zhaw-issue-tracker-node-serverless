# ZHAW Issue Tracker Server(less)

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

To deploy a new lambda function to EU (Ireland) execute the following command:
````
claudia create --handler lambda.handler --deploy-proxy-api --region eu-west-1
````

To update an existing function on EU (Ireland) execute the following command:
````
claudia update --handler lambda.handler --deploy-proxy-api --region eu-west-1
````

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

#### Setting up Claudia.js and AWS:

https://claudiajs.com/tutorials/installing.html