import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3n from '@aws-cdk/aws-s3-notifications'
import * as iam from '@aws-cdk/aws-iam'
import { ServicePrincipal, Effect } from '@aws-cdk/aws-iam';
export class CdkworkshopStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Input = new s3.Bucket(this, 'MyFirstBucket', {
      bucketName: 'ko-soh-input'
    });

    const s3Ouput = new s3.Bucket(this, 'MyFirstBucket2', {
      bucketName: 'ko-soh-output2'
    });

    // God Mode ON
    const statement1 = new iam.PolicyStatement( { effect: Effect.ALLOW });
    statement1.addActions('lambda:*')
    statement1.addAllResources()

    const invokePolicyDocument = new iam.PolicyDocument()
    invokePolicyDocument.addStatements(statement1)

    const role = new iam.Role(this, id+'LambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        'invoke': invokePolicyDocument
      },
      roleName: id+'LambdaRole',
    });

    const processor = new lambda.Function(this, "InputReader", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("./lambda"),
      handler: 'index.handler',
      environment: {
        'outputBucket': s3Ouput.bucketName
      },
      role: role
    })

    const triggerDest = new s3n.LambdaDestination(processor)

    s3Input.addEventNotification(s3.EventType.OBJECT_CREATED,
      triggerDest)
    // The code that defines your stack goes here
  }
}
