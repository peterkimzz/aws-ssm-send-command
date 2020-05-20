# AWS SSM Send-Command

This action helps you to execute remote bash command for AWS EC2 instance **without SSH or other accessing**. 

(This action internally uses AWS SSM Send-Command.)


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
        uses: peterkimzz/aws-ssm-send-command@1.0.1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-west-1
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
Bash command you want to execute in a EC2 Computer.

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

``` bash
# example
6cf26b6f-b68f-4e20-b801-f6ee5318d000
```