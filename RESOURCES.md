# Dubbo 学习资源

> 第一信源永远是官方。本文件的每一条都标注「用于什么」，三个月后再翻也能立刻定位。

## Knowledge（知识与原理）

### 官方文档（最高可信度，主线）
- [核心概念与架构总览（官方）](https://dubbo.apache.org/zh-cn/overview/what/overview/)
  数据面 vs 治理控制面、服务开发框架与通信协议、服务治理抽象。**用于：第一课的权威依据，建立全局认知。**
- [概念与架构（官方）](https://dubbo.apache.org/zh-cn/overview/what/architecture/)
  RPC 通信、服务发现原理、三大中心（注册/配置/元数据）、部署架构。**用于：理解角色与调用流程、三大中心职责。**
- [快速开始：基于 Spring Boot 的 Dubbo 应用（官方）](https://dubbo.apache.org/zh-cn/overview/quickstart/)
  手把手搭 Provider + Consumer。**用于：第二课动手跑通第一个应用。**
- [Dubbo3 速览（官方）](https://dubbo.apache.org/zh/overview/what/dubbo3/)
  Dubbo3 相对 2.x 的演进与升级要点。**用于：Dubbo3 新特性阶段的总览。**
- [服务发现与负载均衡（官方）](https://dubbo.apache.org/zh-cn/overview/mannual/java-sdk/tasks/service-discovery/)
  延迟注册、优雅上下线、启动检查、推空保护、负载均衡策略。**用于：注册中心与负载均衡专题。**
- [注册中心概述（官方）](https://dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/registry/overview/)
  注册中心在服务治理中的角色。**用于：理解 Client-Based 服务发现机制。**
- [扩展点开发指南 / Dubbo SPI（官方）](https://dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/architecture/dubbo-spi/)
  SPI 概念与扩展开发。**用于：SPI 机制专题的入口。**
- [源码架构：扩展点加载 / 服务调用（官方 2.7 版源码分析）](https://dubbo.apache.org/zh-cn/docsv2.7/dev/source/)
  官方出品的源码级讲解。**用于：进入源码阶段的总览与对照（注意基于 2.7，需结合 3.x 源码）。**
- [Dubbo SPI 源码（官方 2.7）](https://dubbo.apache.org/zh-cn/docsv2.7/dev/source/dubbo-spi/)
  `ExtensionLoader` 的核心逻辑。**用于：SPI 源码精读的权威参考。**

### 源码
- [apache/dubbo（GitHub）](https://github.com/apache/dubbo)
  官方源码仓库。**用于：源码阶段的主战场，按 tag 切到 3.x 分支对照阅读。**

### 社区源码解析（次级，需对照 3.x）
- [JavaGuide：Dubbo 面试题总结](https://javaguide.cn/distributed-system/rpc/dubbo.html)
  依官方文档梳理 Dubbo 六大核心能力。**用于：自测核心概念、查漏补缺。**
- 芋道源码《精尽 Dubbo 源码分析》系列（搜索「芋道源码 Dubbo」定位最新网址，如 iocoder.cn）
  中文社区最系统的 Dubbo 源码逐行解析。**用于：源码精读阶段的辅助（注意基于较早 2.x 版本，务必对照 3.x 源码，部分细节已变化）。**

## Wisdom（社区与实战）
- [Apache Dubbo 官方社区（钉钉/微信群/邮件列表）](https://dubbo.apache.org/zh-cn/contact/)
  官方维护者与贡献者聚集地。**用于：源码疑问、贡献 PR 前的讨论。**
- [apache/dubbo Issues & Pull Requests](https://github.com/apache/dubbo/issues)
  真实问题与设计讨论的一手现场。**用于：在真实 issue/PR 中检验自己的理解（最高阶的"智慧"训练场）。**
- 微信公众号「Apache Dubbo」
  官方团队发布版本动态、设计文章、最佳实践。**用于：跟踪 Dubbo3 演进与生产实践。**

## Gaps（待补）
- 缺一本系统讲 **Dubbo 3.x 源码**的权威中文书；当前以官方文档 + 源码 + 社区系列为主，进入源码阶段后需大量直接读源码。
