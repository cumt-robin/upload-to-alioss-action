const OSS = require("ali-oss");
const core = require('@actions/core');

const ossClient = new OSS({
    accessKeyId: core.getInput('access_key_id'),
    accessKeySecret: core.getInput('access_key_secret'),
    // bucket所在地域。以华东1（杭州）为例，region填写为oss-cn-hangzhou。
    region: core.getInput('region'),
    authorizationV4: true,
    bucket: core.getInput('bucket'),
    secure: true,
});

module.exports = {
    ossClient,
};
