<!--
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-07-25 21:19:02
 * @LastEditTime: 2020-07-25 21:19:38
 * @LastEditors: shijf
 * @FilePath: /sharef.top/source/_posts/Record the practical operation of obtaining website authentication.md
 * @Description: 
--> 


# 记一次获取网站鉴权的实践操作

> 在移动端平台（就先简称PF平台）上新应用，一般会经过安全校验。所以每一个应用都会采取一些攻击策略手段来保障应用的安全稳定。一般是 xss 攻击，不过针对今天举例的系统（就先简称为BCP）他做的还是很棒的。还有就是鉴权登录，这也是主要能攻破BCP系统的关键点。
>
> 另外本文只分析破解过程，对于原理和一些名词不做过多解释。

## 工具

- fillder（抓包工具，这个其实有没有都行，主要是爬取接口的时候，可以比较直观的。）

- 谷歌浏览器
- PostMan（用户发送接口请求）

## 过程分析

### xss 诱导攻击

BCP系统这方面考虑的比较全面，暂且不分析了。

### 最高鉴权获取

这也是本篇文章要重点分析的部分。

#### 起因

打开PF平台上的 BCP 系统，在网络请求中发现，这样一个接口：

- url：`jtsi/UserLogin/login` 

- method：POST

- 作用：用户登录，返回用户登录信息

- 参数字段：

  | 字段       | 取值（爬取发现）       | 类型   | 是否必填 | 说明                                                         |
  | ---------- | ---------------------- | ------ | -------- | ------------------------------------------------------------ |
  | deviceType | D                      | string | 是       | 判断设备类型，貌似没啥用，不断啥就用D这个值就行              |
  | domain     | BCPWx                  | string | 否       | 用来判断是否是在 移动端 ，移动端就是 BCPWx，PC端啥也不写     |
  | timestamp  | 1595656277             | number | 是       | 时间戳，应该是为了标识当前调用的事件                         |
  | login_type | login_user             | string | 是       | 用户登录类型，用 login_user 这个就行                         |
  | passwd     | BcpWx%3c6****efbe84%3E | string | 是       | 用户的密码（为了安全，我进行了脱密处理），下文会重点分析，这个字符串，关键突破点 |
  | t          | 1595656277720          | number | 是       | 又来一个时间戳，不过这个是 毫秒 的，上面的 timestamp 是秒的。 |

- 返回参数：
```josn
{
	"Result": true,
	"ReturnCode": "000",
	"ReturnMessage": {
		"orgName": "******团队", 
		"roleIds": ["-1"],
		"statusMsg": "登录成功",
		"domain": "",
		"sessionId": "5d1116fb-****-****-94ac-96fa19c75d30",
		"userName": "***",
		"userId": "********",
		"orgId": "**********",
		"depts": {
			"num": "1",
			"**********": "****团队"
		},
		"status": 1,
		"token": "5d1116fb-****-****-94ac-96fa19c75d30"
	}
}
```

从上面的请求参数开始分析：

- 第一步：

  BCP 系统的致命漏洞，也是出现在此。用户在经过 PF 平台的 Oauth2 授权后，竟然没有直接返回 token 值，而是在Oauth2 授权拿到 用户id 后，神奇的是又去请求 BCP 系统自带的登录接口（UserLogin/login），那么他就需要账号密码。

- 第二步：

  通过第一步发现，系统在登陆前，肯定会有一次获取用户密码的请求，果不其然，在进一步抓包处理后（由于只是在手机端简单的注入了一些检测脚本，所以并没有拿到返回密码的接口，或者说在我注入脚本之前，系统就已经完成了获取密码操作，所以我一开始没有拿到这个接口），发现了一个返回用户密码的接口，这个稍后再分析。

- 第三步：

  第二步说到：会有一个返回密码的接口，那么我们要想获取到最高权限（系统管理员）的密码，就必然得知道管理员（当然我是知道，该系统的管理员的用户id，不知道也没关系，下文会讲解怎么拿）的账号密码。

####  获取管理员账号1

上文说到，我已经知道管理员的帐号了，因为就是系统负责人，我肯定是知道的，假如说我不知道，怎么办？

大家知道，在公司内部一般的员工编号都是数字或者有规律的，最主要的就是可以根据自己的账号去推演，毕竟破解最多的就是穷举法。

为了更好的解释怎么获取管理员账号，我在下文会提到根据什么原理拿到管理员账号，此处假设我们知道管理员的账号了。

#### 寻求加密突破点

