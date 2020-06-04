---
uuid: 66b0ce80-95f9-11ea-926e-6f56d5e2c488
layout: post
categories: [['linux'], ['前端'], ['环境搭建']]
tags: ['liunx', 'node']
title: 在 win 10 环境下 如何打造一套适合的开发环境之前端环境
date: 2020-02-21
cover: true
---
## 前提
- win10 专业版 

> 如果安装的是 win10 企业版本呢，由于太纯净了，连**应用商店**都没有，我们需要自己去下载一下**应用商店**

- 开启 Linux 子系统服务

  操作 步骤：
    1. 打开 **控制面板**
    2. 找到 **程序**
    3. 点击 **启用或关闭 Windows 功能**
    4. 在差不多倒数的几个，找到 **适用于Linux 的 Windows 子系统** ，*打勾*，等待安装好后，重启电脑

- 安装 Linux 子系统

  1. 打开 **应用商店**，如果没有登陆，需要实现登录 一下
  2. 搜索 Linux 
  3. 选择 **Ubuntu 18.04 LTS** 选择安装，如果下载速度较慢，可以打开**传递优化**
  4. 等待下载好后，直接启动就好，此处一般时间比较长，请耐心等待，开启后，设置自己的 **用户名** 和 **密码**

- 启动配置 Ubuntu

  这里可以根据自身来配置一些东西，比如替换镜像为国内阿里源，具体的配置还需要，自己去查就好，
  
  如果要使用 root 权限，直接使用 sudo + commend 就好
  
## 安装编辑器

这里可选择 vscode 为例，因为 vsCode 有现成的插件可以很好的在 wsl 中调试代码、共享文件

<!-- more -->

- 下载地址：https://code.visualstudio.com/docs/?dv=win
- 安装插件：
1. 直接搜索 `@idms-vscode-remote.remote-wsl` 安装，关于更多 wsl 在 vs 中使用，可参考 https://aka.ms/vscode-remote/wsl/getting-started
2. 其他的插件可根据自身去 下载、安装，比如 中文包、主题、图标等
3. 重启编辑器


## 在 ubuntu 中安装 开发环境
此处以安装 nodejs 为例，打开 vscode 编辑器，按 `ctrl` + ` 打开终端，此时发现还是 win10 的命令行，我们可以点击左侧边栏的 **远程资源管理器**，进入到 wsl 列表中，选中我们刚刚安装的 ubuntu18.04 ，此时会重新开一个窗口，这时我们在 打开终端，我们会发现已经进入到我们的 Linux 系统了。

安装 nodejs 所有命令以及操作如下：

```shell
// 获取最新的node二进制包
$ wegt https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1-linux-x64.tar.xz

// 解压node包
$ tar -xvf  node-v12.16.1-linux-x64.tar.xz

// 建立 nodejs 文件夹 并将解压好的移入 nodejs 文件夹
$ cd /usr/local/
$ sudo mkdir -p soft/nodejs
// 不要一味的赋值，看清自己下载的版本
$ sudo mv ~/node-v12.16.1-linux-x64/* ./nodejs/

// 建立软连接

$ sudo ln -s /usr/local/soft/nodejs/bin/node  /usr/local/bin/node

$ sudo ln -s /usr/local/soft/nodejs/bin/npm  /usr/local/bin/npm 
$ sudo ln -s /usr/local/soft/nodejs/bin/npx  /usr/local/bin/npx
// 测试安装成功与否,如果打印出版本信息，则安装成功，如果没有，则应细细检查步骤，重复一下

$ npm -v //  6.13.4

$ node -v // v12.16.1

$ npx -v // 6.13.4

// 如果在生产服务器上，可以用ftp上传
// 注意，如果在生产服务器上安装时，最好是建立一个node的用户，方便管理，由于是本地开发我们就可以随自己喜好了

```

## 测试刚刚搭建好的开发环境

在 win10 中，新建一个项目文件夹，右键用 vscode 打开，在左下角点击绿色的双对箭头(><)图标,选择 Reopen Folder in WSL，按 `ctrl` + ` 进入命令行，如下：

```she
****@***:/mnt/c/project$ 
```

由路径可一看出来，我们的工程目录已经自动挂载到Linux系统重量。

## 打开 linux 子系统的文件
`\\wsl$\Ubuntu-18.04\home\`

此时请享受，在linxu环境下，带来的畅快体验，可以避免大量由于Windows的原因导致的坑点。

## 写在最后

请认真反复