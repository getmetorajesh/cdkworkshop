#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkworkshopStack } from '../lib/cdkworkshop-stack';
import { Tag } from '@aws-cdk/core';
import BucketPrefixChecker from '../lib/s3-aspect';

const app = new cdk.App();
const stack1 = new CdkworkshopStack(app, 'CdkworkshopStack');
// new CdkworkshopStack(app, 'CdkworkshopStack2');
stack1.node.applyAspect(new BucketPrefixChecker())
Tag.add(stack1, "Billing", "cc")

