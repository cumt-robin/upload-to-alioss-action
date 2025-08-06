# Upload to Ali OSS Action

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Upload%20to%20AliOSS-blue)](https://github.com/marketplace/actions/upload-to-ali-oss)

## 简介

这是一个用于将静态文件自动上传到阿里云 OSS 的 GitHub Action。  
适合静态网站、博客等项目在 CI/CD 流程中自动部署资源到阿里云 OSS，实现持续集成和自动化发布。

## 功能特点

- 支持递归上传指定目录下所有文件  
- 保持目录结构，上传到阿里云 OSS 对应路径  
- 支持配置阿里云 Access Key、地域和Bucket名
- 简单易用，方便集成到任何 GitHub Actions 工作流中  

## 使用方法

在你的 GitHub 仓库中，创建或修改 `.github/workflows/deploy.yml`，示例：

```
name: Deploy to Ali OSS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Upload to Ali OSS
        uses: cumt-robin/upload-to-alioss-action@v1
        with:
          access_key_id: ${{ secrets.ACCESS_KEY_ID }}
          access_key_secret: ${{ secrets.ACCESS_KEY_SECRET }}
          bucket: your-bucket-name
          region: oss-cn-hangzhou
          local_dir: dist
```

> **注意**  
> - 阿里云密钥建议通过 GitHub Secrets 管理，避免明文暴露。  
> - `local_dir` 是你本地构建好的静态文件目录，默认是 `dist`。

## 输入参数

| 参数名      | 是否必填 | 默认值 | 说明                         |
| ----------- | -------- | ------ | ---------------------------- |
| `access_key_id`| 是       | 无     | 阿里云 Access Key ID          |
| `access_key_secret`| 是       | 无     | 阿里云 Access Key Secret           |
| `bucket`    | 是       | 无     | 阿里云Bucket名称           |
| `region`    | 是       | 无   | 阿里云地域，参考[官方文档](https://help.aliyun.com/zh/oss/regions-and-endpoints) |
| `local_dir` | 是       | `dist` | 本地待上传目录               |

## 开发与贡献

欢迎提交 Issue 和 Pull Request，一起完善此 Action。

## 许可证

MIT License

---

如果你觉得本项目对你有帮助，欢迎给个 Star ⭐️ 支持！
