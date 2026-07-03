package com.lea.consumer.filter;

import org.apache.dubbo.common.constants.CommonConstants;
import org.apache.dubbo.common.extension.Activate;
import org.apache.dubbo.rpc.*;

/**
 *
 *
 * @author lea
 * @copyright (c) 2026, ingoo All rights reserved.
 * @since created in 2026-07-03 15:36:49
 */
@Activate(group = CommonConstants.CONSUMER)
public class TimingFilter implements Filter {

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        long start = System.currentTimeMillis();
        try {
            // 交给下一个 Filter / 真正的 Invoker
            return invoker.invoke(invocation);
        } finally {
            System.out.println("[lea-SPI] TimingFilter: 调用后 <- 耗时 " + (System.currentTimeMillis() - start) + "ms");
        }
    }

}
