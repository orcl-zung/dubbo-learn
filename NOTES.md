# NOTES（教学备忘）

## 用户画像
- Java 开发者，中文沟通。
- **零基础**：没用过 Dubbo，只知它是 RPC/微服务框架。
- 目标：**源码级**深度（读通 Dubbo 3.x 源码），且希望架构原理 + 实战调优 + Dubbo3 新特性全覆盖。

## 教学张力（关键，影响所有课程设计）
用户「零基础」但目标是「源码级」。直接丢源码会让他读天书、迅速放弃。
**对策**：严格按 **会用 → 懂架构 → 攻源码** 的梯度推进。每节源码课必须先有对应的「使用体感」或「架构铺垫」。在课程里反复显化这条因果链。

## 偏好（待观察，暂用默认）
- 课程用中文，代码注释中文。
- 优先 Apache Dubbo 官方中文文档 + 官方源码为信源。
- 聚焦 Dubbo 3.x。

## 页面模板要求（每个 HTML 都必须包含）
新建任何 lesson / reference 页面时，`<head>` 必须包含以下三件，否则会缺小图标或无深色模式：
```html
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/theme.js"></script>   <!-- 同步、不加 defer，避免主题闪烁 -->
```
（`diagram.js` / `quiz.js` / `code.js` 按需 `defer` 引入；`code.js` 提供代码高亮 + 一键复制，所有含 `<pre>` 的页面都应引入。）

**页脚导航约定**：`.lesson-nav` 放「上一课 ← / → 下一课」的课时导航（参考文档链接放页头的 `.lesson-meta`，不要占页脚）。某方向暂无对应课时（如第 1 课无「上一课」、最新课无「下一课」）时，该侧用一条参考文档链接作占位，新课时创建后立即替换为课时链接。

## 进度
- 2026-06-27：建好工作区、MISSION、RESOURCES、组件、参考文档、第 1 课；新增深色模式（style.css + theme.js）与 favicon，diagram 已改为 CSS 变量配色跟随主题。
- 2026-06-29：架构速查补充「Dubbo vs OpenFeign」同层对照；交付第 2 课（动手跑通 Spring Boot + Zookeeper 三模块工程）。技术选型：Dubbo 3.3.0 + Spring Boot 3.2.4 + JDK 17 + Zookeeper(Docker)，附 Java8/SB2.7、Nacos、无 Docker 三种 fallback。下一课（第 3 课）= 阶段二开篇：分层架构 + SPI 扩展机制。
- 2026-06-29（深夜调试）：用户用 Nacos 跑第 2 课，连环踩坑已逐一定位并修复——① registry scheme 写成 `8848://`（应为 `nacos://`）；② 协议端口 20880 被另一 provider(power-bank-ultimate) 占用 → 换 20881；③ **头号坑：`@DubboService` 不暴露，因未配 `dubbo.scan.base-packages`**（已加；详见 learning-records/0002）。已在用户工程与第 2 课同步修复。
- 2026-06-29：✅ **跑通！** Consumer 打印 `RPC response result: Hello dubbo`。**阶段一（地基 + 会用）达成**，MISSION 第一段通关。下一步：第 3 课《分层架构 + SPI 扩展机制》（阶段二开篇）。
- 2026-06-29：交付第 3 课《分层架构 + SPI》——十层架构图（layer-stack 组件，已加进 style.css）+ 各层源码模块对照（闭环到第 2 课调试日志）+ SPI 机制（Java SPI 对比、约定、LoadBalance 真实配置示例）。第 2 课页脚已接第 3 课。下一步：第 4 课钻进 ExtensionLoader 源码 + 自己写一个 SPI 扩展。
- 2026-06-30：交付第 4 课《钻进 ExtensionLoader + 自己写一个 SPI 扩展》。动手选 LoadBalance 作主线（`FirstLoadBalance` + SPI 配置文件已铺进 consumer 工程省去 boilerplate，用户做 `@DubboReference(loadbalance="first")` 那一步）+ Filter 作加餐（用户自敲）。对着 3.3.x 真源码核实并写进课件，两个易踩点见 learning-records/0003：① `getExtensionLoader(Class)` 3.x 已 `@Deprecated`，入口改 `ScopeModel.getExtensionLoader`；② 单 provider 时 `doSelect` 短路、不调 `loadbalance.select`，但 `initLoadBalance` 每次仍按 key 加载实例（构造器日志会打、select 要 ≥2 provider）。另修了第 3 课 head 漏引 `quiz.js`（之前测验不交互）。下一步：第 5 课服务暴露源码 `ServiceConfig#export` 全链路。
- 2026-07-03：新增参考文档 `reference/consumer-call-chain.html`（Consumer 调用全链路图鉴）——把几轮源码追问压缩成一份「动态一次调用图鉴」：SPI 扩展加载链路（initLoadBalance 加载 / doSelect 使用 / 单 provider 短路）、proxy→handler→Invoker 套娃链、Proxy vs InvokerInvocationHandler vs Invoker 三角色辨析、与 JDK 动态代理的「复用+换芯」类比、自验证断点清单、源码坐标。与静态的 `architecture.html` 互补；已从第 4 课与 architecture 互链。
- 2026-07-03（续）：新增攻读导航 `reference/source-reading-blueprint.html`——把 MISSION 的 4 阶段拧成「一次调用往返」的站点图（主路/支线、每站新机制、精妙榜 Top3+候选、建议路线：先站 B+G 搭链、再站 F/H/J 过网络）。与 architecture（静态）/ consumer-call-chain（动态）组成参考三件套,已互链；MISSION 学习路径段加了指向。活文档：每完成一站把 ⬜→✅。
- 2026-07-03（再续）：交付第 5 课《服务引用 refer:这条 Invoker 链是谁搭的》(站 B)。主线 = 装配 outside-in ↔ 调用 inside-out 的镜像(闭环 consumer-call-chain 图鉴)。核实 3.3.x：ReferenceConfig#get→init→createProxy→createInvoker→protocolSPI.refer(registry)→RegistryProtocol.doRefer(new RegistryDirectory + subscribe + cluster.join)→proxyFactory.getProxy。点明双 consumer filter 链（ClusterFilter pre-LB / 实例 Filter post-LB，TimingFilter 在后者）+ 双服务发现模型（接口级/应用级，深化留站 C）。L5 范围定为只站 B(refer)；站 G(export) 挪到第 6 课作 provider 镜像。已更新蓝图（站 B ✅、建议路线拆分为 L5=B / L6=G / L7 起=F+H+J）。