我们再一次回到，在移动端发现的登录接口，分析一下，此处的请求参数：passwd，为了解释简单，我们假设一个账号：12345678，他的密码（当然我是根据他的规律来生成的）是：BcpWx%3c25d55ad283aa400af464c76d713c07ad%3e，根据经验（也是常识），在接口传参数的时候我们不会有%号的出，也是我们是通过抓包拿到的字符串，肯定也会经过URL编码，那么我们反编码一下：BcpWx<25d55ad283aa400af464c76d713c07ad>，这个规律就有了，密码应该是加密过的，加密过后应该是：25d55ad283aa400af464c76d713c07ad，然后开发者又在密码前后分别加了 "BcpWx<" 和 ">"，当然如果你经验够足的话，一眼就能判断 ">" 的url 编码 为 %3c， "< "的编码为 %3e。那么就只剩下 25d55ad283aa400af464c76d713c07ad ，咋一看，这咋解密，无从下手，上文说到，破解、攻击等手段常用的就是穷举法（没想到第一个 BCP 就中了），最常用的就是 md5 加密，不管三七二十一，先来一波md5加密：

| 字符串    | 12345678                         |
| --------- | -------------------------------- |
| 16位 小写 | 83aa400af464c76d                 |
| 16位 大写 | 83AA400AF464C76D                 |
| 32位 小写 | 25d55ad283aa400af464c76d713c07ad |
| 32位 大写 | 25D55AD283AA400AF464C76D713C07AD |

**注：因为我知道我得账号是多少，所以我是拿自己的 userid，通过md5 去比对的。**

到此返现了惊喜，md5 加密的 **32位 小写** 结果不就是，我们在接口中发现的字符串吗？其实到这里就已经攻破了，当前这是后来分析，才知道的。假设不知道的时候，我们就需要进一步发现。因为这个只是在移动端登录的接口，即使知道了，操作起来不太方便。接下来我们登录 PC　端看看会有怎样的发现。

#### 获取管理员账号 2

接上上小结的内容，假设你不知道管理员账号怎么办？PC 端登录，是用的公司统一认证平台，当登录到，总共请求了 3（有一个接口请求了两次，重复的，阿西吧） 接口：`/jtsi/UserLogin/getHeadImg` 、`/jtsi/JTApplicationService/getApplications`和`/jtsi/JTApplicationService/getApplicationMenu`

第一个顾名思义，请求头像的不用管，重点部分是后边两个接口，超管也顾名思义，啥都管，那么他的应用和菜单树肯定是最多的，只要根据公司的员工编号，写个批量小脚本，哪个员工的菜单树最多，他肯定就是超管了就没跑了。也有的是 admin 这种。

#### 接口小技巧

根据pc端的接口请求可以看出，BCP 系统鉴权使用的 token （移动端）和 sessionId （PC端），这也就不难理解，为啥在 `jtsi/UserLogin/login` 的返回结果中，为啥既有 token 还有 sessionId 了，但是他忽略了一点，也是 BCP 系统最致命的。从返回结果我们可以得出两个结论：

1. 后台生成 token 和 sessionId 的机制一样，只是换了个名称而已
2. 我们可以利用移动端生成的密码，去获取 token，而此处的 token也即 PC端的 sessionId 

为什么要用移动端的接口去生成 token（sessionId ） 呢，上文说到，PC端登录和移动端登录时，是通过 domain 参数来判断的，加入我们不填 domain 参数，你会发现，用 md5 生成的密码对 PC 端的登录接口没用的，这也引发了我继续探寻下去的兴趣。
<!-- more -->

#### 探寻PC端登录接口

上一节说到，如果想用 md5 的密码来获取 token，我们怎么办呢？看一下 PC 的登录接口，在登录的一瞬间，我抓到三个接口：`/jtsi/IAMService/getUserInfo` 、`/jtsi/UserLogin/generatorKey` 和 `/jtsi/UserLogin/login`

- getUserInfo (根据统一认证平台返回的code，拿到当前用户id，其实都拿到 id 了，还进行以下两步，哎)

  请求参数：

```json
  {
	"code": "e829b71a*******5d803903b82",
	"url": "http://**************/jtcl/bcp-eb/initial.html",
	"domain": "",
	"deviceType": "D"
  }
```
  	返回响应(移动端也是因为这个出现的漏洞)：

```json
{
	"Result": true,
	"ReturnCode": "000",
	"ReturnMessage": {
		"password": "BcpIAMLogin<069*********2f8346768>",
		"userId": "********"
	}
}
```

- generatorKey（多次调用后发现，这个加密 key 居然是固定不变的，即每个人都是固定的一个值，那么我们只需要获取一次，就可以拿到该用户的密码）

  请求参数：

```json
  {
  	"userId": "********",
  	"domain": "",
  	"deviceType": "D"
  }
```
  	返回响应：

