package com.freight.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.freight.common.ADExpression;
import com.freight.common.CommonDao;
import com.freight.common.EntityBase;
import com.freight.common.PageResult;
import com.google.inject.Inject;

public abstract class AbstractService {

    private static final String PARAM_FILTER = "q";
    private static final String PARAM_LIMIT = "limit";
    private static final String PARAM_START = "start";
    @Inject
    protected CommonDao commonDao;

    protected <T extends EntityBase> PageResult<T> search(Class<T> entityClass, Map<String, String> paramMap) {
        int offset = Integer.parseInt(paramMap.get(PARAM_START));
        int limit = Integer.parseInt(paramMap.get(PARAM_LIMIT));
        String queryString = paramMap.get(PARAM_FILTER);
        ADExpression expr = transform(entityClass, parseQueryString(queryString));
        List<T> rows = commonDao.selectByExpr(entityClass, expr, offset, limit);
        return new PageResult<>(rows, rows.size());
    }

    protected ADExpression transform(Class<?> entityClass, Map<String, String> paramMap) {
        return null;
    }

    protected Map<String, String> parseQueryString(String queryString) {
        Map<String, String> paramMap = new HashMap<>();
        for (String pair : queryString.split("&")) {
            int eq = pair.indexOf("=");
            if (eq >= 0) {
                String key = pair.substring(0, eq);
                String value = pair.substring(eq + 1);
                paramMap.put(key, value);
            }
        }
        return paramMap;
    }

}
