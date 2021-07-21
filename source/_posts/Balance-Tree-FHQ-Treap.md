---
title: Balance Tree(FHQ Treap)
author: ROY1994
avatar: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.2/img/custom/avatar.jpg
authorLink: roy1994.top
authorAbout: CODE_LIFE
authorDesc: CODE_LIFE
categories: 技术
date: 2018-08-13 13:00:42
comments: true
tags:
  - 数据结构
  - 模版
  - 平衡树
keywords: FHQ
description: 介绍FHQ平衡树
photos: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.3/img/photo/1.webp
---


> 听说这个平衡树很~~好写~~，所以我尝试去学一下这个~~毒瘤~~的数据结构



# FHQ Treap简介
FHQ Treap只有两种主要的操作
* 分离（split） 把一棵树分成两个树
* 合并（merge） 把两棵树合成一棵树

通过 **分离** 和 **合并** 的操作，FHQ Treap可以完成普通平衡树的很多操作

1. 插入 
2. 删除
3. 查询排名为 $i$ 的数
4. 查询 $wei$ 的排名
5. 求 $wei$ 的前驱
6. 求 $wei$ 的后继
7. 反转区间



# 树的节点
FHQ Treap 的节点维护的 普通Treap 维护的大致相同，我们通过一个结构体来保存信息
相关含义如下：

* `size` ---> 子树（包括自身）的大小
* `val` ---> 该节点的值
* `rnd` ---> Treap中用于堆的随机值
* `l` `r` ---> 左节点和右节点

下面给出代码：
```cpp
struct FHQ
{
    int size,val,rnd;
}tr[N];
```
# 操作 1 : 插入
按照普通treap的写法，我们需要新建一个节点，需要调用newnode函数
```cpp
int tot=0;
int newnode(int v)
{
    tr[++tot].size=1;tr[tot].val=v,tr[tot].rnd=rand();
    return tot;//返回新节点的编号
}
```
我们可以把原来的数按新节点的值分成两份，再依次合并，就完成了插入的过程
```cpp
void ins(int wei)
{
    int x,y;
    spilt(root,wei,x,y);
    //root表示目前总树的根节点
    //把总树分成以x,y为根节点的两棵树
    root=merge(merge(x,newnode(wei)),y);
    //合并所有子树并重置根节点
}
```

# 操作 2 ： 删除
删除权值为 $wei$ 的点，先把整颗树以 $wei$ 为权值 $split$ 成两棵树 $x$，$y$，再把 $x$ 树按照 $wei-1$ 分成 $p$，$q$。

这时候值为wei的点一定为 $q$ 的根，那么我们把 $q$ 的两个子儿子 $merge$ 起来（这一步就是去除掉 $wei$ 的影响），再把他们重新 $merge$ 起来得到一个新的树，这颗树就去除掉了 $wei$ 的影响。
```cpp
void del(int wei)
{
    int x,int y,int p,int q;
    spilt(root,wei,x,y);
    split(x,wei-1,p,q);
    q=merge(tr[q].l,tr[q].r);
    root=merge(merge(p,q),y);
}
```
# 操作 3 ： 查询排名为 i 的数
和普通Treap是一样的，

但注意，**这个函数返回的是 排名为 *i* 的数 的节点编号k（值为tr[k].val）** 。
```cpp
int getNum(int now,int rk)
{
    while(1)
    {
        if(rk<=tr[tr[now].l].size) now=tr[now].l;
        else
        {
            if(rk==tr[tr[now].l].size+1) return now;
            else
            {
                rk-=tr[re[now].l].size+1;
                now=tr[now].r;
            }
        }
    }
}
```
# 操作 4 ： 查询 wei 的排名
把总树按 $wei$ 进行 $spilt$ ，得到左部分树的大小即为rank值。
```cpp
int getRank(int wei)
{
    int x,y;
    spilt(root,wei,x,y);
    return tr[x].size;
}
```
# 操作 5 ： 求 wei 的前驱
把总树按 $wei-1$ 分成两份，
所以小于 $wei$ 的节点都在左部分树中，只需要求出左部分树的size所对应的节点的值，
就是所求的 $wei$ 的前驱。
```cpp
int pre(int wei)
{
    int x,y;
    spilt(root,wei-1,x,y);
    return tr[getNum(x,tr[x].size)].val;
    root=merge(x,y);//回复原状
}
```
# 操作 6 ： 求 wei 的后继
找后继是相同的，把总树按 $wei$ 为权值调用 $split$，此时右部分树排名第一的数就是后继
```cpp
int suc(int wei)
{
    int x,y;
    spilt(root,wei+1,x,y);
    return tr[getNum(y,1)].val;
    root=merge(x,y);//回复原状
}
```
# 操作 7 ： 反转区间
~~先咕着，有空补~~

# 核心 1： merge 操作
$merge$ 操作即按照 FHQ Treap 的附加权值~~玄学~~维持平衡并进行合并
```cpp
int merge(int x,int y)//x 恒< y ,所以需要保证顺序
{
    if(!x||!y) return x+y;
    update(x),update(y);
    if(tr[x].rnd<tr[y].rnd)
    {
        tr[x].r=merge(tr[x].r,y);
        update(x);
        return x;
    }
    else
    {
        tr[y].l=merge(x,tr[y].l);
        update(y);
        return y;
    }
}
```
# 核心 2： spilt 操作
$split$ 是把一颗Treap分开两个树的操作。

有两种分法，一种是按权值分，一种是按$size$（子树大小）分，具体用哪个要看情况。

按权值分 **注意这时候权值小于等于 k的节点都在左树中，大于 k的都在右树中** ：

```cpp
void spilt(int now,int val,int &x,int &y)
{
    if(!now) x=y=0;
    else
    {
        if(val<=tr[tr[now].l].val)
            y=now,spilt(tr[now].l,val,x,tr[now].l);
        else
            x=now,spilt(tr[now].r,val,tr[now].r,y);
        update(now);
    }
    
}
```

按 $size$ 分 ：

```cpp
void spilt(int now,int rnk,int &x,int &y)
{
    if(!now) x=y=0;
    else
    {
        if(rnk<=tr[tr[now].l].size)
            y=now,spilt(tr[now].l,rnk,x,tr[now].l);
        else
            x=now,spilt(tr[now].r,rnk-tr[tr[now].l].size-1,tr[now].r,y);
        update(now);
    }
    
}
```

# END
