const path = require("path");
const fse = require("fs-extra");
const core = require('@actions/core');
const OSS = require("ali-oss");

const ossClient = new OSS({
    accessKeyId: core.getInput('access_key_id'),
    accessKeySecret: core.getInput('access_key_secret'),
    // bucket所在地域。以华东1（杭州）为例，region填写为oss-cn-hangzhou。
    region: core.getInput('region'),
    authorizationV4: true,
    bucket: core.getInput('bucket'),
    secure: true,
});

async function getAllFiles(dirPath, relativePath = "", arrayOfFiles = []) {
    const files = await fse.readdir(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = await fse.stat(filePath);

        if (stats.isDirectory()) {
            const newRelativePath = path.join(relativePath, file);
            arrayOfFiles = await getAllFiles(filePath, newRelativePath, arrayOfFiles);
        } else {
            const relativeFilePath = path.join(relativePath, file);
            arrayOfFiles.push(relativeFilePath);
        }
    }

    return arrayOfFiles;
}

async function run() {
    const distDir = core.getInput('local_dir')
    try {
        const files = await getAllFiles(distDir);
        const otherFiles = files.filter((file) => file !== "index.html");
        await Promise.all(
            otherFiles.map((file) => {
                const filePath = file.replace(/\\/g, "/");
                return ossClient.put(filePath, path.join(distDir, file));
            }),
        );
        core.info("Other files uploaded successfully!");
        if (files.includes("index.html")) {
            await ossClient.put("index.html", path.join(distDir, "index.html"), {
                headers: { "Cache-Control": "private, no-store, no-cache, must-revalidate, proxy-revalidate" },
            });
            core.info("index.html uploaded successfully!");
        }
        core.info("All files uploaded successfully!");
    } catch (err) {
        core.error(err);
    }
}

run();
