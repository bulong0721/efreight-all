package com.freight.service;

import java.util.Map;

import com.freight.common.PageResult;
import com.freight.model.COrder;

public interface OrderService {

    COrder find(int orderId);

    PageResult<COrder> search(Map<String, String> paramMap);
}
