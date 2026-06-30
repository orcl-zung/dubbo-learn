# Dubbo 3.x SPI 两个易踩点（读源码 / 写扩展必知）

对着 apache/dubbo 3.3.x master 源码核实，记录两个与网上 2.x 教程不一致、会直接误导学习者的点。读源码/写扩展时务必据此修正。

## ① SPI 入口：getExtensionLoader(Class) 在 3.x 已 @Deprecated
`ExtensionLoader.getExtensionLoader(Class<T>)` 这个静态方法在 3.x 标了 `@Deprecated`，内部委托给 `ApplicationModel.defaultModel().getDefaultModule().getExtensionLoader(type)`。3.x 的正经入口是 **`scopeModel.getExtensionLoader(type)`**（ScopeModel 分 Framework / Application / Module 三级）。

- 每个 `@SPI` 接口对应一个 `ExtensionLoader`，且**绑定到 ScopeModel**（不是全局静态单例）。
- 这是 3.x 能「在一个进程里跑多个独立 Dubbo 应用」的基础——旧的全静态单例做不到应用隔离。
- 运行时生成的 `$Adaptive` 门面类里，取扩展也是 `scopeModel.getExtensionLoader(...).getExtension(extName)`（2.x 是静态 `ExtensionLoader.getExtensionLoader(...)`）——见 `AdaptiveClassCodeGenerator`。
- `ExtensionLoader` 构造器是包级可见的 `ExtensionLoader(type, extensionDirector, scopeModel)`，外部不能 `new`。

## ② 单 Provider 时，loadbalance.select() 根本不会被调用
`AbstractClusterInvoker.doSelect` 对候选 invoker 数 == 1 直接短路返回：

```java
if (invokers.size() == 1) {
    return invokers.get(0);     // ← 不调 loadbalance.select
}
```

但 `invoke()` 每次调用都先跑 `initLoadBalance(invokers, invocation)`，它从 URL 读 `loadbalance` 参数（默认 `random`）并 `getExtension(key)` **加载实例**。

**Implications（写/测自定义 LoadBalance 时）**：
- 「我的扩展被选中」的证明，在单 provider 下是**实例被加载**（构造器/静态块日志，或断点打在 `createExtension`），**不是** `select()` 被调。
- 要让 `select()` 真跑，必须 **≥2 个 provider**（起第二个 provider，覆盖 `dubbo.protocol.port` + `server.port`，两者注册到同一注册中心同一接口下）。
- `initLoadBalance` 读的是 `invokers.get(0).getUrl()` 的 `loadbalance` 方法参数，默认 `DEFAULT_LOADBALANCE = "random"`。

## 关联（读源码坐标）
- 源码：`ExtensionLoader.java`（createExtension 三步：找类→injectExtension 注入→cachedWrapperClasses 包装；loadClass 三桶：@Adaptive / Wrapper(构造器单参为 SPI 接口) / 普通）、`AbstractClusterInvoker.java`（doSelect 短路 / initLoadBalance 每次按 key 取）、`AdaptiveClassCodeGenerator.java`、`LoadBalance.java`（`@SPI("random")` + `@Adaptive("loadbalance")`）、`RandomLoadBalance.NAME = "random"`。
- 配置：`@DubboReference(loadbalance="first")`（官方「负载均衡」文档明确写法，运行时由 initLoadBalance 从 URL 解析）。
- 已写进 lessons/0004-spi-extensionloader.html 的 Part A/B/C，并把「构造器日志(单provider) vs select 日志(≥2provider)」作为动手验证点。

## Status
active。课程交付于 2026-06-30。阶段三「集群容错 / 负载均衡」深读时会再回到 `AbstractClusterInvoker` 全链路。
