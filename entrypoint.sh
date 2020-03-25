#!/bin/sh

echo "Instance Id $1"
echo "Run-Command $2"
echo "Document-Name $3"
echo "Comment $4"
echo "Working Directory $5"

time=$(date)
instance-id=$1
commands=$2
document-name=$3

# Run AWS CLI
aws ssm send-command \
  --instance-ids ${instance-id} \
  --document-name "AWS-RunShellScript" \
  --comment "Blue/Green Deployment" \
  --parameters \
    '{"workingDirectory": ["/home/ubuntu/api_production"], "commands":["/bin/sh deploy.sh"]}'

# End
exit 0;