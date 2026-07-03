package com.lea.consumer.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 *
 *
 * @author lea
 * @copyright (c) 2026, ingoo All rights reserved.
 * @since created in 2026-07-03 11:11:19
 */
public class DynamicProxy implements InvocationHandler {

    private Object delegate;

    public Object bind(Object delegate) {
        this.delegate = delegate;
        return Proxy.newProxyInstance(
            delegate.getClass().getClassLoader(),
            delegate.getClass().getInterfaces(),
            this
        );
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("record log before invoke method...");
        return method.invoke(this.delegate, args);
    }

    public static void main(String[] args) {
//        DynamicProxy proxy = new DynamicProxy();
//        IHello hello = (IHello) proxy.bind(new HelloImpl());

        InvocationHandler handler = (proxy, method, args1) -> {
            System.out.println("record log before invoke method...");
            return method.invoke(new HelloImpl(), args1);
        };
        IHello hello =  (IHello) Proxy.newProxyInstance(
                IHello.class.getClassLoader(),
                new Class<?>[]{IHello.class},
                handler
        );


        hello.sayHello("lea");
        hello.sayGoodbye("lea");
    }
}
