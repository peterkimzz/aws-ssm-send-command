const AWS = require("aws-sdk");
// const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const inputs = SanitizeInputs();

  // AWS Configure
  const awsConfigureParams = {
    accessKeyId: inputs.accessKeyId,
    secretAccessKey: inputs.secretAccessKey,
    region: inputs.region,
  };
  AWS.config.update(awsConfigureParams);

  // Run Send Command
  const ssm = new AWS.SSM();
  ssm.sendCommand(
    {
      InstanceIds: inputs.instanceIds,
      DocumentName: inputs.documentName,
      Comment: inputs.comment,
      Parameters: {
        workingDirectory: [inputs.workingDirectory],
        commands: [inputs.command],
      },
      CloudWatchOutputConfig: {
        CloudWatchLogGroupName: "ssm",
        CloudWatchOutputEnabled: true,
      },
    },
    (err, data) => {
      if (err) throw err;

      console.log(data);

      const { CommandId } = data.Command;
      // core.setOutput("command-id", CommandId);
    }
  );
} catch (err) {
  console.error(err, err.stack);
  // core.setFailed(err);
}

function SanitizeInputs() {
  // AWS
  // const _accessKeyId = core.getInput("aws-access-key-id", { required: true });
  // const _secretAccessKey = core.getInput("aws-secret-access-key", {
  //   required: true,
  // });
  // const _region = core.getInput("aws-region", { required: true });

  // // SSM Send Command
  // const _instanceIds = core.getInput("instance-ids", { required: true });
  // const _command = core.getInput("command");
  // const _workingDirectory = core.getInput("working-directory");
  // const _comment = core.getInput("comment");

  // // customized not supported yet, will be updated soon.
  // const _documentName = "AWS-RunShellScript";
  // const _outputS3BucketName = "your-s3-bucket-name";
  // const _outputS3KeyPrefix = "your-s3-bucket-directory-name";

  const outputs = {
    accessKeyId: "AKIA5BFI3MEM66C3Q3U4" || _accessKeyId,
    secretAccessKey:
      "gTKiSnTxxBt7Xk0ivl92gljVuYFeP9Z+uSAd5Im9" || _secretAccessKey,
    region: "ap-northeast-2" || _region,
    instanceIds: ["i-02731cf80174cdc79"] || _instanceIds.split(/\n/),
    command: "echo hello >> log.txt" || _command,
    documentName: `AWS-RunShellScript` || _documentName,
    workingDirectory: "/home/ubuntu/api_production" || _workingDirectory,
    comment: "test" || _comment,
  };
  return outputs;
}
