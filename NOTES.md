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
