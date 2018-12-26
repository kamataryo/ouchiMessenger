# monorepo

prefix: `@ouch-messenger`

## client apps

| package name         | Frameworks            | desciption                |
| -------------------- | --------------------- | ------------------------- |
| mobile               | React Native          | Application view          |
| pwa                  | React                 | Browser application view. |
| backend-for-frontend | Redux and React Redux | Provide global store.     |

## User identification and Authentication

| package name   | backend service | description                                    |
| :------------- | :-------------- | :--------------------------------------------- |
| amazon-cognito | Amazon Cognito  | Provide user identification and authentication |

## API

| package name       | backend service | description       |
| :----------------- | :-------------- | :---------------- |
| amazon-api-gateway | Amazon Cognito  | Handle api access |

## api backends

| package name               | method | endpoint          | backend service       | description                           |
| :------------------------- | :----- | :---------------- | :-------------------- | :------------------------------------ |
| aws-lambda-post-endpoint   | POST   | /endpoint         | Amazon SNS            | update SNS endpoint                   |
| aws-lambda-delete-endpoint | DELETE | /endpoint         | Amazon SNS            | delete SNS endpoint                   |
| aws-lambda-get-tasks       | GET    | /tasks            | Amazon DynamoDB       | scan all tasks                        |
| aws-lambda-recycle-tasks   | PUT    | /tasks?batch=true | Amazon DynamoDB       | Recycle tasks                         |
| aws-lambda-put-task        | PUT    | /task             | Amazon SNS / DynamoDB | Update a task. if done, broadcast it  |
| aws-lambda-delete-task     | DELETE | /task             | Amazon DynamoDB       | Delete a task                         |
| aws-lambda-fav             | POST   | /fav              | Amazon SNS            | Fav one's task completion performance |

## database

| package name    | backend service | description |
| :-------------- | :-------------- | :---------- |
| amazon-dynamodb | Amazon DynamoDB | Store data  |

## Push delivery

| package name           | backend service | description         |
| :--------------------- | :-------------- | :------------------ |
| amazon-sns-production  | Amazon SNS      | Delivery push       |
| amazon-sns-development | Amazon SNS      | Delivery push (dev) |

# AWS Deployment permission requirement

- Node v10 (local)
- permission for the lambda:CreateFunction
