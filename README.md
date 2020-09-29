# AWS SSM Send-Command

This action helps you to execute remote bash command for AWS EC2 instance **without SSH or other accessing**.

(This action internally uses AWS SSM Send-Command.)

## Contents

- [Requirements](#Requirements)
- [Usage example](#Usage-example)
- [Inputs](#Inputs)
- [Outputs](#Outputs)
- [Error Handling](#Error-Handling)

## Requirements

1. To use this action, you have to set AWS IAM Role `AmazonSSMFullAccess` to your IAM user.
2. Also your EC2 Instance must have IAM Role including `AmazonSSMFullAccess`.

## Usage example

```yml
name: AWS SSM Send-Command Example

on:
  push:
    branches: [master]

jobs:
  start:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: AWS SSM Send-Command
        uses: peterkimzz/aws-ssm-send-command@master
        id: ssm
        with:
          aws-region: ${{ secrets.AWS_REGION }}
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          instance-ids: ${{ secrets.INSTANCE_ID }}

          working-directory: /home/ubuntu/application
          command: ls -al
          comment: Hello world!

      # Catch SSM outputs
      - name: Get the outputs
        run: echo "The Command id is ${{ steps.ssm.outputs.command-id }}"
```

## Inputs

### `aws-access-key-id`

**Required** Your IAM access key id.

### `aws-secret-access-key`

**Required** Your IAM secret access key id.

### `aws-region`

**Required** AWS EC2 Instance region. (e.g. us-west-1, us-northeast-1, ...)

### `instance-ids`

**Required** The id of AWS EC2 instance id (e.g i-xxx...)

```yml
# single instance
instance-ids: i-0b1f8b18a1d450000

# multiple instances (maxium 50 values)
instance-ids: |
  i-0b1f8b18a1d450000
  i-0b1f8b18a1d450001
  i-0b1f8b18a1d450002
```

### `command`

Bash command you want to execute in a EC2 instance.

```yml
# default
command: echo $(date) >> logs.txt

# restart your pm2 service
command: pm2 restart 0

# or execute shell script
command: /bin/sh restart.sh
```

### `working-directory`

Where bash command executes.

```yml
# default
working-directory: /home/ubuntu
```

### `comment`

Logging message attached AWS SSM.

```yml
# default
comment: Executed by Github Actions
```

## Outputs

### command-id

AWS SSM Run-Command id. (uuid type)

```bash
# example
6cf26b6f-b68f-4e20-b801-f6ee5318d000
```

## Error Handling

### AccessDeniedException

This error occurs when you are not set AWS IAM role about SSM. Please set the IAM permission `AmazonSSMFullAccess` (recommended)

### InvalidInstanceId: null

This error occurs when you are not attach AWS IAM role to your EC2 instance. Please set the IAM role `AmazonSSMFullAccess` (recommended)

> In almost error cases, those issues would be resolved when you set IAM Role to your `AWS Account` and `EC2 IAM Role`.
