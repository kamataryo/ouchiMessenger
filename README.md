# OUCHI MESSENGER

[![Build Status](https://travis-ci.org/kamataryo/ouchiMessenger.svg?branch=master)](https://travis-ci.org/kamataryo/ouchiMessenger)

Family task management application.

![Task List](./raw/screenshots/01_task-list.png)

![Add task](./raw/screenshots/02_add-task.png)

## Database setting

1.  Set up a DynamoDB table with key named `taskId`.
2.  Create IAM user is authorized with read/write permission for the table.
3.  Note the table name, the access key id and the secret access key.

## Build and Deploy

1.  `$ cp .env.sample.js .env.js`
2.  Edit the AWS credential with information above.
3.  Build and deploy from xcode.
