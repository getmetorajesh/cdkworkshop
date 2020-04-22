import { IAspect, IConstruct, Tokenization } from "@aws-cdk/core";
import * as s3 from '@aws-cdk/aws-s3'
import { CfnBucket } from "@aws-cdk/aws-s3";

export default class BucketPrefixChecker implements IAspect {
  public visit(el: IConstruct): void {
    if (el instanceof s3.CfnBucket) {
      if (!el.bucketName
        || (!Tokenization.isResolvable(el.bucketName)
            && !el.bucketName.startsWith('myprefix'))) {

        el.node.addError('na nana ! Bucket must be prefixed with "myprefix"');
      }
    }
  }
}