```json
{
	"Result": true,
	"ReturnCode": "000",
	"ReturnMessage": {
		"type": "AES",
		"key": "8NON*******ysWpM"
	}
}
```

- login（登录接口，返回 sessionId）

  请求参数：

```json
{
	"userId": "********",
	"domain": "",
	"deviceType": "D",
	"login_type": "login_user",
	"passwd": "GasFj9PbWBEgr%2FU7IDI%2B1Eg5rtbVDI9KEK38dr%2Fcg%2BOWZk***zcwa4GP1qO", // 一般有百分号的都是经俩编码的，记得解码
	"timestamp": 1595642745
}
```

​	返回响应：

```json
{
	"Result": true,
	"ReturnCode": "000",
	"ReturnMessage": {
		"orgName": "****团队",
		"roleIds": ["-1"],
		"statusMsg": "登录成功",
		"domain": "",
		"sessionId": "5d1116fb-****-****-94ac-96fa19c75d30",
		"userName": "***",
		"userId": "********",
		"orgId": "******0***",
		"depts": {
			"num": "1",
			"******0***": "***团队"
		},
		"status": 1,
		"token": "5d1116fb-****-****-94ac-96fa19c75d30"
	}
}
```

从上面三个接口可以看出，是依次递进的，先通过 **getUserInfo** 拿到 用户账号即 userId , 再通过 **generatorKey** 拿到加密密钥（后面会讲这个用处，以及好玩之处），最后通过 **login **接口，获得 sessionId 来登录系统。

思路理清后，好像还是不能获得 PC 端登录时的密码是啥，即 `domain `参数为空时，调用 login 接口。但是通过第二个接口，可以给我们一些惊喜，我们分析一下BCP系统的前端登录逻辑：

拿到 login.js 文件（本文只显示关键代码）：

```js
// ……部分代码
reqData.userId = userId; // 这个是 用户的id
var keyAction = loginAction.generatorKey; // 获取 key 的接口的 方法
jt.ajax(keyAction, reqData, function(resData){ // 上文中提到的第二个接口即获取 key 值，就是这句代码来 执行后发出的请求
if(resData && resData.type && resData.key){ 
	var encryptType = resData.type; // 拿到 key 值的加密 类型，即加密密码时，是采用哪种加密方式
	var encryptKey = resData.key; // 获取加密时，需要的密钥
	passwd = jt.util.encryptString(passwd, encryptKey, encryptType); // 加密代码，都是在前端加密的，这个开发者真是o((⊙﹏⊙))o.，我们可以在控制台调用这个方法，来获取方法
	passwd = encodeURIComponent(passwd); // 开发者可能觉得上边的加密，还需要 编码以下
	}
	jt.security.login(loginAction.login, userId, passwd, $scope.myCallback, reqData); // 执行登录操作
});

```

encryptString 方法的代码(在jt.core.min.js， 这个真心应该放在后端代码中)：

```js
// 加密代码
var encryptString=function(plaint,key,type){type=type?type.toUpperCase():type;if("AES"==type){return AESEncrypt(plaint,key)}else{if("DES"==type||"3DES"==type){return DESEncrypt(plaint,key)}else{if("RSA"==type){return RSAEncrypt(plaint,key)}else{return plaint}}}};
// 解密代码，如果你不知道自己的密码，可以在控制台调用以下这个方法，O(∩_∩)O
var decryptString=function(encrypted,key,type){type=type?type.toUpperCase():type;if("AES"==type){return AESDecrypt(encrypted,key)}else{if("DES"==type||"3DES"==type){return DESDecrypt(encrypted,key)}else{if("RSA"==type){return RSADecrypt(encrypted,key)}else{return encrypted}}}};
```

到此，我们就拿到了用户的在加密后的密码，从而也就拿到了，通过 PC 端请求接口时，即 `domain`为空时，获取到他的 token值，也就是 凭证，接下来只需要知道接口就可以为所欲为了，也就获取了鉴权权限。

### 重点来了

通过在PC端登录逻辑的分析，BCP系统的用户密码就是移动端请求时参数里面的密码（BcpWx%3c6****efbe84%3E），在PC端登录时，再进行加密此密码，来登录PC端。

### 题外话

可能超管都不知道他的密码是啥（超管登录是通过统一认证平台登录的），因为开发者和超管不是一个人，密码也是程序批量自动生成的，他想改还不知到原密码，其实这才是最好玩的。

## 总结

熟话说，破解不是目的，目的是为了学（po）习（jie）。

本文中，没有用插图，主要是为了加载速度，已经易于传播。

如果开发BCP系统的开发者能：

- 多余参数不要，省带宽，降风险
- 加密在后端做
- 多一些开发经验

那么我也不会这么轻易的拿到鉴权权限。