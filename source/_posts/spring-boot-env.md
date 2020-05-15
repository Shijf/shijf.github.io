---
uuid: 30e42f40-9667-11ea-a46f-b77762f93269
title: 如何利用 VSCode 打造一个 java 的开发环境 
date: 2020-05-15 12:47:33
tags: ['liunx', 'java', 'vscode']
cover: true
---

# 安装 Java 环境

## 概述
### 概念理解：
- J2SE 标准版
- J2EE 企业版
- J2ME 用于移动设备、嵌入式设备
### JRE、JDK、JVM之间的区别与联系

- JVM ：英文名称（Java Virtual Machine），就是我们耳熟能详的 Java 虚拟机。它只认识 xxx.class 这种类型的文件，它能够将 class 文件中的字节码指令进行识别并调用操作系统向上的 API 完成动作。所以说，jvm 是 Java 能够跨平台的核心，具体的下文会详细说明。

- JRE ：英文名称（Java Runtime Environment），我们叫它：Java 运行时环境。它主要包含两个部分，jvm 的标准实现和 Java 的一些基本类库。它相对于 jvm 来说，多出来的是一部分的 Java 类库。

- JDK ：英文名称（Java Development Kit），Java 开发工具包。jdk 是整个 Java 开发的核心，它集成了 jre 和一些好用的小工具。例如：javac.exe，java.exe，jar.exe 等。

显然，这三者的关系是：一层层的嵌套关系。JDK>JRE>JVM

<!-- more -->

