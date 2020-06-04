---
uuid: c130c640-a638-11ea-bfe8-f743083da075
title: 彻底搞定flex (持续更新)
tags: []
categories:
  - 前端
  - 教程
  - flex
date: 2020-06-04 13:38:25
---


# flex 布局初体验
![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591249474353.png)

假设我们要实现一个这样的布局，三个色块水平排版;

## 一般写法
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>flex</title>
    <style></style>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</body>
</html>
```

```css
*{
    margin: 0;
    padding: 0;
}
ul {
    margin: 50px;
    border: 1px solid #000000;
    overflow: hidden;
    width: 300px;
    color: #ffffff;
}
li {
    line-height: 50px;
    list-style: none;
    height: 50px;
    width: 50px;
    background-color: blue;
    text-align: center;
    float: left;
    
}

ul li:first-child {
    background-color: red;
}
ul li:last-child{
    background-color: green;
}
```

从代码看出，我们用了浮动。而且浮动布局并不会撑起父元素的高度，我们还需要清除浮动(overflow: hidden;)

### 用flex布局实现

```css
*{
    margin: 0;
    padding: 0;
}
ul {
    margin: 50px;
    border: 1px solid #000000;
    /* overflow: hidden; */
    width: 300px;
    color: #ffffff;
    display: flex;
}
li {
    line-height: 50px;
    list-style: none;
    height: 50px;
    width: 50px;
    background-color: blue;
    text-align: center;
    /* float: left; */
    
}

ul li:first-child {
    background-color: red;
}
ul li:last-child{
    background-color: green;
}
```
我们只需要告诉父元素，display: flex; 即可实现。是不是 so easy！

#### 基本概念

- **伸缩容器**： 在上述的示例中，ul 即为伸缩容器
- **伸缩项**： 伸缩容器的子元素，就是伸缩项，在上述示例中，li 为伸缩项
- **主轴**: 在默认情况下水平方向上称为**主轴**，主轴的从左到右 分别为 主轴的起点、主轴的终点
- **侧轴**：在默认情况下垂直方向上称为**侧轴**，侧轴的从上到下 分别称为 侧轴的起点、侧轴的终点

图示说明：

![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591249508155.png)

## 主轴方向

```css
*{
    margin: 0;
    padding: 0;
}
ul {
    margin: 50px;
    border: 1px solid #000000;
    width: 300px;
    color: #ffffff;
    display: flex;
}
li {
    line-height: 50px;
    list-style: none;
    height: 50px;
    width: 50px;
    background-color: blue;
    text-align: center;
    
}

ul li:first-child {
    background-color: red;
}
ul li:last-child{
    background-color: green;
}
```

以上代码的效果：

![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591249524969.png)

可以看到，flex 默认的排版时从左到有的，即主轴方向是水平向右的。如果需要想要从右向左，则需要修改主轴的起点方向。

- 相关属性：flex-direction
  - 属性参数： row（默认：水平从左到右）row-reverse（从右到左）

我们来试一下不同的取值:

-  ` row-reverse` （主轴从右到左）

```css
ul{
    flex-direction: row-reverse;
}
```

![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591249541816.png)

- `column`（主轴方向垂直从上到下）

```css
ul{
    flex-direction: column;
}
```

![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591249552700.png)
- `column-reverse` (主轴反向垂直从下到上)

![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591249562980.png)

> 注意点：只要主轴发生了变化，侧轴也会变化，永远都是十字交叉的。


## 主轴的对齐方式

- 相关属性： justify-content

相关取值效果展示：
注意： 此时的 `主轴方向` 为默认的 row 取值
1. flex-start(默认) : 让伸缩项与主轴**起点**对齐
```css
ul {
    margin: 50px;
    border: 1px solid #000000;
    width: 300px;
    color: #ffffff;
    display: flex;
    flex-direction: row; 
    justify-content: flex-start; // 修改不同的取值
}
```
![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591256835268.png)
2. flex-end ：让伸缩项与主轴**终点**对齐
![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591256801998.png)
3.  center: 伸缩项位于主轴的中点
![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591256879044.png)
4.  space-between: 两端对齐

先看效果再说原理：

![image](https://cdn.jsdelivr.net/gh/shijf/shijf.github.io/images/1591257094293.png)

> 每两个伸缩项间的距离 = (伸缩容器的宽度 - 所有伸缩项的宽度的总和) / (伸缩项的个数 - 1)

伸缩项（个数大于2时）的排列规律是：起点、终点各一个，剩下的间距为 `每两个伸缩项间的距离`。


