---
title: Git
author: ROY1994
avatar: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.2/img/custom/avatar.jpg
authorLink: roy1994.top
authorAbout: CODE_LIFE
authorDesc: CODE_LIFE
categories: 技术
date: 2018-08-13 13:00:42
comments: true
tags:
  - git
keywords: git
description: git的基础用法
photos: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.6/img/articlepic/head/11.webp
---

## 使用基本设置

#### ssh 配置

```
 ssh-keygen -t rsa -C "YourEmail@email.com"
 \r\r\r ...
 seek for ".ssh"  in the user file
 copy "id_rsa.pub" 
```

#### 提交代码时的用户信息

```
 git config --global user.name "YourUsername"
 git config --global user.email "YourEmail@email.com"
```

## 初始仓库

#### 初始化

```git
 git init
```

#### 指定目录 dir

```git
 git <dir>
```

## 常用操作

#### 跟踪文件/加入暂存区

```git
 git add *
 git add README
 git add *.c
```

#### 加入本地仓库
```
 git commit -m "First" //windows
 git commit -m 'First' //linux
```

#### 克隆仓库

``` 
 git clone <repo>
```

## 基本操作

#### 查看仓库当前状态

```
git status 
```

#### 回退版本

```
 git reset HEAD^            // 回退所有内容到上一个版本  
 git reset HEAD^ hello.php  // 回退 hello.php 文件的版本到上一个版本  
 git reset 052e             // 回退到指定版本
 git reset --soft HEAD~3    // 回退上上上一个版本
 	HEAD~0 表示当前版本
	HEAD~1 上一个版本
	HEAD^2 上上一个版本
	HEAD^3 上上上一个版本
```

#### 比较文件的不同

```
 git diff
```



## 远程操作

####  添加一个新的远程仓库

```
 git remote add [shortname] [url]
 
 git remote add origin https://github.com/MoveCloudROY/cdn.git
```

####  显示所有远程仓库

```
 git remote -v
```

#### 从远程获取代码库

```
 git fetch [alias] //获取远端的更新
 git merge [alias]/[branch] //将服务器上的任何更新合并到你的当前分支
	alias - 本地仓库
	branch - 远程仓库
```

##  分支管理

#### 创建分支

```
 git branch (branchname)
```

#### 切换分支

```
 git checkout (branchname)
```

​          - 创造并切换 `git checkout -b change_site`

#### 列出分支

```
 git branch
```

#### 删除分支

```
 git branch -d (branchname)
```

#### 分支合并

```
 git merge (branchname) //合并 branch 到主分支
```

