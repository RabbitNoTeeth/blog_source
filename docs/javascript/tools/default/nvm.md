---
title: nvm
description: nvm
lang: zh-CN
---

**NVM (Node Version Manager)** 是一个命令行工具，用于在同一台机器上管理多个版本的 Node.js。它允许开发者轻松安装、切换和卸载不同版本的 Node.js，极大地方便了需要在不同项目间切换 Node.js 版本的开发者。

## 1. 安装

### 1.1 通过安装脚本安装

打开终端，执行以下命令以使用 cURL 安装 NVM（脚本地址中的版本号，可查看nvm github仓库来使用最新版本号）：

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

或者，使用 Wget 安装：

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

<br/>
安装脚本将自动完成 NVM 的下载和配置。安装完成后，你需要将以下内容添加到 shell 配置文件（例如 .bash_profile, .bashrc, .zshrc 等）中：

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

<br/>
重新加载 shell 配置文件：

```
source ~/.zshrc
```

如果使用 bash，执行：

```
source ~/.bash_profile
```

<br/>
确认 NVM 是否成功安装：

```
nvm --version
```


### 1.2 通过Homebrew安装（仅限 macOS）
如果你使用 Homebrew 来管理软件包，可以通过以下命令安装 NVM：

```
brew install nvm
```

安装完成后，按照提示将以下内容添加到 .bash_profile 或 .zshrc 中：

```
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
```

然后，重新加载配置文件并验证安装。

## 2. 常用命令

### 2.1 安装指定版本Node

可以安装任何指定版本的 Node.js。例如，安装 Node.js 16：

```
nvm install 16
```

<br/>
如果想安装最新的稳定版本，执行：

```
nvm install node
```

<br/>
你还可以安装最新的 LTS（长期支持）版本：

```
nvm install --lts
```

### 2.2 切换Node版本

安装多个版本后，可以轻松切换到任何版本。例如，切换到 Node.js 16：

```
nvm use 16
```

<br/>
也可以切换到最新安装的版本：

```
nvm use node
```

### 2.3 查看已安装Node版本
   
列出所有已安装的 Node.js 版本：

```
nvm ls
```

### 2.4 设置默认版本

可以将某个版本设置为默认版本，这样每次打开终端时，都会自动使用该版本。例如，设置 Node.js 16 为默认版本：

```
nvm alias default 16
```

### 2.5 卸载Node版本
   
如果某个版本的 Node.js 不再需要，可以卸载它：

```
nvm uninstall 16
```

### 2.6 列出所有可用的Node版本

列出所有可用的 Node.js 版本（包括 LTS 和当前版本），你可以选择需要的版本进行安装。

```
nvm ls-remote
```

### 2.7 查看当前Node.js版本
   
查看当前正在使用的 Node.js 版本：

```
nvm current
```

