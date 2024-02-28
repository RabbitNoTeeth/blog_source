---
title: idleTimeout
description: vertx idleTimeout详解
lang: zh-CN
---

## idleTimeout 是什么？
`idleTimeout`，是类`io.vertx.core.net.TCPSSLOptions`的一个字段，对于这个字段的作用，在其setter方法中有下面详细的描述：

```java
  /**
   * Set the idle timeout, default time unit is seconds. Zero means don't timeout.
   * This determines if a connection will timeout and be closed if no data is received nor sent within the timeout.
   *
   * If you want change default time unit, use {@link #setIdleTimeoutUnit(TimeUnit)}
   *
   * @param idleTimeout  the timeout
   * @return a reference to this, so the API can be used fluently
   */
  public TCPSSLOptions setIdleTimeout(int idleTimeout) {
    if (idleTimeout < 0) {
      throw new IllegalArgumentException("idleTimeout must be >= 0");
    }
    this.idleTimeout = idleTimeout;
    return this;
  }
```

翻译一下：

当tcp连接没有数据接收或者发送时，也就是空闲时，`idleTimeout` 决定了是否关闭该连接。如果 `idleTimeout` 的值为0，那么将不会关闭该连接；如果值为n（n > 0)，那么将在n秒后关闭该连接。

`idleTimeout` 的默认值为0，也就是说默认情况下，tcp连接一直不会断开。

在调用 `Vertx.createNetServer` 创建tcp服务，或者调用 `Vertx.createHttpServer` 创建http服务时，其接收的参数 `NetServerOptions`、`HttpServerOptions` 都是 `TCPSSLOptions` 的子类，都可以调用 `setIdleTimeout` 方法来设置 `idleTimeout`。

如果我们的应用需要创建tcp服务，并且由客户端来控制连接的断开，那么使用默认的 `idleTimeout` 是没有问题的。**但是如果我们创建的是http服务，那么请一定要设置合理的 `idleTimeout` 值，不要使用默认值，否则你将体验到接下来的经历～**

## idleTimeout 是如何干废服务器的？

疫情期间，用vertx做了一个http服务，用来接收各县区测温设备上报的数据。应用部署上线三天后，收到cpu告警，登录服务器，发现cpu占用达到80%多，内存占用1g多，晚上重启服务后，cpu及内存占用回到初始状态。 

又一个三天后，再次收到cpu告警，好吧，来活儿了，开始排查。

<br/>

**服务器环境**

- 操作系统：Windows Server 2016
- CPU：1U，10线程
- 内存：32G
- JDK：1.8

### 1. 生成线程转储
一般情况下，CPU占用过高的原因大概率是线程引起的，比如死锁、死循环、线程数过多等。使用 `jstack` 命令生成线程转储。

### 2. 分析线程转储

**<font size="6">2. 分析线程转储</font>**