## Linux 安装 Java 环境
此处需要结合上一篇 [《在win 10 环境下 如何打造一套适合的开发环境》](https://blog.sharef.top/2020/02/21/66b0ce80-95f9-11ea-926e-6f56d5e2c488/)，将ubuntu 设置为 主要的开发、运行环境。

- 官网地址：https://www.oracle.com/downloads/#category-java （2020/03/30版，可能链接会变化）
- 找到 Java -> Java (JDK) for Developers 点击，目前地址 ：https://www.oracle.com/java/technologies/javase-downloads.html
-  这里采用  Linux Compressed Archive ，下载地址：https://download.oracle.com/otn-pub/java/jdk/14+36/076bab302c7b4508975440c56f6cc26a/jdk-14_linux-x64_bin.tar.gz 下载太慢，尝试使用迅雷等工具，如果链接地址有 auth 字样的参数，请删除

以下是在 linux 环境中安装, 用 `$` 来注明

```shell
// 新建目录
$ sudo mkdir /url/local -p soft/java
// 将软件包移动到新建的目录
$ sudo mv ./jdk-14_linux-x64_bin.tar.gz /url/local/soft/java
// 移动到 java 目录下
$ cd /url/local/soft/java
// 解压
$ sudo tar -zxvf jdk-14_linux-x64_bin.tar.gz
// `ls` 查看发现，没有jre目录，此时需要手动安装一下
$ sudo cd jdk-14/bin && ./jlink.exe --module-path jmods --add-modules java.desktop --output jre
// 设置环境变量
$ sudo vim /etc/profile
// 在文件末尾添加以下代码
```
```shell
// /etc/profile
set java environment
JAVA_HOME=/usr/local/soft/java/jdk-14        
JRE_HOME=/usr/local/soft/java/jdk-14/jre     
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH
```
```shell
// 刷新终端区域，使配置生效。
$ sudo source /etc/profile

// 测试
$ java -version
```
打印出 java 版本信息，则说明 JDK 安装成功

**注意，如果你在 `wsl`，可能需要重启 linux 子系统，简单除暴，重启下电脑**

# 安装 maven 并配置 阿里源
- 官网地址：https://maven.apache.org/download.cgi
- 国内加速地址：http://mirror.bit.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz

```shell
// 新建目录
$ sudo mkdir /url/local/soft/maven 
// 移动到新建好的目录
$ cd /url/local/soft/maven 
// 下载安装包
$ sudo wget http://mirror.bit.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
// 解压
$ sudo tar zvxf apache-maven-3.6.3-bin.tar.gz
// 测试安装包, 如果可以打印出版本信息，则下载、解压没有问题
$ sudo cd apache-maven-3.6.3 && ./bin/mvn -v 
```
```shell
// 设置环境变量
$ sudo vim /etc/profile
// 在文件结尾添加以下配置信息

export MAVEN_HOME=/url/local/soft/maven/apache-maven-3.6.3

export PATH=$MAVEN_HOME/bin:$PATH

// 保存并source profile
$ sudo source /ect/profile

// 测试环境变量
$ mvn -v
```
打印出 maven  版本信息，则说明 maven 安装成功
**注意，如果你在 `wsl`，可能需要重启 linux 子系统，简单除暴，重启下电脑**

- 配置国内 阿里 镜像 源，或者是 私有库地址加速

```shell
 <mirror>

      <id>alimaven</id>

      <name>aliyun maven</name>

      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>

      <mirrorOf>central</mirrorOf>       

</mirror>
```

首先，编辑文件 `/url/local/soft/maven/apache-maven-3.6.3/conf/settings.xml`，将上述的配置信息添加到 mirrors（镜像）节点。
然后，重启 vs code，即可生效。



# 环境信息

- java 或者 jdk 安装路径 `/usr/local/soft/java/jdk-14`
- maven 安装路径 `/usr/local/soft/maven/apache-maven-3.6.3`

可能每个人 安装的 路径 不太相同，除非是按着以上步骤来的，不过不要紧，可以通过 
`which mvn` 和 `which java` 分别来查看 当前系统安装的 maven 和 java 的路径
比如我查到的路径分别为：

- `/usr/local/soft/maven/apache-maven-3.6.3/bin/mvn`
- `/usr/local/soft/java/jdk-14/bin/java`

So easy, too happy !

# 安装扩展包

- 1. 搜索并安装  java Extension Pack 
- 2. 搜索并安装 Spring Boot Extension Pack
- 3. 重启编辑器

  以上两个扩展已关联java项目开发主要使用的maven、springboot等所需要的扩展。

# 配置 maven、java 扩展包
点左下角的设置图标->设置

```json
// settings.json
{
    "java.home": "/usr/local/soft/java/jdk-14",
    "java.configuration.maven.userSettings": "/url/local/soft/maven/apache-maven-3.6.3/conf/settings.xml",
    "maven.executable.path": "/usr/local/soft/maven/apache-maven-3.6.3/bin/mvn",
    "maven.terminal.useJavaHome": true,
    "maven.terminal.customEnv": [
        {
            "environmentVariable": "JAVA_HOME",
            "value": "/usr/local/soft/java/jdk-14"
        }
    ]
}
```

主要的配置信息，如上。

# 创建一个 Spring Boot 项目
> 输入Ctrl + Shift + P 打开命令面板，按照以下步骤填写相应内容即可：
> 1. 输入Spring，选择maven类型工程
> 2. 选择工程的语言：java
> 3. 填写工程的Group Id：com.test
> 4. 填写工程的ArtifactId：demo
> 5. 选择springboot版本：2.0.5
> 6. 搜索添加你需要的依赖库，鼠标单击可勾选，这里只添加以下几个：
> DevTools（代码修改热更新，无需重启）、Web（集成tomcat、SpringMVC）、Lombok（智能> 生成setter、getter、toString等接口，无需手动生成，代码更简介）
> 7. 选定依赖库后回车，然后选择一个目录用于初始化工程文件，最后会提示是否打开工程目录，点"open it"，或者自己手动从编辑器左侧的文件-打开文件夹-选定刚才这个目录即可。

# 配置运行环境
启动工程之前还需要配置下运行环境，点左边的小虫子图标，然后点上面的下拉箭头，选择添加配置，VS Code会自动为我们创建启动配置，我们只要修改mainClass就好了，配置示例如下：
```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "CodeLens (Launch) - DemoApplication",
            "request": "launch",
            "mainClass": "com.example.demo.DemoApplication",
            "projectName": "demo"
        }
    ]
}
```

按F5或者点 DemoApplication.java 的 run 按钮启动，此时在命令行可知tomcat服务已经启动，端口号是8080，访问路径根目录为空。

在浏览器访问 http://localhost:8080
提示如下错误：

------

**Whitelabel Error Page**
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Mon Mar 30 19:41:47 CST 2020
There was an unexpected error (type=Not Found, status=404).
No message available

------
这说明我们的服务确实启动可用了，但是访问出这个错误，是因为我们没有定义服务器访问这个根路径对应的应答接口导致的。我们在 demo 包下面新建个 controller 包，然后新建个 HomeController.java 文件，内容如下：
```java
package com.example.demo.controller;
 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
public class HomeController {
 
    @RequestMapping("/")
    public String home(){
        return "你好，欢迎使用Visual Studio Code!";
    }
}
```

此时等待 应用重启，再次访问 http://localhost:8080 

------

你好，欢迎使用 Visual Studio Code!

------

# 写在最后

欢迎使用 **Visual Studio Code **！

# 参考文章



> 原文链接：https://blog.csdn.net/xiaocy66/java/article/details/82875770