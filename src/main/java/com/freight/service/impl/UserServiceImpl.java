package com.freight.service.impl;

import java.util.Map;

import com.freight.common.ADExpression;
import com.freight.common.PageResult;
import com.freight.model.ADUser;
import com.freight.service.AbstractService;
import com.freight.service.UserService;

public class UserServiceImpl extends AbstractService implements UserService {

    @Override
    public PageResult<ADUser> search(Map<String, String> paramMap) {
        return search(ADUser.class, paramMap);
    }

    @Override
    protected ADExpression transform(Class<?> entityClass, Map<String, String> paramMap) {
        return super.transform(entityClass, paramMap);
    }

}
