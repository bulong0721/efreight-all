package com.freight.service.impl;

import java.util.Map;

import com.freight.common.PageResult;
import com.freight.model.COrder;
import com.freight.service.AbstractService;
import com.freight.service.OrderService;

public class OrderServiceImpl extends AbstractService implements OrderService {

    @Override
    public COrder find(int orderId) {
        COrder order = find(COrder.class, orderId);
        return order;
    }

    @Override
    public PageResult<COrder> search(Map<String, String> paramMap) {
        return search(COrder.class, paramMap);
    }

}
