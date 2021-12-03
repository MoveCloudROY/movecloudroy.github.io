---
title: Segment-Tree-ZKW-PART-TWO
author: ROY1994
avatar: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.2/img/custom/avatar.jpg
authorLink: roy1994.top
authorAbout: CODE_LIFE
authorDesc: CODE_LIFE
categories: 技术
comments: true
date: 2021-07-22 15:02:24
tags:
	- algorithm
	- 线段树
keywords: 线段树
description: RT
photos: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.6/img/articlepic/head/6.webp
---
> 本来想看看网上的讲解的，结果发现都讲得不清楚，还是自己写一个吧



---

# 普通线段树与ZKW线段树
>- **普通线段树**通过递归建树，因而其常数相对较大
>- **普通线段树**代码长，相对较复杂
>- **ZKW线段树**通过循环建树，相对常数小
>- **ZKW线段树**代码短，易理解



# ZKW线段树 · 无差分弱化版
线段树是一种堆式储存结构，
观察其节点编号

{% fb_img https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.5/img/articlepic/illus/ZKW-1.jpg 线段树十进制 %}

将其转化成二进制

{% fb_img https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.5/img/articlepic/illus/ZKW-2.jpg 线段树二进制 %}

规律是很显然的

>- 一个节点的父节点是这个数左移1，这个位运算就是低位舍弃，所有数字左移一位
>- 一个节点的子节点是这个数右移1，是左节点，右移1 +1是右节点
>- 同一层的节点是依次递增的，第$n$层有$2^{n-1}$个节点
>- 最后一层有多少节点，值域就是多少(这个很重要)

有了这些规律就可以开始着手建树了

若树的层数为 $m$ ，则最后一层的节点数 $cnt$ 满足 $cnt = 2^{m-1}$

若数的个数为 $x$ ，则数的个数x满足 $\frac {cnt}{2} < x <= cnt$
（大于$x$小于$cnt$的部分无视）

底层节点序号从 $cnt$ 开始，一直到 $cnt+n-1$ 结束，第 $p$ 个数编号为 $cnt+p-1$

所以我们需要先算出这个 $cnt$ 的最小值
```cpp
for(cnt=1;cnt<x;cnt<<=1);//这里没有等号，以保证cnt最小
```
## 建树
```cpp
int n,a[10005];
struct node
{
	int num;
}Tree[10005];
inline void build(int n)
{
	for(cnt=1;cnt<x;cnt<<=1);
    for(int i=cnt;i<cnt+n;i++) Tree[i].num=read();
}

```
这仅仅是对叶子节点进行操作，之后，我们要依次更新父节点
由于是自下往上更新，所以，我们应当从 $cnt-1$ 开始，一直到 $1$ 
```cpp
for(int i=cnt-1;i>=1;i--)
    Tree[i].num=Tree[i<<1].num+Tree[i<<1|1].num;
```
最后的建树代码
```cpp
inline void build(int n)
{
    for(cnt=1;cnt<x;cnt<<=1);
    for(int i=cnt;i<cnt+n;i++) Tree[i].num=read();
    for(int i=cnt-1;i>=1;i--) Tree[i].num=Tree[i<<1].num+Tree[i<<1|1].num;
}
```
## 单点操作
直接修改
```cpp
inline void change(int x,int k)
{
    Tree[cnt+x-1].num+=k;
    while(x) Tree[x>>=1].num=Tree[x<<1].num+Tree[x<<1|1].num;//更新
}
```
## 单点查询
直接修改
```cpp
inline int askpot(int pos)
{
	return Tree[cnt+pos-1];
}
```
----------

# ZKW线段树 · 差分版
## 建树
我们发现，上面的方法对于区间操作时间复杂度会很高，因此，我们可以使用差分思想来进行优化

此时，线段树节点存的值是他和父节点的差值
我们再来写一下差分版的build
```cpp
void build(int n)
{
	for (cnt = 1; cnt < x; cnt <<= 1);
    for (int i = cnt; i < cnt + n; i++) Tree[i].num = read();
    for (int i = cnt - 1; i >= 1; i--)
    {
        Tree[i].num = min(Tree[i << 1].num, Tree[i << 1 | 1]);
        Tree[i << 1].num -= Tree[i];
        Tree[i << 1 | 1].num -= Tree[i];
    }
}
```
## 单点查询
由于差分的性质
只需依次向上累加就可以求出改点的值
```cpp
inline int askpot(int pos)
{
    int sum=0,x=cnt+pos-1;
    while(x) sum+=Tree[x].num,x>>=1;
    return sum;
}
 ```
 ## 区间查询
 ```cpp
 inline int askRange(int l,int r)
 
 
 ```