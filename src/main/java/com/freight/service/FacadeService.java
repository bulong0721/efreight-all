package com.freight.service;

import java.util.List;
import java.util.Map;

import com.freight.common.*;
import com.freight.model.ADUser;
import com.freight.model.COrder;

public interface FacadeService {

	PageResult<COrder> searchOrder(Map<String, String> paramMap);

	PageResult<ADUser> searchUser(Map<String, String> paramMap);

	WindowModel getWindowModel(int windowID);

	Map<String, List<LookupModel>> getAllRefList();

	PageResult<?> search4Window(Map<String, String> paramMap, Integer tableID);

	boolean create4Window(String entityText, int tableID);

	boolean update4Window(String entityText, int tableID);

	boolean delete4Window(String entityText, int tableID);

	PageResult<?> lookup4Table(Map<String, String> paramMap, Integer refValueID);

	boolean saveOrder(String entityText);

	int saveMove(String entityText);

	PageResult<?> searchInventory(Map<String, String> paramMap);

	PageResult<?> searchMoveline(Map<String, String> paramMap);

	void deleteMoveline(String entityText);

	void createMoveline(String entityText);

}
