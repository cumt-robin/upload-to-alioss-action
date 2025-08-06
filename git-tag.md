- 删除本地的v1标签

```shell
git tag -d v1
```

- 删除远程的v1标签

```shell
git push origin :refs/tags/v1
```

- 创建新的v1标签指向最新的commit/release

```shell
git tag v1
```

- 推送新的v1标签到远程

```shell
git push origin v1
```