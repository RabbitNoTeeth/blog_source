---
title: 代理TCP/UDP
description: nginx代理tcp, nginx代理udp, 代理tcp/udp
lang: zh-CN
---

通过nfs搭建共享存储，可实现多台机器的文件共享。下面以机器A（192.168.1.100）和机器B（192.168.1.200）为例，将机器A作为共享文件的实际存储机器，机器B共享机器A的文件。



## 1. 安装nfs

在机器A中，安装nfs服务

```
yum install nfs-utils
```

或者 
```
apt-get install nfs-common
```

具体使用哪种安装命令，取决于机器的系统。



## 2. 配置nfs

在机器A中，执行以下命令，配置nfs服务

```
vi /etc/exports
/nfs 198.168.1.200(rw,sync,no_root_squash)
```

`/nfs` 表示共享文件的实际存储目录，可以任意指定，但是要保证该目录存在。

`198.168.1.200(rw,sync,no_root_squash)` 表示文件可以被ip为 198.168.1.200 的机器（及机器B）共享，如果要配置多台机器，可用空格隔开，如下所示：
```
/nfs 198.168.1.200(rw,sync,no_root_squash) 198.168.1.201(rw,sync,no_root_squash) 198.168.1.202(rw,sync,no_root_squash)
```

也可以按照网段进行配置，如下表示ip为198.168.1.*的机器都可共享：
```
/nfs 198.168.1.0/24(rw,sync,no_root_squash)
```



## 3. 启动nfs

在机器A中，启动nfs服务
```
service nfs start
```



## 4. 挂载nfs

在机器B中，挂载nfs
```
mount -t nfs 198.168.1.100:/nfs /home/share
```
`-t` 后面的 `nfs` 表示挂载类型为nfs。

`198.168.1.100:/nfs /home/share` 表示将ip为 198.168.1.100 机器的 `/nfs` 目录，挂载到本地的 `/home/share` 目录。



## 5. 验证
在机器B中，执行
```
df -h
```

可以找到如下输出：
```
198.168.1.100:/nfs (size) (used) (avail) (use%) /home/share
```

在机器A的 `/nfs` 目录下操作文件（创建、删除、修改等），在机器B的 `/home/share` 目录下，可以同步看到效果，反之是同样的，而文件的实际存储位置是机器A的 `/home/share`。

## 补充
在实际场景中，如果机器A和机器B搭建了共享存储，一般都是组成集群，部署相同类型的应用，而这就需要机器A与机器B的应用访问的是相同路径的共享目录，而按照上面的操作，机器A需要访问 `/nfs`，而机器B需要访问 `/home/share`。 很明显这样还要修改应用，为了保持应用一致，我们需要在机器A上也访问 `/home/share`，该如何做呢？

很简单，在机器A上执行第4步中的挂载nfs操作，在机器A上再建一个挂载点即可。
