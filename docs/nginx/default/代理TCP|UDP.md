---
title: 代理TCP/UDP
description: nginx代理tcp, nginx代理udp, 代理tcp/udp
lang: zh-CN
---

nginx可以通过stream模块实现对tcp/udp协议的反向代理和负载均衡，在1.9版本之后，该模块内置在安装包中，但默认是不启用的。

## 启用stream模块

在配置tcp/udp代理前，可通过命令 `nginx -V` 查看是否启用了stream模块，执行该命令后，控制台输出如下：

```
nginx version: nginx/1.14.0 (Ubuntu)
built with OpenSSL 1.1.1  11 Sep 2018
TLS SNI support enabled
configure arguments: --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --with-http_ssl_module --with-http_stub_status_module
```

查看 `configure arguments` 中是否包含 `--with-stream`，如果包含，说明已经启用了stream模块，否则说明未启用。

要启用stream模块，需要重新编译nginx，并在编译时添加 `--with-stream` 来启用stream模块，编译命令如下：

```
./configire --with-stream [...其他编译配置]
make
make install
```

编译完成后，可再次通过上面的 `nginx -V` 命令检查是否成功启用了stream模块。

## 配置nginx.conf

对于tcp/udp代理，通过stream关键字进行配置，它和http关键字同级，如下为22端口和3306端口的反向代理示例：

```
# http
http {
    server {
        ...
    }
}

# tcp/udp
stream {
    upstream ssh {
        server 198.1.1.100:22;
    }
    
    upstream mysql {
        server 198.1.1.100:3306;
    }
    
    # proxy 22
    server {
        listen 10022;
        proxy_pass ssh;
    }
    
    # proxy 3306
    server {
        listen 13306;
        proxy_pass mysql;
    }
}
```

如果需要设置代理超时时间、连接超时时间或者负载均衡等，配置方式和http反向代理的配置方式是一样的。
