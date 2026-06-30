package com.lea.consumer.loadbalance;

import org.apache.dubbo.common.URL;
import org.apache.dubbo.rpc.Invocation;
import org.apache.dubbo.rpc.Invoker;
import org.apache.dubbo.rpc.RpcException;
import org.apache.dubbo.rpc.cluster.LoadBalance;

import java.util.List;

/**
 * 第 4 课练手：一个自定义「负载均衡」扩展（SPI）。
 * <p>
 * 策略简单到不能再简单——永远挑 invokers 里的第一个，目的是让你把注意力放在
 * 「SPI 机制」本身，而不是负载均衡算法。
 * <p>
 * 两处日志用来印证它「被选中」：
 *   ① 构造器日志：只要 Dubbo 按你的 key（"first"）加载它，就会实例化 → 打印。
 *      即便只有 1 个 provider 也会触发，因为集群层每次调用都先 initLoadBalance()
 *      → getExtension("first") 取实例（实例化只发生一次，之后走缓存）。
 *   ② select 日志：要真正「挑」，得有 ≥2 个 provider。集群层（AbstractClusterInvoker
 *      .doSelect）对「只有 1 个 provider」会短路：size()==1 直接返回，不调 loadbalance.select。
 * <p>
 * 详见 lessons/0004-spi-extensionloader.html · Part A。
 */
public class FirstLoadBalance implements LoadBalance {

    public FirstLoadBalance() {
        // ① 被加载/实例化的信号（单 provider 也会打）
        System.out.println("[lea-SPI] FirstLoadBalance 实例化 —— getExtension(\"first\") 命中了我");
    }

    @Override
    public <T> Invoker<T> select(List<Invoker<T>> invokers, URL url, Invocation invocation) throws RpcException {
        // ② 真正参与「挑选」的信号（需要 ≥2 个 provider 才会被调到）
        System.out.println("[lea-SPI] FirstLoadBalance.select 被调用，候选 invoker 数 = " + invokers.size());
        return invokers.get(0);   // 永远挑第一个（演示用；真实策略应挑可用/权重最优的）
    }
}
