---
title: Segment-Tree-PART-ONE
author: ROY1994
avatar: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.2/img/custom/avatar.jpg
authorLink: roy1994.top
authorAbout: CODE_LIFE
authorDesc: CODE_LIFE
categories: 技术
comments: true
date: 2021-07-22 14:58:23
tags:
	- algorithm
	- 线段树
keywords: 线段树
description: RT
photos: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.6/img/articlepic/head/5.webp
---

# 概念

>线段树，类似区间树，它在各个节点保存一条线段（数组中的一段子数组），主要用于高效解决连续区间的动态查询问题，由于二叉结构的特性，它基本能保持每个操作的复杂度为$O(logn)$。



# 操作
下面我们从一个经典的例子来了解线段树
```cpp
    从数组arr[0...n-1]中查找某个数组某个区间内的最小值，
    其中数组大小固定，但是数组中的元素的值可以随时更新。
```



我们可以用线段树来解决这个问题：预处理耗时$O(n)$，查询、更新操作$O(logn)$，需要额外的空间$O(n)$。根据这个问题我们构造如下的二叉树
- 叶子节点是原始组数arr中的元素
- 非叶子节点代表它的所有子孙叶子节点所在区间的最小值
例如对于数组[2, 5, 1, 4, 9, 3]可以构造如下的二叉树（背景为白色表示叶子节点，非叶子节点的值是其对应数组区间内的最小值，例如根节点表示数组区间arr[0...5]内的最小值是1）：
{% fb_img https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.5/img/articlepic/illus/SegT-1.jpg 构造二叉树 %}


由于线段树的父节点区间是平均分割到左右子树，因此线段树是完全二叉树，对于包含$n$个叶子节点的完全二叉树，它一定有$n-1$个非叶节点，总共$2n-1$个节点，因此存储线段是需要的空间复杂度是$O(n)$
# 创建线段树
## 子节点
根据线段树的性质（完全二叉树），只需知道父节点，就可以计算出子节点的序号
```cpp
inline LL getLeftNum(LL p)
{
    return p<<1;
}
inline LL getRightNum(LL p)
{
    return p<<1|1;
}
```
## 树的存放和节点信息
首先，我们需要判断我们需要维护的对象，可以是一个**值**，也可以是**颜色**，**状态**等
```cpp
struct
{
    int val;//可以添加col,status，lztag
}Tree[N];
```
## 建树操作
我们使用递归操作来建树
>* 当左端点和右段点相同时，意味着此时的$p$节点是叶子节点
>* 二分当前区间，递归建树


注意，这里有两个尚未出现的东西，$pushup$函数和$lztag$标记

$pushup$函数用于从子节点向上依次更新父节点的值
而$lztag$是用于区间修改的懒标记

```cpp
void buildTree(LL p,LL l,LL r)
{
    lztag[p]=0;
    if(l==r) {Tree[p]=a[l];return ;}
    LL mid=(l+r)>>1;
    buildTree(getLeftNum(p),l,mid);
    buildTree(getRightNum(p),mid+1,r);
    pushup(p);
}
```
## pushup 操作
$pushup$起到更新的作用，对于不同的需求，有不同的$pushup$操作

对于求和，可以这么写
```cpp
inline void pushup(LL p)
{
    Tree[p]=Tree[getLeftNum(p)]+Tree[getRightNum(p)]);
}
```
而对于求 最大值/最小值 ，则可以这么写
```cpp
inline void put_up(LL p)
{
    Tree[p]=max(Tree[getLeftNum(p)],Tree[getRightNum(p)]);
    //Tree[p]=min(Tree[getLeftNum(p)],Tree[getRightNum(p)]);
}
```
## 更新操作
更新操作可以分为两种
* 单点操作
* 区间操作

### 单点操作（updataPot）

明确变量名：
1. （l ~ r） ------  可支配区间
2. （nedChangeL ~ nedChangeR） ------  需操作区间
3.  mid ------ 可支配区间中点

注 :
> * 当$mid$不小于$nedChangeL$时 代表去 $l$ ~ $mid$ 更新是有意义的，所以，我们选择更新该区间
> * $mid$和$nedChangeR$同理


```cpp
void updataPot(LL nedChangeL,LL nedChangeR,LL l,LL r,LL p,LL num)
{
    if(l==r) {Tree[p]=num;return ;}
    LL mid=(l+r)>>1;
    if(nedChangeL<=mid) updata(nedChangeL,nedChangeR,l,mid,getLeftNum(p),num);
    if(nedChangeR>mid) updata(nedChangeL,nedChangeR,mid+1,r,getRightNum(p),num);
    put_up(p);
}
```
### 区间操作（updataInterval）
#区间操作需要引入一个概念 
> $lazytag$ :
> $lazytag$标注的是线段树中每个树的变化量，即 $\Delta$ 
>
> $lazytag$ 操作时正如其名，只对目前状态打上标记，等到更新时，才向下传递
> 因此，引入另一个函数$pushdown$，用于更新其子节点的$lazytag$和本节点的数值

接下来给出$pushdown$的代码
```cpp
inline void updataSum(LL p,LL l,LL r,LL num)
{
    lztag[p]=lztag[p]+num;
    Tree[p]+=num*(r-l+1);
}
inline void put_down(LL p,LL l,LL r)
{
    LL mid=(l+r)>>1;
    updataSum(getLeftNum(p),l,mid,lztag[p]);
    updataSum(getRightNum(p),mid+1,r,lztag[p]);
    lztag[p]=0;
}
```
有了$pushdown$算法，我们可以完成$updata$操作
```cpp
void updataInterval(LL needChangeL,LL needChangeR,LL l,LL r,LL p,LL num)
{
    if(needChangeL<=l&&r<=needChangeR) {updataSum(p,l,r,num);return ;}
    put_down(p,l,r);
    LL mid=(l+r)>>1;
    if(needChangeL<=mid) updata(needChangeL,needChangeR,l,mid,getLeftNum(p),num);
    if(needChangeR>mid) updata(needChangeL,needChangeR,mid+1,r,getRightNum(p),num);
    put_up(p);
}
```
## 区间求值（query）
区间求值时，我们进行了询问，而因为$lazytag$的原因，在求值之前，需先进行$pushdown$操作
```cpp
LL getSum(LL qx,LL qy,LL l,LL r,LL p)
{
    LL sum=0;
    if(qx<=l&&r<=qy)return Tree[p];
    LL mid=(l+r)>>1;
    put_down(p,l,r);
    if(qx<=mid)sum+=getSum(qx,qy,l,mid,getLeftNum(p));
    if(qy>mid) sum+=getSum(qx,qy,mid+1,r,getRightNum(p));
    return sum;
}
```
# END
