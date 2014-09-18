package com.freight.service;

import java.util.List;
import java.util.Map;

import com.freight.common.*;
import com.freight.model.ADUser;
import com.freight.model.COrder;

public interface FacadeService {

    PageResult<COrder> searchOrder(Map<String, String> paramMap);

    PageResult<ADUser> searchUser(Map<String, String> paramMap);

    WindowModel getWindowModel(int tabID);
    
    Map<String, List<LookupModel>> getAllRefList();
    
    PageResult<?> search4Window(Map<String, String> paramMap, Integer tableID);
    
    boolean create4Window(List<?> entityList, int tableID);
    
    boolean update4Window(List<?> entityList, int tableID);
    
    boolean delete4Window(List<?> entityList, int tableID);
}
