package com.lea.provider;

import com.lea.DemoService;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.stereotype.Service;

/**
 * @author lea
 * @description
 * @history 2026-06-29 03:09 created by lea
 * @since 2026-06-29 03:09
 */
@DubboService
public class DemoServiceImpl implements DemoService {

    @Override
    public String sayHello(String name) {
        return "Hello" + name;
    }

}
