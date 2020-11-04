"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const core = __importStar(require("@actions/core"));
try {
    const inputs = SanitizeInputs();
    // AWS Configure
    aws_sdk_1.default.config.update({
        accessKeyId: inputs.accessKeyId,
        secretAccessKey: inputs.secretAccessKey,
        region: inputs.region,
    });
    // Run Send Command
    const ssm = new aws_sdk_1.default.SSM();
    ssm.sendCommand();
    ssm.sendCommand({
        InstanceIds: inputs.instanceIds,
        DocumentName: inputs.documentName,
        Comment: inputs.comment,
        Parameters: {
            workingDirectory: [inputs.workingDirectory],
            commands: [inputs.command],
        },
    }, (err, data) => {
        var _a;
        if (err)
            throw err;
        console.log(data);
        core.setOutput("command-id", (_a = data.Command) === null || _a === void 0 ? void 0 : _a.CommandId);
    });
}
catch (err) {
    console.error(err, err.stack);
    core.setFailed(err);
}
function SanitizeInputs() {
    // AWS
    const _accessKeyId = core.getInput("aws-access-key-id", { required: true });
    const _secretAccessKey = core.getInput("aws-secret-access-key", {
        required: true,
    });
    const _region = core.getInput("aws-region", { required: true });
    // SSM Send Command
    const _instanceIds = core.getInput("instance-ids", { required: true });
    const _command = core.getInput("command");
    const _workingDirectory = core.getInput("working-directory");
    const _comment = core.getInput("comment");
    // customized not supported yet, will be updated soon.
    const _documentName = "AWS-RunShellScript";
    const _outputS3BucketName = "your-s3-bucket-name";
    const _outputS3KeyPrefix = "your-s3-bucket-directory-name";
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
