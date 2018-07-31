# OUCHI MESSENGER

[![Build Status](https://travis-ci.org/kamataryo/ouchiMessenger.svg?branch=master)](https://travis-ci.org/kamataryo/ouchiMessenger)

Family task management application.

![Task List](./raw/screenshots/01_task-list.png)

![Add task](./raw/screenshots/02_add-task.png)

## Architecture

```
[iOS Application] <-(1)-> [Amazon DynamoDB] <-(2)- [AWS Lambda]
        ^
        |
       (3)
        |
        v
   [Amazon SNS]
```

(1): Database access to save tasks.
(2): Batch process to recycle daily tasks.
(3): iOS App triggers push notification and receives.

## Build and Deploy

### IAM

- create User with policy about SNS and DynamoDB Access.

### SNS setting

- create Platform Application
- Note ARN

### Database setting

1.  Set up 2 DynamoDB tables

- `Task`: a table with key named `taskId`
- `User`: a table with key named `deviceToken`

2.  Create IAM user is authorized with read/write permission for the table.
3.  Note the table names, the access key id and the secret access key.

### batch setting

The batch reset task done/undone state.

1.  Create a lambda role with DynamoDB access.
2.  Create a lambda function with `/server/index.js` with environmental variables, `TASK_TABLE_NAME` and `REGION`.
3.  Set CloudWatch Events cron trigger for batch.

### app build (iOS only so far)

1.  `$ cp .env.sample.js .env.js`
2.  Edit the AWS credential with information above.
3.  Build and deploy from xcode.
