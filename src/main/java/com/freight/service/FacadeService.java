package com.freight.service;

import java.util.Map;

import com.freight.common.PageResult;
import com.freight.common.WindowModel;

public interface FacadeService {

	WindowModel getWindowModel(int windowID);

	PageResult<?> getAllRefList();

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

    PageResult<?> getMenuItems();

}
