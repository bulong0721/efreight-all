package com.freight.common;

import org.directwebremoting.dwrp.SimpleOutboundVariable;
import org.directwebremoting.extend.Converter;
import org.directwebremoting.extend.ConverterManager;
import org.directwebremoting.extend.InboundContext;
import org.directwebremoting.extend.InboundVariable;
import org.directwebremoting.extend.MarshallException;
import org.directwebremoting.extend.OutboundContext;
import org.directwebremoting.extend.OutboundVariable;

import com.alibaba.fastjson.JSON;

@SuppressWarnings({ "unchecked", "rawtypes" })
public class EntityConverter implements Converter {

    @Override
    public void setConverterManager(ConverterManager config) {
    }

    @Override
    public Object convertInbound(Class paramType, InboundVariable data, InboundContext inctx) throws MarshallException {
        return JSON.parseObject(data.getValue(), paramType);
    }

    @Override
    public OutboundVariable convertOutbound(Object data, OutboundContext outctx) throws MarshallException {
        String text = JSON.toJSONString(data);
        return new SimpleOutboundVariable(text, outctx, true);
    }

}
