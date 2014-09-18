package com.freight.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.freight.common.*;
import com.freight.model.*;
import com.freight.service.AbstractService;
import com.freight.service.FacadeService;
import com.freight.service.OrderService;
import com.freight.service.UserService;
import com.freight.util.DTOUtil;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.inject.Inject;
import com.google.inject.persist.Transactional;

public class FacadeServiceImpl extends AbstractService implements FacadeService {

    private static Map<Integer, Class<?>> tableMap;
    static {
        tableMap = new HashMap<>();
        tableMap.put(117, CMove.class/* �������� */);
        tableMap.put(110, CBPartner.class/* ���������� */);
        tableMap.put(105, ADField.class/* �ֶι��� */);
        tableMap.put(100, ADClient.class/* �ͻ����� */);
        tableMap.put(115, CInventory.class/* ������ */);
        tableMap.put(108, ADUser.class/* �û����� */);
        tableMap.put(104, ADWindow.class/* ������� */);
        tableMap.put(101, ADOrg.class/* ��֯���� */);
        tableMap.put(123, CVehicle.class/* �������� */);
        tableMap.put(120, COrder.class/* �˵����� */);
        tableMap.put(113, CInout.class/* �������� */);
    }
    @Inject
    private OrderService                  orderService;
    @Inject
    private UserService                   userService;

    @Override
    public PageResult<COrder> searchOrder(Map<String, String> paramMap) {
        return orderService.search(paramMap);
    }

    @Override
    public PageResult<ADUser> searchUser(Map<String, String> paramMap) {
        return userService.search(paramMap);
    }

    @Override
    public WindowModel getWindowModel(int windowID) {
        Map<String, Object> paramMap = toMap("windowID", windowID);
        ADWindow window = selectOneByNamedQuery("queryWindowByID", ADWindow.class, paramMap);
        List<ADFieldV> fieldList = selectListByNamedQuery("queryFieldVByWindow", ADFieldV.class, paramMap);
        return DTOUtil.toWindowModel(window, fieldList);
    }

    @Override
    public PageResult<?> search4Window(Map<String, String> paramMap, Integer tableID) {
        Class<?> entityClass = tableMap.get(tableID);
        if (null != entityClass) {
            return search(entityClass, paramMap);
        }
        return searchUser(paramMap);
    }

    @Transactional
    public boolean create4Window(List<?> entityList, int tableID) {
        // TODO Auto-generated method stub
        return false;
    }

    @Transactional
    public boolean update4Window(List<?> entityList, int tableID) {
        // TODO Auto-generated method stub
        return false;
    }

    @Transactional
    public boolean delete4Window(List<?> entityList, int tableID) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public Map<String, List<LookupModel>> getAllRefList() {
        List<ADRefListV> resultList = selectListByNamedQuery("queryAllRef", ADRefListV.class);
        Map<String, List<LookupModel>> lookupMap = Maps.newHashMap();
        if (null != resultList) {
            for (ADRefListV ref : resultList) {
                List<LookupModel> refList = lookupMap.get(ref.getColumnName());
                if (null == refList) {
                    refList = Lists.newArrayList();
                    lookupMap.put(ref.getColumnName(), refList);
                }
                refList.add(new LookupModel(ref.getDisplay(), ref.getValue()));
            }
        }
        return lookupMap;
    }

}
