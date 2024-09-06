---
title: 用私有构造器或者枚举类型强化Singleton属性
description: 用私有构造器或者枚举类型强化Singleton属性
lang: zh-CN
---



## 1. 覆盖equals方法时的通用约定

- 自反性

对于任何非null的引用值x，x.equals(x)必须返回true。

- 对称性
   
对于任何非null的引用值x和y，在满足x.equals(y) = true的同时，必须满足y.equals(x) = true。

- 传递性

对于任何非null的引用值x和y 和z，如果满足x.equals(y) = true，y.equals(z) = true，那么必须满足x.equals(z) = true。

- 一致性
   
对于任何非null的引用值x和y，只要equals的比较操作在对象中所用到的信息没有被修改，多次调用x.equals(y)的结果必须一致，或者都为true，或者都为false。

对于任何非null的引用值x，x.equals(null)必须返回false。

在每个覆盖了equals方法的类中，也必须覆盖hashCode方法。如果不这样做的话，就会违反Object.hashCode的通用约定，从而导致该类无法结合所有基于散列的集合一起正常运作，如HashMap、HashSet和HashTable。


## 2. 覆盖equals时总要覆盖hashCode

### 2.1 Object规范中hashCode的通用约定

1. 在应用程序的执行期间，只要对象equals方法的比较操作所用到的信息没有被修改，那么对这个同一个对象调用多次方法都必须始终如一地返回同一个整数。在同一个应用程序的多次执行过程中，每次执行所返回的整数可以不一致。
2. 如果两个对象根据equals方法比较是相等的，那么调用这两个对象中任意一个对象的hashCode方法，都必须产生同样的整数结果。
3. 如果两个对象根据equals方法比较是不相等的，那么调用这两个对象中任意一个对象的hashCode方法时，不一定要产生不同的整数结果，即不相等的对象可以有相同的散列码。(但是应该知道，给不相等的对象生成不相等的散列码，有助于提高散列表的性能)



### 2.2 一种简单的实现hashCode的办法

1. 把某个非零的常数值，比如17，保存在一个名为result的int类型的变量中。
2. 对于对象中每个关键域f(指equals方法中涉及的域)，完成以下步骤：<br/>
   a> 为该域计算int类型的散列码c。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;1> 如果该域是boolean类型，则计算(f?1:0)。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;2> 如果是byte、char、short或者int类型，计算 (int)f。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;3> 如果是long类型，计算 (int)(f^(f>>>32))。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;4> 如果是float类型，计算 Float.floatToIntBits(f)。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;5> 如果是double类型，计算 Double.doubleToLongBits(f)，然后按照步骤 3> 中将long转为int。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;6> 如果是一个对象引用，并且该类的equals方法通过递归地调用equals的方式来比较这个域，则同样为这个域递归地调用hashCode方法。如果需要更复杂的比较，则需要设计一个”范式”，然后按照范式来计算。如果这个域的值为null，则返回0(或者其他的常数)。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp;7> 如果是一个数组，则把每个元素当成单独的域来处理，也就是对每个元素应用上述方法，然后将结果相加。或者利用API中的Arrays.hashCode方法。<br/>
   b> 按照下面的公式,将步骤a>中计算得到的c合并到result中。result = 31 * result + c
3. 返回result
4. 测试



### 2.3 其他注意事项

1. 在散列码的计算过程中，必须排除equals比较中没有用到的域。
2. 如果一个类是不可变的，并且计算散列码的开销也比较大，就应该考虑把散列码缓存在对象内部，而不是每次调用时重新计算。
3. 不要试图从散列码计算中排除掉一个对象的关键部分来提高性能。虽然这样得到的散列函数可能运行地更快，但是它的效果不见得会好，可能会导致散列表慢到根本无法使用。

## 3. 覆盖equals时的补充注意点

1. 无论类是否是不可变的，都不要使equals方法依赖于不可靠的资源。

2. 使用 instanceof 检查参数类型，instanceof 能同时检测非null，当参数为null时，其返回false。

3. 使用 instanceof 检查后，在比较前进行类型转换。

4. 对于float和double域，使用Float.compare和Double.compare进行比较，其他情况下使用 == 操作符进行比较。

5. 域的比较顺序可能影响equals方法的性能，优先比较最可能不一致的域，或者开销最低的域。

6. 不要企图让equals方法过于智能。

7. 不要将equals声明中的Object对象转换成其他类型。

8. 在设计子父类之间的equals比较时，优先考虑复合而不是继承。
