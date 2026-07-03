package com.lea.consumer.proxy;

/**
 *
 *
 * @author lea
 * @copyright (c) 2026, ingoo All rights reserved.
 * @since created in 2026-07-03 11:02:52
 */
public class HelloImpl implements IHello {

    @Override
    public void sayHello(String name) {
        System.out.println("Hello, " + name + "!");
    }

    @Override
    public void sayGoodbye(String name) {
        System.out.println("Goodbye, " + name + "!");
    }
}
