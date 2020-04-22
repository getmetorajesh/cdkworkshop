#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkworkshopStack } from '../lib/cdkworkshop-stack';

const app = new cdk.App();
new CdkworkshopStack(app, 'CdkworkshopStack');
