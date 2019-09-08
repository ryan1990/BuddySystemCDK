#!/usr/bin/env node
import 'source-map-support/register';

import codebuild = require('@aws-cdk/aws-codebuild');
import codepipeline = require('@aws-cdk/aws-codepipeline');
import codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');
import cdk = require('@aws-cdk/core');
import cicd = require('@aws-cdk/app-delivery');
import codecommit = require('@aws-cdk/aws-codecommit');

import { InfrastructureStack } from '../lib/infrastructure_stack';
import { LambdaStack } from '../lib/lambda_stack';
import { PipelineStack } from '../lib/pipeline_stack';

const app = new cdk.App();
const lambdaStack = new LambdaStack(app, 'LambdaStack');
const pipelineStack = new PipelineStack(app, 'PipelineStack', {
  lambdaCode: lambdaStack.lambdaCode,
});

// // This defines a stack that contains the CodePipeline
// const pipelineStack = new cdk.Stack(app, 'PipelineStack');

// const pipeline = new codepipeline.Pipeline(pipelineStack, 'CodePipeline', {
//     // This CDK is for the pipeline that deploys itself, so when updated, make
//     // sure latest update is still pushed through
//     restartExecutionOnUpdate: true
// });

// const repo = new codecommit.Repository(pipelineStack, 'Repo', {
//      repositoryName: 'BuddySystemCDK'
// });

// // Configure CodePipeline source - where your CDK App's source code is hosted
// const sourceOutput = new codepipeline.Artifact();
// const source = new codepipeline_actions.CodeCommitSourceAction({
//     actionName: 'CodeCommit',
//     repository: repo,
//     output: sourceOutput,
// });
// pipeline.addStage({
//     stageName: 'source',
//     actions: [source],
// });

// const project = new codebuild.PipelineProject(pipelineStack, 'CodeBuild', {
//     environment: {
// 	buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0,
//     },
// });

// // const cdkProject = new codebuild.PipelineProject(this, 'CdkBuild', {
// //       buildSpec: codebuild.BuildSpec.fromObject({
// //         version: '0.2',
// //         phases: {
// //           install: {
// //             commands: 'npm install',
// //           },
// //           build: {
// //             commands: [
// //               'npm run build',
// //               'npm run cdk synth -- -o dist'
// //             ],
// //           },
// //         },
// //         artifacts: {
// //           'base-directory': 'dist',
// //           files: [
// //             'LambdaStack.template.json',
// //           ],
// //         },
// //       }),
// //       environment: {
// //           buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0,
// //       },
// // });
// // const cdkLambdaBuildOutput = new codepipeline.Artifact('LambdaCDKBuildOutput');

// const lambdaProject = new codebuild.PipelineProject(pipelineStack, 'LambdaBuild', {
//     buildSpec: codebuild.BuildSpec.fromObject({
//         version: '0.2',
//         phases: {
//             install: {
// 		commands: [
// 		    'cd lambda',
// 		    'npm install',
// 		],
//             },
//             build: {
// 		commands: 'npm run build',
//             },
//         },
//         artifacts: {
//             'base-directory': 'lambda',
//             files: [
// 		'index.js',
// 		'node_modules/**/*',
//             ],
//         },
//     }),
//     environment: {
//         buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0,
//     },
// });
// const lambdaBuildOutput = new codepipeline.Artifact('LambdaBuildOutput');
// const lambdaBuildAction = new codepipeline_actions.CodeBuildAction({
//     actionName: 'LambdaBuild',
//     project: lambdaProject,
//     input: sourceOutput,
//     outputs: [lambdaBuildOutput],
// });

// const synthesizedApp = new codepipeline.Artifact();
// const buildAction = new codepipeline_actions.CodeBuildAction({
//     actionName: 'CodeBuild',
//     project,
//     input: sourceOutput,
//     outputs: [synthesizedApp],
// });


// pipeline.addStage({
//     stageName: 'build',
//     actions: [
// 	buildAction,
// 	lambdaBuildAction
//     ],
// });

// // Optionally, self-update the pipeline stack
// const selfUpdateStage = pipeline.addStage({ stageName: 'SelfUpdate' });
// selfUpdateStage.addAction(new cicd.PipelineDeployStackAction({
//   stack: pipelineStack,
//   input: synthesizedApp,
//   adminPermissions: true,
// }));


// const infrastructureStack = new InfrastructureStack(app, 'InfrastructureStack');


// const deployInfrastructureAction = new cicd.PipelineDeployStackAction({
//     stack: infrastructureStack,
//     input: synthesizedApp,
//     // See the note below for details about this option.
//     adminPermissions: true,
// });

// const deployLambdaAction = new codepipeline_actions.CloudFormationCreateUpdateStackAction({
//     actionName: 'Lambda_CFN_Deploy',
//     templatePath: synthesizedApp.atPath('LambdaStack.template.yaml'),
//     stackName: 'LambdaDeploymentStack',
//     adminPermissions: true,
//     parameterOverrides: {
// 	...props.lambdaCode.assign(lambdaBuildOutput.s3Location),
//     },
//     extraInputs: [lambdaBuildOutput]
// });

// const deployStage = pipeline.addStage({
//     stageName: 'DeployInfra',
//     actions: [
// 	deployInfrastructureAction,
// 	deployLambdaAction
//     ]
// });


// // // App-delivery has hard-coded names that can't be shared between actions per stage
// // const deployStage2 = pipeline.addStage({
// //     stageName: 'DeployLambda',
// //     actions: [
// // 	deployLambdaAction]
// // });
