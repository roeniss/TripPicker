package com.picker.trip.model;

public class DefaultRes<T> {

    private int status;

    private String message;

    private T data;

    public DefaultRes(final int status, final String message, final T t) {
        this.status = status;
        this.message = message;
        this.data = t;
    }

    public DefaultRes(final int status, final String message) {
        this(status, message, null);
    }

    public static<T> DefaultRes<T> res(final int status, final String message) {
        return res(status, message, null);
    }

    public static<T> DefaultRes<T> res(final int status, final String message, final T t) {
        return new DefaultRes<T>(status, message, t);
    }

    public static final DefaultRes FAIL_DEFAULT_RES = new DefaultRes(500, "INTERNAL_SERVER_ERROR");

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}