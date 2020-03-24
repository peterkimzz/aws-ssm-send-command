# AWS SSM Send-Command

This action execute AWS SSM Send-Command by using SSM document AWS-RunShellScript.

## Inputs

### `intance-id`

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
  instances-id: i-xxxxxxxx
  commands: ls -al
  comment: Print files
  working-directory: /home/ubuntu
```
