package com.lea.consumer;

import com.lea.DemoService;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author lea
 * @description
 * @history 2026-06-29 03:15 created by lea
 * @since 2026-06-29 03:15
 */
@SpringBootApplication
public class ConsumerApplication implements CommandLineRunner {

    @DubboReference
    private DemoService demoService;

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        String res = demoService.sayHello(" dubbo");
        System.out.println("RPC response result: " + res);
    }
}
