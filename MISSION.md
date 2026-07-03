# Mission: 深度学习 Apache Dubbo（源码级）

## Why
读通 Apache Dubbo 3.x 的源码，理解一个工业级分布式 RPC 框架的设计思想。终点不是"会用"，而是能跟着源码讲清楚「一次远程调用从 Consumer 发起、到 Provider 执行、再到结果返回，中间每一步到底发生了什么」，并据此排查真实线上问题。

## Success looks like
- 能徒手画出 Dubbo 的角色与调用流程图（Provider/Consumer/Registry/Monitor/Container 与 0–5 步），并解释每一步的职责。
- 能独立写出可运行的 Dubbo3 应用：Spring Boot + 一个 Provider、一个 Consumer、注册中心（Zookeeper 或 Nacos），并成功发起一次远程调用。
- 能讲清五个核心机制的**原理 + 源码入口**：SPI（`ExtensionLoader`）、服务暴露（`ServiceConfig#export`）、服务引用（`ReferenceConfig#get`）、集群容错（`Cluster` / `FailoverClusterInvoker`）、负载均衡（`LoadBalance`）。
- 面对一次线上 Dubbo 故障（超时、地址找不到、无限重试），能基于架构与日志定位大致方向。
- 能说清 Dubbo3 相对 2.x 的关键变化：Triple 协议、应用级服务发现。

## Constraints
- **起点是零基础**：没用过 Dubbo，只知它是 RPC/微服务框架。
- 因此**学习路径必须是**：**会用 → 懂架构 → 攻源码**。不能跳过地基直接啃源码——没有"跑通过一次调用"的体感，读 export/refer 源码等于在读天书。
- 中文 Java 开发者；以 **Apache Dubbo 官方中文文档 + 官方源码** 为第一信源。
- 聚焦 **Dubbo 3.x**（Triple、应用级服务发现、云原生），2.x 仅作对照、非主线。

## Out of scope（保护最近发展区）
- 其他语言 SDK（Go / Rust / Node / Python）的源码——只看 Java 实现。
- Service Mesh / Istio / Envoy 的深入实现——只在 Dubbo3 新特性里点到为止。
- 与 Spring Cloud、gRPC 的横向深挖对比——对比点到为止。
- Dubbo 2.x 历史源码的逐行细读——以 3.x 为主线。

## 学习路径（4 个阶段，会随进度修订）
1. **地基**：Dubbo 是什么、解决了什么、角色与调用流程；动手跑通 Provider + Consumer。
2. **架构原理**：分层架构、SPI 扩展机制、服务暴露与引用、一次调用的全链路。
3. **核心机制深入**：注册中心与服务发现（应用级 vs 接口级）、集群容错、负载均衡、协议与编解码（Dubbo2 / Triple）、序列化、Filter、线程模型。
4. **源码 + 实战调优**：逐模块源码精读；参数调优与线上问题定位。

> 🗺 **攻读蓝图**：把这 4 阶段拧成「一次调用往返」一根线的站点图,见 [reference/source-reading-blueprint.html](reference/source-reading-blueprint.html)（主路 / 支线、每站的新机制、精妙设计榜、建议路线）。活文档,每完成一站回来打钩。
