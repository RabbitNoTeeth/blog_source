---
title: Conda
description: Conda
lang: zh-CN
---

**Conda** 是一个跨平台的包管理和环境管理工具。它允许你安装、更新、删除和管理 Python 包以及其他依赖项，同时支持创建和管理多个虚拟环境。与 pip 等传统的包管理工具不同，Conda 既可以管理 Python 包，也可以管理其他语言的包，比如 R、Ruby 和 Lua，甚至是操作系统级别的包。

## 1. 安装

Conda有两个发行版，可以根据需要进行安装。

- **Anaconda** [下载](https://www.anaconda.com/download/success)
  
  一个包含 Conda、Python、数百个常用包和工具的大型数据科学平台。

- **Miniconda** [下载](https://docs.conda.io/projects/conda/en/latest/index.html)
  
  一个轻量级的 Conda 发行版，只包含 Conda 和其依赖，用户可以根据需要安装其他包。

<br/>
安装完成后，打开终端（Windows 需要打开 Anaconda Prompt）验证 Conda 是否正确安装：

```
conda --version
```

## 2. 环境管理

Conda安装成功后，会自动创建一个名称为 `base` 的默认环境，如果不激活其他环境，那么将默认在该环境。

### 2.1 创建环境

创建一个名为 `myenv` 的环境，并安装 Python 3.8 版本:

```
conda create --name myenv python=3.8
```

<br/>
如果想在创建环境时安装其他包，可以在命令中直接列出:

```
conda create --name myenv python=3.8 numpy pandas
```

### 2.2 激活环境

创建完环境后，你需要激活环境才能使用其中安装的包。

```
conda activate myenv
```

激活后，会看到命令提示符变成了环境名，表示已进入 `myenv` 环境。

### 2.3 停用环境

停用当前环境。

```
conda deactivate
```

执行后，将退出当前环境并返回默认环境 `base`。

### 2.4 查看环境

查看所有的环境，当前激活的环境（会在环境名前面显示 *）。

```
conda env list
```

### 2.5 删除环境

删除名为 `myenv` 的环境及其所有内容。

```
conda remove --name myenv --all
```

## 3. 包管理

包管理的所有命令，只在当前激活的环境生效。

### 3.1 安装包

安装多个包：

```
conda install numpy pandas matplotlib
```

<br/>

**注意**

针对python包，`conda install`  可能会由于源仓库中资源更新不及时，导致找不到指定的包，这时可以使用 `pip` 命令进行安装，效果和 `conda install` 是一样的。

### 3.2 更新包

更新指定包：

```
conda update numpy
```

<br/>
更新所有包：

```
conda update --all
```

### 3.3 删除包

```
conda remove numpy
```

### 3.4 查找包

列出所有包：

```
conda list
```

<br/>
查找指定包：

```
conda search numpy
```


## 4. 常用配置

### 4.1 禁用自动激活

在 Conda 中，默认情况下，当你关闭命令行并重新打开时，系统会自动激活 base 环境。这是因为 Conda 在默认情况下会在启动时自动激活 base 环境。

如果你希望在打开命令行时不自动进入 base 环境，可以禁用 Conda 的自动激活行为。这样，当你打开命令行时，环境不会自动切换到 base，而是保持为系统的默认状态。

```
conda config --set auto_activate_base false
```

### 4.2 修改环境和包的安装路径

如果操作系统是Windows，环境和包的默认安装位置通常位于 C:\Users<用户名>\Anaconda3 或 Miniconda3 目录下。可以通过修改配置项来定义安装位置，避免占用过多的c盘空间。


修改默认的环境安装路径

```
conda config --add envs_dirs D:/my_conda_envs
```

<br/>
修改默认的包安装路径

```
conda config --add pkgs_dirs D:/my_conda_pkgs
```

### 4.3 添加国内源

国内可能无法访问官方源，或者访问较慢，可以添加清华源：

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
```

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
```

```
conda config --set show_channel_urls yes
```
