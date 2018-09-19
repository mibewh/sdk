# Sample HTTP Deployment Receiver for Cloud CMS

Cloud CMS lets you deploy content from a branch to a variety of targets including content branches, FTP servers, Amazon S3, other Cloud CMS installations and even your own HTTP endpoints.

This Git repository provides a sample implementation of a custom HTTP deployment receiver.  It uses the `cloudcms-http-deployment-receiver` node module under the hood.

The `cloudcms-http-deployment-receiver` node module provides most of the heavy lifting in terms of handing deployments.  It handles listening for HTTP multipart POST calls and also handles all of the processing of deployment packages.

This sample plugs in custom `entry` and `execute` methods to provide custom processing of deployed content.

For more information, please see:
[https://github.com/gitana/cloudcms-http-deployment-receiver](https://github.com/gitana/cloudcms-http-deployment-receiver)