```
2021-10-08 17:16:12
Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.261-b12 mixed mode):

"Thread-4487" #4580 daemon prio=5 os_prio=0 tid=0x000001d70780c800 nid=0x140c runnable [0x000000ac9f6ff000]
   java.lang.Thread.State: RUNNABLE
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll(Unknown Source)
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.access$2600(Unknown Source)
	at sun.nio.ch.WindowsSelectorImpl$SelectThread.run(Unknown Source)

"Thread-4473" #4566 daemon prio=5 os_prio=0 tid=0x000001d704070000 nid=0x1138 runnable [0x000000ac9e8ff000]
   java.lang.Thread.State: RUNNABLE
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll(Unknown Source)
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.access$2600(Unknown Source)
	at sun.nio.ch.WindowsSelectorImpl$SelectThread.run(Unknown Source)

...(此处省略n行，这之间，都是名称为 Thread-xxx 的线程状态日志)

"vert.x-internal-blocking-12" #94 prio=5 os_prio=0 tid=0x000001d778dcb000 nid=0x27f4 waiting on condition [0x000000ab818ff000]
   java.lang.Thread.State: WAITING (parking)
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x000000068005f308> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
	at java.util.concurrent.locks.LockSupport.park(Unknown Source)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(Unknown Source)
	at java.util.concurrent.LinkedBlockingQueue.take(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor.getTask(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.lang.Thread.run(Unknown Source)

"vert.x-worker-thread-18" #73 prio=5 os_prio=0 tid=0x000001d775d6e800 nid=0x714 waiting on condition [0x000000ab801fe000]
   java.lang.Thread.State: WAITING (parking)
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x000000068001c5f0> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
	at java.util.concurrent.locks.LockSupport.park(Unknown Source)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(Unknown Source)
	at java.util.concurrent.LinkedBlockingQueue.take(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor.getTask(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.lang.Thread.run(Unknown Source)

...(此处省略n行，这之间，都是名称为 vert.x-xxx 的线程状态日志)

"pool-10-thread-2" #58 prio=5 os_prio=0 tid=0x000001d775d62000 nid=0x2b18 waiting on condition [0x000000abfeffe000]
   java.lang.Thread.State: TIMED_WAITING (parking)
	at sun.misc.Unsafe.park(Native Method)
	- parking to wait for  <0x0000000680014a70> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
	at java.util.concurrent.locks.LockSupport.parkNanos(Unknown Source)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(Unknown Source)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(Unknown Source)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor.getTask(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)

...(此处省略n行，这之间，都是名称为 pool-xxx 的线程状态日志)

"AMQP Connection 127.0.0.1:5672" #54 prio=5 os_prio=0 tid=0x000001d7759bf800 nid=0x242c runnable [0x000000abfeefe000]
   java.lang.Thread.State: RUNNABLE
	at java.net.SocketInputStream.socketRead0(Native Method)
	at java.net.SocketInputStream.socketRead(Unknown Source)
	at java.net.SocketInputStream.read(Unknown Source)
	at java.net.SocketInputStream.read(Unknown Source)
	at java.io.BufferedInputStream.fill(Unknown Source)
	at java.io.BufferedInputStream.read(Unknown Source)
	- locked <0x0000000680016ea0> (a java.io.BufferedInputStream)
	at java.io.DataInputStream.readUnsignedByte(Unknown Source)
	at com.rabbitmq.client.impl.Frame.readFrom(Frame.java:91)
	at com.rabbitmq.client.impl.SocketFrameHandler.readFrame(SocketFrameHandler.java:184)
	- locked <0x0000000680016ec8> (a java.io.DataInputStream)
	at com.rabbitmq.client.impl.AMQConnection$MainLoop.run(AMQConnection.java:665)
	at java.lang.Thread.run(Unknown Source)

...(此处省略n行，这之间，都是名称为 AMQP Connection xxx 的线程状态日志)

"Service Thread" #10 daemon prio=9 os_prio=0 tid=0x000001d774f71800 nid=0x154 runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C1 CompilerThread3" #9 daemon prio=9 os_prio=2 tid=0x000001d773a4e000 nid=0xba0 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread2" #8 daemon prio=9 os_prio=2 tid=0x000001d773a43000 nid=0x29f4 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread1" #7 daemon prio=9 os_prio=2 tid=0x000001d773a40000 nid=0x2a30 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C2 CompilerThread0" #6 daemon prio=9 os_prio=2 tid=0x000001d773a3a800 nid=0x2924 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Attach Listener" #5 daemon prio=5 os_prio=2 tid=0x000001d7739ec800 nid=0x1810 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Signal Dispatcher" #4 daemon prio=9 os_prio=2 tid=0x000001d7739eb800 nid=0x2ae4 runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Finalizer" #3 daemon prio=8 os_prio=1 tid=0x000001d7739c4800 nid=0x2bd0 in Object.wait() [0x000000abfbbff000]
   java.lang.Thread.State: WAITING (on object monitor)
	at java.lang.Object.wait(Native Method)
	at java.lang.ref.ReferenceQueue.remove(Unknown Source)
	- locked <0x000000068004d8e8> (a java.lang.ref.ReferenceQueue$Lock)
	at java.lang.ref.ReferenceQueue.remove(Unknown Source)
	at java.lang.ref.Finalizer$FinalizerThread.run(Unknown Source)

"Reference Handler" #2 daemon prio=10 os_prio=2 tid=0x000001d77399a000 nid=0x10ec in Object.wait() [0x000000abfbafe000]
   java.lang.Thread.State: WAITING (on object monitor)
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Unknown Source)
	at java.lang.ref.Reference.tryHandlePending(Unknown Source)
	- locked <0x000000068018edf8> (a java.lang.ref.Reference$Lock)
	at java.lang.ref.Reference$ReferenceHandler.run(Unknown Source)

"VM Thread" os_prio=2 tid=0x000001d773994800 nid=0x276c runnable 

"GC task thread#0 (ParallelGC)" os_prio=0 tid=0x000001d756e24000 nid=0x24c runnable 

"GC task thread#1 (ParallelGC)" os_prio=0 tid=0x000001d756e26800 nid=0x8fc runnable 

"GC task thread#2 (ParallelGC)" os_prio=0 tid=0x000001d756e28000 nid=0x29a4 runnable 

"GC task thread#3 (ParallelGC)" os_prio=0 tid=0x000001d756e2a000 nid=0x2b08 runnable 

"GC task thread#4 (ParallelGC)" os_prio=0 tid=0x000001d756e2b000 nid=0x2af8 runnable 

"GC task thread#5 (ParallelGC)" os_prio=0 tid=0x000001d756e2c800 nid=0x1964 runnable 

"GC task thread#6 (ParallelGC)" os_prio=0 tid=0x000001d756e2f800 nid=0x8a4 runnable 

"GC task thread#7 (ParallelGC)" os_prio=0 tid=0x000001d756e30800 nid=0x264c runnable 

"GC task thread#8 (ParallelGC)" os_prio=0 tid=0x000001d756e31800 nid=0x2b54 runnable 

"VM Periodic Task Thread" os_prio=2 tid=0x000001d774f85000 nid=0x164c waiting on condition 

JNI global references: 880	
```

