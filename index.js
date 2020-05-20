const AWS = require('aws-sdk')
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const inputs = SanitizeInputs()

  // AWS Configure
  const awsConfigureParams = {
    accessKeyId: inputs.accessKeyId,
    secretAccessKey: inputs.secretAccessKey,
    region: inputs.region
  }
  AWS.config.update(awsConfigureParams)

  // Run Send Command
  const ssm = new AWS.SSM()
  const params = {
    InstanceIds: inputs.instanceIds,
    DocumentName: inputs.documentName,
    Comment: inputs.comment,
    Parameters: {
      workingDirectory: [inputs.workingDirectory],
      commands: [inputs.command]
    }
  }
  ssm.sendCommand(params, (err, data) => {
    if (err) throw err

    console.log(data)

    const { CommandId } = data.Command
    core.setOutput('command-id', CommandId)
  })
} catch (err) {
  console.error(err, err.stack)
  core.setFailed(err)
}

function SanitizeInputs() {
  // AWS
  const _accessKeyId = core.getInput('aws-access-key-id', { required: true })
  const _secretAccessKey = core.getInput('aws-secret-access-key', { required: true })
  const _region = core.getInput('aws-region', { required: true })

  // SSM Send Command
  const _instanceIds = core.getInput('instance-ids', { required: true })
  const _command = core.getInput('command')
  const _workingDirectory = core.getInput('working-directory')
  const _comment = core.getInput('comment')

  // customized not supported yet, will be updated soon.
  const _documentName = 'AWS-RunShellScript'
  const _outputS3BucketName = 'your-s3-bucket-name'
  const _outputS3KeyPrefix = 'your-s3-bucket-directory-name'

  const outputs = {
    accessKeyId: _accessKeyId,
    secretAccessKey: _secretAccessKey,
    region: _region,
    instanceIds: _instanceIds.split(/\n/),
    command: _command,
    documentName: _documentName,
    workingDirectory: _workingDirectory,
    comment: _comment,
  }
  return outputs
}