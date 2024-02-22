---
title: Dockerfile
description: Dockerfile, Dockerfile详解
lang: zh-CN
---

`Dockerfile` 是一个文本文件，它包含了所有用来组建镜像的可执行的命令。通过 `docker build` 指令可以从 `Dockerfile` 来构建镜像。

`Dockerfile` 由一系列指令构成，来定义构建镜像的步骤，文件书写格式为：

```
指令 参数
```

指令不对大小写敏感，但是还是建议使用大写格式。

docker按顺序执行 `Dockerfile` 中的指令。`Dockerfile` 必须以 `FROM` 指令开始。 `FROM` 指令前可以有一个或者多个 `ARG` 指令，这些 `ARG` 指令声明了在 `FROM` 指令中用到的参数。

`Dockerfile` 中，以 `#` 开头的行被视作注释，在加载时，注释行将被忽略。 

`Dockerfile` 支持如下指令：


## FROM

指定基础镜像（即当前镜像是基于哪个镜像构建）。

<br/>

**格式：**

```
FROM [--platform=<platform>] <image> [AS <name>]
```

或者

```
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
```

或者

```
FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```

<br/>

**注意：**

- 只有 `ARG` 指令能够声明在 `FROM` 指令前面。
- 可以存在多个 `FROM` 指令，用来创建多个镜像或者作为不同的构建阶段。每个 `FROM` 指令执行，都会清除上一个 `FROM` 指令创建的所有状态。
- 可以在 `FROM` 指令后添加 `AS name` 来赋予构建出的镜像一个名称，在当前 Dockerfile 的后续 `FROM` 指令和 `COPY --from=<name>` 指令可以通过该名称引用到其表示的镜像。
- `tag` 或 `digest` 的值是可选的，如果未指定，那么将使用 `latest` 作为默认值。

<br/>

**示例：**

在下面的示例中，`FROM` 指令和 `RUN` 指令都要引用参数 VERSION，但只有 `FROM` 指令能够成功，RUN 指令会失败，这是 `FROM` 执行后会清除其之前的状态：

```
ARG VERSION=latest
FROM busybox:$VERSION
RUN echo $VERSION > image_version
```


如果想要在多个指令中引用 FROM 指令之前声明的变量，那么可以通过再次声明不带有默认值的变量的形式：

```
ARG VERSION=latest
FROM busybox:$VERSION
ARG VERSION
RUN echo $VERSION > image_version
```


## ARG

声明参数，**通过 `ARG` 声明的参数仅作用于镜像的构建阶段，在容器运行阶段是无法获取到其声明的参数的**。

<br/>

**格式：**

```
ARG name[=value]
```

<br/>

**示例：**

- 声明一个未赋值的参数

   ```
   ARG user
   ```

- 声明一个参数并赋值

   ```
   ARG user=liuxindong
   ```

- 使用参数

   ```
   ARG parent_image=jdk1.8
   FROM $parent_image
   ```



## ENV

设置环境变量，**通过 `ENV` 声明的变量不仅作用于镜像的构建阶段，在容器运行阶段是也可以获取到**。

**建议：** 如果只是在构建阶段使用的变量，那么用 `ARG` 来声明，否则用 `ENV` 来声明。

<br/>


**格式：**

```
ENV <key>=<value> ...
```

<br/>

如果某些特殊字符不经过转义，那么变量的声明将被打断。可以通过反斜杠或者双引号在变量值中使用空白字符。如：

```
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy
```



可在一个`ENV`指令中声明多个变量：

```
ENV MY_NAME="John Doe" MY_DOG=Rex\ The\ Dog \
    MY_CAT=fluffy
```



通过 `ENV` 声明的变量会持久化到该镜像的容器中，可以通过 `docker inspect` 来查看，并且可通过 `docker run --env <key>=<value>` 来修改。



## WORKDIR

为 `RUN`, `CMD`, `ENTRYPOINT`, `COPY` 和 `ADD` 这些指令设置工作目录。

<br/>

**格式：**

```
WORKDIR /path/to/workdir
```

<br/>

**示例：**

`WORKDIR` 指令可声明多次，如果声明时使用的是相对路径，那么将表示相对于上一个 `WORKDIR` 声明的路径，比如下面的示例：

