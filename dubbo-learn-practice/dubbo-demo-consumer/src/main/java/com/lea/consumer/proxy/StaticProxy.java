package com.lea.consumer.proxy;

/**
 *
 *
 * @author lea
 * @copyright (c) 2026, ingoo All rights reserved.
 * @since created in 2026-07-03 11:04:04
 */
public class StaticProxy implements IHello {

    private final IHello hello;

    public StaticProxy(IHello hello) {
        this.hello = hello;
    }
    @Override
    public void sayHello(String name) {
        System.out.println("record log before invoke method...");
        hello.sayHello(name);
    }

    @Override
    public void sayGoodbye(String name) {
        System.out.println("record log before invoke method...");
        hello.sayGoodbye(name);
    }


    public static void main(String[] args) {
        IHello hello = new HelloImpl();
        IHello proxy = new StaticProxy(hello);
        proxy.sayHello("lea");
        proxy.sayGoodbye("lea");
    }
}
