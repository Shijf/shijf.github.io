---
uuid: fc6247d0-9679-11ea-8eb3-976c7845fdb4
title: 利用自己的云服务器搭建内网穿透，免费不限量，主要是速度很给力
date: 2018-09-04 22:49:18
tags: ['linux', '微信开发']
cover: true
---
# 前言
最近在开发一款基于微信的产品，这里不得不说，[超哥](https://github.com/overtrue/wechat) 的 [wechatSdk](https://www.easywechat.com/) 确实好用，节省了不少时间，但是在本地开发总是会用到内网穿透来实现和微信服务器联调的环节。以前也用户过诸如 [natapp](https://natapp.cn) 类的工具，一个原因是因为，这类工具都是需要费用的，虽然有免费的版本，但是总是会掉线，而且还是限流量。也用过Ngnok，但是如果自己搭建起来比较麻烦，失败率太高了。直接用的话，服务器在国外，在天朝访问你懂的，那是相当的缓慢，一袋烟的功夫过去了，还是个毛都没有，微信接口验证，通过的话，还得看运气。而且每次一个网址只能是用八小时左右，这就需要每次都得到公众号里面重新配置。额……又得等。之前偶然间发现，一个国人开源的神器 [frp](https://github.com/fatedier/frp) ，真的是太棒了，这里分下能给大家。具体能实现的功能，文档里面有详细的说明，我就不罗嗦了。给大家[中文文档](https://github.com/fatedier/frp/blob/master/README_zh.md)。接下来给大家分享一下搭建步骤，也是一个备忘，有好东西当然是要分享了。
对了，最近开发微信公众平台需要一些测试用户，希望大家帮忙关注一下，不会给您带来困扰的，这里谢谢各位了。
<!-- more -->
# 搭建前端准备工作

> 1. 拥有独立公网IP的云服务器；
2. 会简单的liunx命令；
3. 需要一丢丢耐心。

> ### 这里我演示的环境：
*  公网服务器：**系统：**ubuntu16.04  ** ip**：x.x.x.x **开放端口：**7000（绑定frp）  7500（虚拟机） **作用：**用来做内网穿透的服务器
*  内网服务器（虚拟机）：**系统：**centos7  ** ip：**192.168.43.133 **开放端口：** 22 **作用：**用来实现通过外网访问，ssh登陆虚拟机 
*  内网（win 10_64bit）： 作用：演示  本地通过访问外网实现访问本地服务器
*  公网服务器与内网服务器都需要下载frp进行安装，公网服务器（服务端)

#  实际操练
> 1.下载：`wget https://github.com/fatedier/frp/releases/download/v0.21.0/frp_0.21.0_linux_amd64.tar.gz`
2.解压好：`tar -zxvf  frp_0.13.0_linux_amd64.tar.gz`
3.进入解压目录 `cd  frp_0.13.0_linux_amd64 `
4.这里主要关注4个文件，分别是frpc、frpc.ini和frps、frps.ini，前者两个文件是客户端所关注文件，后者两个文件是服务端所关注两个文件。
5.配置服务端（公网服务器）`vim ./frps.ini`:
```
[common]
bind_port = 7000           #与客户端绑定的进行通信的端口
vhost_http_port = 80    #访问客户端web服务自定义的端口号 
subdomain_host = test.com # 泛域名解析到 公网IP：x.x.x.x
token = 123456 #验证客户端
```
6.保存然后启动服务`./frps -c ./frps.ini`，这是前台启动，后台启动命令为`nohup ./frps -c ./frps.ini &`
> 7.在win10_64bit 中下载 [这个](https://github.com/fatedier/frp/releases/download/v0.21.0/frp_0.21.0_windows_amd64.zip)。
> 8.配置客户端（内网）`vim ./frpc.ini`:
```
[common]
server_addr = x.x.x.x
server_port = 7000
token = 123456 # 用于验证服务端
[web]
type = http
local_ip = 127.0.0.1
local_port = 80
subdomain = paper # 二级域名 访问时 即: paper.test.com
[ssh]
type = tcp 
local_ip = 192.168.43.133# 虚拟机的内网ip
local_port = 22 #虚拟机的ssh端口
remote_port = 8085 #在云服务器记得放行此端口,注意这里不需要在服务端指定
```
> 9.保存然后执行./frpc -c ./frpc.ini启动，这是前台启动

> 10、具体访问:  
> `ssh -oPort=8085 shijf@x.x.x.x ` 相当于在内网使用 `ssh  shijf@192.168.43.133 `
> 打开浏览器访问 ` http://paper.test.com`

# 注意

这里内网穿透并不能直接穿透到我们的内网域名,即 `local_ip ` 
设置为 `local_ip = paper.test` 它还是访问到 默认的 127.0.0.1 
这里可以 使用 将 `paper.test` 的端口修改为 `81`:,
那么我们可以在 客户端你这样设置:`local_port = 81`
这样当你访问 ` http://paper.test.com` 就可以直接 访问到 内网域名了,记得在 内网服务器也改  ` http://paper.test.com` 的监听端口为 `81`.

# 总结

这里安利这么久,确实时因为它,真的不错,访问速度快(当然取决于你的云服务器的带宽和内网服务器的配置),如果你也正好在开发微信应用,不如试试吧.




