# AWS SSM Send-Command

This action execute AWS SSM Send-Command by using SSM document AWS-RunShellScript.

## Requirements

1. AWS IAM
2. aws-actions/configure-aws-credentials@v1

```
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ap-northeast-2
```

Before using this actions, you have to set **AWS IAM** and **Github Actions for AWS Authentication**.

## Inputs

### `instance-ids`

**Required** The id of AWS EC2 instance id (e.g i-xxx...)

### `commands`

**Required** Bash command you want to execute in a EC2 Computer.

### `working-directory`

Where bash command executes.

### `comment`

Currently yout cannot customized. (Coming soon.)

default: `Github Actions`

## Full Example Usage

```yml
name: AWS Run Command Example

on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2

      - name: AWS SSM Send-Command
        uses: peterkimzz/aws-ssm-send-command
        with:
          instance_id: ${{ secrets.INSTANCE_ID }}
          commands: ls -al
          working_directory: /home/ubuntu
```
