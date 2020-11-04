"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var core_1 = __importDefault(require("@actions/core"));
try {
    var inputs = SanitizeInputs();
    // AWS Configure
    aws_sdk_1.default.config.update({
        accessKeyId: inputs.accessKeyId,
        secretAccessKey: inputs.secretAccessKey,
        region: inputs.region,
    });
    // Run Send Command
    var ssm = new aws_sdk_1.default.SSM();
    ssm.sendCommand();
    ssm.sendCommand({
        InstanceIds: inputs.instanceIds,
        DocumentName: inputs.documentName,
        Comment: inputs.comment,
        Parameters: {
            workingDirectory: [inputs.workingDirectory],
            commands: [inputs.command],
        },
    }, function (err, data) {
        var _a;
        if (err)
            throw err;
        console.log(data);
        core_1.default.setOutput("command-id", (_a = data.Command) === null || _a === void 0 ? void 0 : _a.CommandId);
    });
}
catch (err) {
    console.error(err, err.stack);
    core_1.default.setFailed(err);
}
function SanitizeInputs() {
    // AWS
    var _accessKeyId = core_1.default.getInput("aws-access-key-id", { required: true });
    var _secretAccessKey = core_1.default.getInput("aws-secret-access-key", {
        required: true,
    });
    var _region = core_1.default.getInput("aws-region", { required: true });
    // SSM Send Command
    var _instanceIds = core_1.default.getInput("instance-ids", { required: true });
    var _command = core_1.default.getInput("command");
    var _workingDirectory = core_1.default.getInput("working-directory");
    var _comment = core_1.default.getInput("comment");
    // customized not supported yet, will be updated soon.
    var _documentName = "AWS-RunShellScript";
    var _outputS3BucketName = "your-s3-bucket-name";
    var _outputS3KeyPrefix = "your-s3-bucket-directory-name";
    return {
        accessKeyId: _accessKeyId,
        secretAccessKey: _secretAccessKey,
        region: _region,
        instanceIds: _instanceIds.split(/\n/),
        command: _command,
        documentName: _documentName,
        workingDirectory: _workingDirectory,
        comment: _comment,
    };
}
