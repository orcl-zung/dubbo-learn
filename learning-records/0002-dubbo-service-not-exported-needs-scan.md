# @DubboService 不暴露？多半是没开扫描（Dubbo 3.3 Spring Boot）

调试 demo-provider 时踩到：配置、依赖、`@DubboService` 字节码注解全对，但 Provider 启动日志里**没有 `Export dubbo service`**、Nacos 里 0 个提供者、Consumer 报 No provider。根因——`@DubboService`（类级注解）需要 Dubbo 的**注解扫描**把实现类注册成 ServiceBean 才会暴露，而扫描默认没开。

**修法（任一）**：provider 的 `application.yml` 加 `dubbo.scan.base-packages: com.lea`，或在主类加 `@EnableDubbo`。实测加上后日志立刻出现 `Register ServiceBean[...com.lea.DemoService...]` + `Register dubbo service ... to registry nacos://...`。

**为什么 `@DubboReference` 不受影响**：`@DubboReference` 是字段注入，由 `ReferenceAnnotationBeanPostProcessor` 处理已存在的 bean，不需要扫描；`@DubboService` 是类级，必须靠扫描把类注册成 bean 才能暴露。这正是 Consumer 一直「正常」、Provider 死活不暴露的不对称原因。

## Implications（调试方法论，下次省时间）
Provider 跑着但 No provider 时，别只看进程在不在，按此顺序定位：
1. 查 Nacos（`/nacos/v1/ns/instance/list?serviceName=com.lea.DemoService`）hosts 是否为空 = 没注册；
2. 看 Provider 日志有没有 `Export dubbo service ...`（没有 = 根本没暴露）；
3. 没暴露再查：扫描包开了吗？协议端口被占吗（`lsof -nP -iTCP:20880`）？QoS 22222 被占吗（非致命）？

## 关联（读源码坐标）
「暴露」不是自动的——它由扫描触发 `ServiceAnnotationBeanPostProcessor` 注册 ServiceBean，再由 `ServiceConfig#export` 暴露。这正是阶段二要读的源码入口的运行时体现。另：同一台机多个 Dubbo provider 会抢默认端口（20880 协议端口、22222 QoS 端口），要错开。

## Status
active。已在第 2 课（lesson 0002）补上 `dubbo.scan.base-packages` 与「头号坑」提示，并在用户工程 `dubbo-learn-practice` 的 provider yml 加上扫描配置。
