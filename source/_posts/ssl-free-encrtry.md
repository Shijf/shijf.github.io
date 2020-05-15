---
uuid: a545f2b0-967b-11ea-a177-d1521733a308
title: 盼望着，盼望着 let's encrypt 泛域名野卡证书，终于终于上线了
date: 2018-07-30 14:03:45
tags: ['工具']
---
# 说明 
首先说下，什么叫泛域名，假如我有一个域名 sharef.top ,那么主域名就是 [www.sharef.top](https://www.sharef.top) , 假如还想做一个网站，域名为[ f.sharef.top](https://f.sharef.top) ,如果要想 访问这两个网站，那么我们得同时将我们的这两个域名A记录解析到服务器的IP，同样，假如我们需要为这两个网站 申请 ssl 证书，那么我们要申请两个，来配置。但是泛域名解析的话，我们只需要将 * .sharef.top 这一条 A 记录解析到我们的服务器就好了，那么不管我们，想要访问a.sharef.xin,还是 b.sharef.top 都会解析到 我们的服务器。同样 泛域名解析 也是一样，我们只需申请一次的  .sharef.top 证书，我们这里的 二级域名都是可以 用这一个 ssl 证书就可以了。

<!-- more -->

# 官方参考
GitHub：[仓库在这里](https://github.com/Neilpang/acme.sh)
官方中文说明：[中文文档](https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
DNSAPI：你可能会是不同的DNS服务商，在 [这里](https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md)会查到

# 环境准备
首先你要有一台公网服务器：这里我以 ***阿里云***的  centos 7 为例演示：
需要安装一些必要的软件 ：
```
yum update && yum install curl -y && yum install cron -y && yum install socat -y
```
**以下操作也可以参考官方文档哈**
# 使用阿里云域名 api 申请Let’s Encrypt泛域名免费ssl证书
## 下载 acme.sh 并且执行

```
curl https://get.acme.sh | sh
```
## 获取阿里云的Access Key ID和Access Key Secret到环境变量中

阿里云的Access Key ID和Access Key Secret可以在下面[这个](https://account.aliyun.com/login/login.htm?oauth_callback=https%3A%2F%2Fak-console.aliyun.com%2F%3Fspm%3D5176.2020520001.0.0.0EJtVx#/accesskey)页面中登录获取
![file](https://cdn.learnku.com/uploads/images/201807/30/18751/Fv5i4dMUpl.png?imageView2/2/w/1240/h/0)

执行以下命令，将密钥添加到环境变量中

```
export Ali_Key="你的Access Key ID"
export Ali_Secret="你的 Access Key Secret"
```
![file](https://cdn.learnku.com/uploads/images/201807/30/18751/27CcV0W6Si.png?imageView2/2/w/1240/h/0)
## 申请证书
执行以下命令（将domain.com换成自己的域名）：
```
~/.acme.sh/acme.sh --issue --dns dns_ali -d domain.com -d *.domain.com
```

**注意：第一个 -d 后不可直接写通配符域名*.domain.com，一定要写个单域名，第二个 -d 后面可以写泛域名。
否则可能会出现签发的证书无法被信任的情况。**

![file](https://cdn.learnku.com/uploads/images/201807/30/18751/XcZOssYu4p.png?imageView2/2/w/1240/h/0)

### 之后把这些证书下载下来就好了，所有文件在.acme.sh/你的域名 目录下面就可以了

配置 ssl 的问题就 自行 搜索教程吧，证书都有啦，还怕搞不成？

# 重重之中，记得放行服务器 443端口

# 参考链接
1. 作者：Noisky  [let's encrypt泛域名野卡证书配置笔记](https://ffis.me/experience/1261.html)
2. 作者：bboysoul [使用阿里云域名api申请Let’s Encrypt泛域名免费ssl证书](https://yq.aliyun.com/articles/541843)











