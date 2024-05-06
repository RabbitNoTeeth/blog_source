---
title: 代理TCP/UDP
description: nginx代理tcp, nginx代理udp, 代理tcp/udp
lang: zh-CN
---

通过nfs搭建共享存储，可实现多台机器的文件共享。下面以机器A（192.168.1.100）和机器B（192.168.1.200）为例，将机器A作为共享文件的实际存储机器，机器A的目录 `/app/share` 共享给机器B。

## 安装nfs

在机器A中，安装nfs服务

```
yum install nfs-utils
```

或者 
```
apt-get install nfs-common
```

具体使用哪种安装命令，取决于机器的系统。

## 配置nfs

在机器A中，执行以下命令，配置nfs服务

```
vi /etc/exports
/home/share 198.168.1.200(rw,sync,no_root_squash)
```

其中，`/home/share` 为共享文件的实际存储位置，根据自己需要可以任意指定，`198.168.1.200(rw,sync,no_root_squash)` 表示文件可以被ip为198.168.1.200的机器B共享，如果要配置多台机器，可用空格隔开，如下所示：
```
/home/share 198.168.1.200(rw,sync,no_root_squash) 198.168.1.201(rw,sync,no_root_squash) 198.168.1.202(rw,sync,no_root_squash)
```

也可以按照网段进行配置，如下表示ip为198.168.1.*的机器都可共享：
```
/home/share 198.168.1.0/24(rw,sync,no_root_squash)
```

## 启动nfs
在机器A中，启动nfs服务
```
service nfs start
```

## 创建共享目录
在机器A中，创建共享目录
```
mkdir /app/share
```

注意，在配置nfs时， `/etc/exports` 文件中的 `/home/share` 与此处的共享目录不是一回事，前者是共享文件的实际存储目录，而后者是机器A和B在使用时的共享目录，即文章开头中的 `/app/share` 。

## 挂载nfs
在机器B中，挂载nfs
```
mount -t /home/share 198.168.1.100:/app/share /app/xxx
```
上述命令表示，将机器A的 `/app/share` 目录挂载到机器B的 `/app/xxx` 位置，在实际使用中，一般机器A和B组成应用集群，机器B的挂载位置也会使用 `/app/share`，便于应用部署，此处为了说明命令中两个目录的含义，使用了不同的值。

## 验证
按照上述方法操作完成后，在机器A的 `/app/share` 目录下操作文件（创建、删除、修改等），在机器B的 `/app/xxx` 目录下，可以同步看到效果，反之是同样的，而文件的实际存储位置是机器A的 `/home/share`。