```
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

`pwd`命令运行后的输出文件所在目录为  `/a/b/c` 。



`WORKDIR` 指令可以解析 `ENV` 声明的变量，如：

```
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME
RUN pwd
```

`pwd`命令运行后的输出文件所在目录为  `/path/$DIRNAME` 。




## COPY

拷贝宿主机中文件、文件夹到容器中。

<br/>

**格式：**

```
COPY [--chown=<user>:<group>] <src>... <dest>
```

或

```
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

<br/>

**示例：**

- 拷贝宿主机中/home/aaa.tar文件到容器中的/home目录下

  ```
  COPY /home/aaa.tar /home
  ```

- 拷贝宿主机中多个文件到容器/home目录下

  ```
  COPY /home/aaa.tar /home/bbb.tar /home/  # 拷贝多个文件时，容器目录必须以/结尾
  ```

- 拷贝宿主机文件到容器当前路径（`WORKDIR` 声明的路径）的deploy目录下

  ```
  COPY /home/aaa.tar ./deploy
  ```

- 宿主机文件支持通配符，其使用的是Go语言的 [filepath.Match](http://golang.org/pkg/path/filepath#Match) 规则

  ```
  COPY hom* /mydir/		# 拷贝所有以 hom 开头的文件
  COPY hom?.txt /mydir/ 	# 拷贝所有以 hom 开头的txt文件
  ```





## ADD

拷贝宿主机中文件、文件夹或者远程文件到容器中。如果拷贝的是tar文件，那么拷贝到容器中后会自动解压。

**`ADD`与 `COPY` 的区别：** 

- 支持远程文件
- 如果是tar文件，拷贝完成后自动解压

<br/>

**格式：**

```
ADD [--chown=<user>:<group>] <src>... <dest>
```

或

```
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

<br/>

示例可参考 `COPY` 指令



## EXPOSE

声明容器可对外开放的端口。

<br/>

**格式：**

```
EXPOSE <port> [<port>/<protocol>...]
```

<br/>



**示例：**

可以对端口协议进行标识，来区分是 UDP 还是 TCP，当不进行特殊标识时，默认为 TCP。如：

```
EXPOSE 8080				  # 监听8080端口，tcp协议
EXPOSE 8081/tcp			# 监听8081端口，tcp协议
EXPOSE 8082/udp			# 监听8082端口，udp协议
EXPOSE 8083/tcp			# 监听8083端口，tcp协议
EXPOSE 8083/udp			# 监听8083端口，udp协议
```

<br/>

**注意：**

`EXPOSE` 仅仅是声明容器可对外开发的端口，但是并没有直接对外开放，容器启动后，如果需要允许外部访问，仍需要在 `docker run` 或者 `docker create` 时，通过 `-p` 参数来进行端口映射实现对外开放

```
docker run -p 8080:8080 -p 8081:8081/tcp -p 8082:8082/udp ...
```



## RUN

声明在**构建阶段**要执行的命令，这些命令执行完成后的结果可在后续的构建过程中使用。

<br/>

**格式：**

```
RUN <command>    # shell格式
```

或

```
RUN ["executable", "param1", "param2"]     # exec格式
```

<br/>

**示例：** 

- shell格式

  ```
  RUN mkdir -p /home/aaa
  ```

- exec格式

  ```
  RUN ["mkdir", "-p", "/home/aaa"]
  ```

  

<br/>

**注意：**

- 使用exec格式时，要处理好字符的转义问题，如：

  ```
  RUN ["c:\windows\system32\tasklist.exe"]
  ```

  上述声明存在字符未转义问题，正确写法为：

  ```
  RUN ["c:\\windows\\system32\\tasklist.exe"]
  ```


- 使用shell格式时，可通过 `\` 来实现换行，如：

  ```
  RUN /bin/bash -c 'source $HOME/.bashrc; \
  echo $HOME'
  ```

  等价于

  ```
  RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
  ```

  

## CMD

为容器执行提供默认行为（即容器启动后要执行的命令）。可以声明多个 `CMD` 指令，但是只有最后一个 `CMD` 指令生效。

<br/>

**格式：**

```
CMD ["executable","param1","param2"]     # exec格式
```

或者

```
CMD command param1 param2    # shell格式
```

<br/>

示例及注意事项参考 `RUN` 指令
