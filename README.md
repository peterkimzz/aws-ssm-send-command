# AWS SSM Send-Command

This action execute AWS SSM Send-Command by using SSM document AWS-RunShellScript.

## Requirements

1. AWS IAM
2. aws-actions/configure-aws-credentials@v1

- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  aws-region: ap-northeast-2

Before using this actions, you have to set **AWS IAM** and **Github Actions for AWS Authentication**.

## Inputs

### `instance-ids`

**Required** The name of the person to greet. Default `"World"`.

### `commands`

**Required** Bash command you want to execute in a EC2 Computer.

### `comment`

for comment.

### `working-directory`

Where bash command executes.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yml
uses: peterkimzz/aws-ssm-send-command
with:
  instance-ids: i-xxxxxxxx
  commands: ls -al
  comment: Print files
  working-directory: /home/ubuntu
```
