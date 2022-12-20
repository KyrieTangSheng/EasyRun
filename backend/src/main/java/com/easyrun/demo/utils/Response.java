package com.easyrun.demo.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Response {
    private Integer status;
    private Integer code;
    private String data;

    public Response(Integer status, Integer code,String data) {
        this.status = status;
        this.data = data;
        this.code = code;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