上述是线程转储中的部分内容，分析程序代码，所有以 `vert.x-`、`AMOP Connection`、`pool-` 为前缀的线程都是程序内创建并且维护的，也就是合理的，日志结尾部分 `Service Thread`、`C1 CompilerThread`、`Attach Listener`、`GC task` 等线程由jvm维护，也是合理的。

**一个非常不合理的地方在于那些 `Thread-xxx` 名称的线程**，这些线程并不是由程序代码创建，并且数量达到了4400+，是非常明显的异常现象。


### 3. 分析线程大量创建的原因

```
"Thread-4487" #4580 daemon prio=5 os_prio=0 tid=0x000001d70780c800 nid=0x140c runnable [0x000000ac9f6ff000]
   java.lang.Thread.State: RUNNABLE
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll(Unknown Source)
	at sun.nio.ch.WindowsSelectorImpl$SubSelector.access$2600(Unknown Source)
	at sun.nio.ch.WindowsSelectorImpl$SelectThread.run(Unknown Source)
```

查看异常线程的详细堆栈信息，发现其发生位置在 `sun.nio.ch.WindowsSelectorImpl` 类，在经过查找相关资料后，确认该类为jdk的nio模型在windows系统上的实现，分析其源码（[参考文章](https://blog.csdn.net/liu_005/article/details/86253576) ），简单解释它的工作原理：在windows平台上，通过辅助线程来管理nio模型中channel的注册和注销，一个辅助线程管理一定数量的channel，channel数量越多，就会创建更多的辅助线程；当channel数量减少，也会销毁对应的辅助线程。

<br/>

存在大量辅助线程的原因可能有2点：

- ① 存在大量未注销的channel
- ② jdk自身bug导致，在查询资料时，发现jdk的nio模型在windows下的实现确实存在bug，可能导致一直创建辅助线程，从而cpu占用飙升，这个问题好像到jdk1.8中也没有完全解决，只是很小的概率才会发生。



虽然原因②很有可能，但是毕竟它是概率性的，而对于我的应用来说，这个问题基本是必会发生的，那么就先从原因①着手进行分析。

直接分析是否存在大量未注销的channel可能有些无从下手，但是应用状态的异常不只在于cpu占用，还有内存占用的异常也非常明显，比正常状态增加了好几倍，那么接下来就从内存下手。


### 4. 生成堆转储

使用 `jmap` 命令生成堆转储


### 5. 分析堆转储

使用 [Eclipse Memory Analyzer](http://www.eclipse.org/mat/downloads.php) 工具打开堆转储文件，查看分析结果

<img src="/img/vertx/10.1.png" style="zoom:100%;" />



可以看到， `io.netty.channel.socket.nio.NioSocketChannel` 类存在大量的实例，占用了 87.5% 的堆内存，点击 Details 查看详细信息：

<img src="/img/vertx/10.2.png" style="zoom:100%;" />



查看实例引用情况，所有的channel实例都被 `sun.nio.WindowsSelectorImpl` 引用，而这恰好是导致辅助线程大量创建的原因。



到这里，就可以确定问题的原因在于存在大量未注销的channel。



### 6. 检查程序代码

既然确定了问题的原因在于存在大量未注销的channel，那么就进一步分析程序逻辑。



在程序中，基于vertx-web模块创建的http服务使用了nio，用来接收测温设备的数据，那么就需要进一步排查是否在处理http请求时存在问题，导致channel一直无法释放。



最后，发现在http的FailureHandler，也就是异常处理器中，对于部分请求处理中出现的异常，未进行正确的响应：

<img src="/img/vertx/10.3.png" style="zoom:100%;" />



修改程序，保证所有发生异常的请求都能响应：

<img src="/img/vertx/10.4.png" style="zoom:100%;" />



### 7. 验证问题是否解决

现在是2021-10-09，将程序重新打包部署，持续观察一段时间，等过几天后再来更新结果。:sweat_smile:



### 8. 问题还在，继续分析吧

现在是2021-10-21，更新下程序代码修改后的结果。

很遗憾，问题并没有得到解决:sob:，只好继续进一步分析。

再次打开MAT，分析堆转储。

<img src="/img/vertx/10.5.png" style="zoom:100%;" />

查看程序中实例数量，`NioSockerChannel` 实例数达到了97940，每一个 `NioSockerChannel` 本质上都对应一个连接。而考虑实际场景，测温设备总数大约10000个，并且是http协议，请求在响应完成后应该关闭，第6步的代码优化也保证了所有请求都能够响应，这个实例数很明显是不正常的，这还只是程序运行了大概4个小时的堆转储。

<br/>
<img src="/img/vertx/10.6.png" style="zoom:100%;" />

进一步查看 `NioSockerChannel` 实例的引用链，可以发现每个 `NioSockerChannel` 实例都被多个 `WindowsSelectorImpl` 实例引用，而 `WindowsSelectorImpl` 实例运行在名称为 `SelectThread` 的线程上。

`WindowsSelectorImpl` 是java nio在windows上的实现，也就是说，这些 `NioSockerChannel` 都是存活状态，导致系统底层要不断的轮询这些channel，查看是否有新的事件需要处理，那么这些channel为什么没有关闭呢？当前服务为http服务，客户端请求后，创建channel进行处理，响应完成后，channel理应关闭才对。



查看创建http服务的代码，可以通过 `HttpServerOptions` 设置一些参数

<img src="/img/vertx/10.7.png" style="zoom:100%;" />



那好，查看HttpServerOptions源码，发现其内部没有与channel相关的参数，进一步查找其父类NetServerOptions，也没有找到有用的信息，再继续查找父类TCPSSLOptions，发现了这个老6属性：`idleTimeout`

<img src="/img/vertx/10.8.png" style="zoom:100%;" />



找到其setter方法，嗯，`idleTimeout` 用来控制空闲连接的超时时长，达到超时时长后该连接将被关闭；默认超时时长为0，即永不超时，也就是说连接永不关闭：

<img src="/img/vertx/10.9.png" style="zoom:100%;" />



那好，修改创建http服务的代码，设置空闲连接的超时时长：

<img src="/img/vertx/10.10.png" style="zoom:100%;" />

更新部署应用，几天后再更新结果。

### 9. 问题解决

十天了，自从修改空闲连接的超时时长后，cpu占用稳定在1%-5%，内存占用200m-600m，上下班高峰期，测试设备上报数据量大，cpu和内存占用会升到，但是整体已经稳定了。进一步查看线程转储及堆转储，一切正常，问题解决！:tada::tada::tada:

这就是我被 `idleTimeout` 干废服务器的经历，所以说，如果用vertx创建http服务，必须设置 `idleTimeout`。
