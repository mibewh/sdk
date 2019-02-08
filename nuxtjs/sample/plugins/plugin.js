const Gitana = require("gitana");

export function getCloudCMSPlatform() {
    return new Promise(function(resolve, reject) {
        Gitana.connect({
            "clientKey": "e34de2c1-f4f7-43a6-93c4-efa23d105fea",
            "clientSecret": "IoLE0ldateSW2gdmOJO0bgiMEeBbMbkeCjSvhm98FbeUYyJwn1dLlzsNPVOwF+PgJ0WCvfF0JkO1yGwzTALu51vOHYHY48cehH3K/NOVOUI=",
            "username": "dac1fbfe-1265-4881-954b-782f296076c2",
            "password": "Oy/XF8OIBxH9QjfRYHC2G3ZTV9MSUvjA3yU+haVLBKhnzvaHeIHSMeiYh++y3mPr9PciFwaR+B6u0yWQTk/arKsxl+HlbuDl8Y7LmoaZ6us=",
            "baseURL": "http://localhost:8080",
            "application": "f72237d7737ec3e70e3d",
            "baseCDNURL": "http://localhost:2999"
          }, function(err) {
            if (err) {
                reject(err);
            }
            const platform = this;
            resolve({ platform: platform });
        });
    });
};

export function getCloudCMS() {
    return getCloudCMSPlatform().then(function({ platform }) {
        var repository = null;
        if (false)
        {
            repository = platform.readRepository("<%= options.repositoryId %>");
        }
        else
        {
            repository = platform.datastore("content");

        }

        var branch = null;
        if (false)
        {
            branch = repository.readBranch("<%= options.branchId %>");
        }
        else
        {
            branch = repository.readBranch("master");
        }
        
        return branch.then(function() {
            return {
                platform: platform,
                repository: repository,
                branch: this
            };
        });
    });
}

export default function(ctx, inject) {

    ctx.$getCloudCMSPlatform = getCloudCMSPlatform;
    ctx.$getCloudCMS = getCloudCMS;
    ctx.$baseCDNURL = "<%= options.baseCDNURL %>";

    inject("getCloudCMSPlatform", getCloudCMSPlatform);
    inject("getCloudCMS", getCloudCMS);
    inject("baseCDNURL", "<%= options.baseCDNURL %>");
};