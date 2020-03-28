#!/bin/bash

# 이 커맨드 아래 명령어 중 에러가 발생하면 즉시 스크립트 실행을 중단시킴
set -e

function main() {
  sanitize "${INPUT_INSTANCE_IDS}" "instance-ids"
  sanitize "${INPUT_COMMANDS}" "commands"

  init
  send_command
}

function sanitize() {
  if [ -z "${1}" ]; then
    >&2 echo "${2} is required. Did you set parameter ${2}?"
    exit 1
  fi
}

function init() {
  export INSTANCE_IDS=$INPUT_INSTANCE_IDS
  export COMMANDS=$INPUT_COMMANDS
  export DOCUMENT_NAME=$INPUT_DOCUMENT_NAME

  export COMMENT=$INPUT_COMMENT
  export WORKING_DIRECTORY=$INPUT_WORKING_DIRECTORY
}

function send_command() {
  echo "== START SEND-COMMAND"

  # SEND_COMMAND_CMD=$("aws ssm send-command \
  #   --instance-ids ${INSTANCE_ID} \
  #   --document-name ${DOCUMENT_NAME} \
  #   --parameters '{\"workingDirectory\": [\"${WORKING_DIRECTORY}\"], \"commands\": [\"${COMMANDS}\"] }'")

  eval "aws ssm send-command \
    --instance-ids ${INSTANCE_IDS} \
    --document-name ${DOCUMENT_NAME} \
    --parameters '{\"workingDirectory\": [\"${WORKING_DIRECTORY}\"], \"commands\": [\"${COMMANDS}\"] }'"

  # echo $SEND_COMMAND_CMD
  # echo $SEND_COMMAND_CMD | jq '.Command'

  # read id key token <<< ${CREDENTIALS}
  #   export AWS_ACCESS_KEY_ID="${id}"
  #   export AWS_SECRET_ACCESS_KEY="${key}"
  #   export AWS_SESSION_TOKEN="${token}"

  echo "== FINISHED SEND_COMMAND"
}

main

# {
#     "Command": {
#         "MaxErrors": "0", 
#         "Parameters": {
#             "commands": [
#                 "ls -al"
#             ], 
#             "workingDirectory": [
#                 "/home/ubuntu"
#             ]
#         }, 
#         "DocumentName": "AWS-RunShellScript", 
#         "OutputS3BucketName": "", 
#         "OutputS3KeyPrefix": "", 
#         "StatusDetails": "Pending", 
#         "RequestedDateTime": 1585118047.63, 
#         "Status": "Pending", 
#         "TargetCount": 1, 
#         "NotificationConfig": {
#             "NotificationArn": "", 
#             "NotificationEvents": [], 
#             "NotificationType": ""
#         }, 
#         "InstanceIds": [
#             "i-0249c189eb933eeed"
#         ], 
#         "ErrorCount": 0, 
#         "MaxConcurrency": "50", 
#         "ServiceRole": "", 
#         "CloudWatchOutputConfig": {
#             "CloudWatchLogGroupName": "", 
#             "CloudWatchOutputEnabled": false
#         }, 
#         "DocumentVersion": "", 
#         "CompletedCount": 0, 
#         "Comment": "", 
#         "ExpiresAfter": 1585125247.63, 
#         "DeliveryTimedOutCount": 0, 
#         "CommandId": "94fe9021-d563-420d-9175-c90b393497d9", 
#         "Targets": []
#     }
# }