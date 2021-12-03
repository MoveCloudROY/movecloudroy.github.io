---
title: bitset讲解
author: ROY1994
avatar: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.2/img/custom/avatar.jpg
authorLink: roy1994.top
authorAbout: CODE_LIFE
authorDesc: CODE_LIFE
categories: 技术
date: 2021-07-22 00:34:34
comments: true
tags:
    - STL
keywords: bitset
description: RT
photos: https://cdn.jsdelivr.net/gh/MoveCloudROY/cdn@1.6/img/articlepic/head/3.webp
---

> 为了写一道[毒瘤题](https://www.luogu.org/problemnew/show/P3674)，决定学一下 **bitset**



# 头文件

 `#include<bitset>`

  同时需要命名空间 `std`

# 定义

```cpp
bitset <N> bs
// 默认的构造函数将其初始为全0
```

有一个值得注意的地方，**bitset** 的 $bs[0]$ 是最后一位，而 $bs[N-1]$ 是第一位

```cpp
std::bitset<8> bs;
//bs[0] = 1;            // 0000 0001
//bs[7] = 1;            // 1000 0000
```

# 构造函数

```cpp
std::bitset<8> bs(7);
    // 0000 0111
std::bitset<8> bs(0x07);
    // 0000 0111
bitset<numeric_limits<unsigned short>::digits> bs1(267);
    // 16位 
bitset<numeric_limits<unsigned long>::digits> bs2(267);
    // 32位
std::bitset<8> bs("00000111");
    // 7

```


# 操作

| 成员函数         | 功能                                                      |
| ---------------- | --------------------------------------------------------- |
| `bs.any()`       | 是否存在值为 1 的二进制位                                 |
| `bs.none()`      | 是否不存在值为 1 的二进制位  或者说是否全部位为 0         |
| `bs.size()`      | 位长，也即是非模板参数值                                  |
| `bs.count()`     | 值为 1 的个数                                             |
| `bs.test(pos)`   | 测试 pos 处的二进制位是否为 1         返回和0做或运算的值 |
| `bs.set()`       | 全部位置重置为 1                                          |
| `bs.set(pos)`    | pos 位的二进制位置与 1 做或运算                           |
| `bs.reset()`     | 全部位置重置为 0                                          |
| `bs.reset(pos)`  | pos 位的二进制位置与 0 做或运算                           |
| `bs.flip()`      | 全部位逐位取反                                            |
| `bs.flip(pos)`   | pos处的二进制位取反                                       |
| `bs.to_ulong()`  | 将二进制转换为unsigned long输出                           |
| `bs.to_string()` | 将二进制转换为字符串输出                                  |
| `~bs`            | 按位取反 效果等效为 `bs.flip()`                           |
| `os << b`        | 将二进制位输出到os流 小值在右，大值在左                   |


# 运算

**bitset** 的运算就像一个普通的整数一样，可以进行 与 ( **&** ) 、或 ( **|** ) 、 异或 ( **^** )、 左移 ( **<<** ) 、 右移 ( **>>** ) 等操作。

```cpp
  bitset<4> foo (std::string("1001"));
  bitset<4> bar (std::string("0011"));

  cout << (foo^=bar) << '\n';       // 1010 (XOR,assign)
  cout << (foo&=bar) << '\n';       // 0010 (AND,assign)
  cout << (foo|=bar) << '\n';       // 0011 (OR,assign)

  cout << (foo<<=2) << '\n';        // 1100 (SHL,assign)
  cout << (foo>>=1) << '\n';        // 0110 (SHR,assign)

  cout << (~bar) << '\n';           // 1100 (NOT)
  cout << (bar<<1) << '\n';         // 0110 (SHL)
  cout << (bar>>1) << '\n';         // 0001 (SHR)

  cout << (foo==bar) << '\n';       // false (0110==0011)
  cout << (foo!=bar) << '\n';       // true  (0110!=0011)

  cout << (foo&bar) << '\n';        // 0010
  cout << (foo|bar) << '\n';        // 0111
  cout << (foo^bar) << '\n';        // 0101
```

# 参考资料

> [C++ Reference](http://www.cplusplus.com/reference/bitset/bitset/)
>
> [CSDN by Inside_Zhang](https://blog.csdn.net/lanchunhui/article/details/49644373)
>
> [胡小兔的OI博客](