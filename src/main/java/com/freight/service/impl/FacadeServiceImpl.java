package com.freight.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.freight.common.*;
import com.freight.model.*;
import com.freight.service.*;
import com.freight.util.DTOUtil;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.inject.persist.Transactional;

public class FacadeServiceImpl extends AbstractService implements FacadeService {

	private static Map<Integer, Class<?>> tableMap;
	static {
		tableMap = new HashMap<>();
		tableMap.put(117, CMove.class/* 发车管理 */);
		tableMap.put(110, CBPartner.class/* 合作伙伴管理 */);
		tableMap.put(105, ADField.class/* 字段管理 */);
		tableMap.put(100, ADClient.class/* 客户管理 */);
		tableMap.put(115, CInventory.class/* 库存管理 */);
		tableMap.put(108, ADUser.class/* 用户管理 */);
		tableMap.put(104, ADWindow.class/* 窗体管理 */);
		tableMap.put(101, ADOrg.class/* 组织管理 */);
		tableMap.put(123, CVehicle.class/* 车辆管理 */);
		tableMap.put(120, COrder.class/* 运单管理 */);
		tableMap.put(113, CInout.class/* 配送自提 */);
	}

	@Override
	public WindowModel getWindowModel(int windowID) {
		Map<String, Object> paramMap = toMap("windowID", windowID);
		ADWindow window = selectOneByNamedQuery("queryWindowByID",
				ADWindow.class, paramMap);
		List<ADFieldV> fieldList = selectListByNamedQuery(
				"queryFieldVByWindow", ADFieldV.class, paramMap);
		return DTOUtil.toWindowModel(window, fieldList);
	}

	@Override
	public PageResult<?> search4Window(Map<String, String> paramMap,
			Integer tableID) {
		Class<?> entityClass = tableMap.get(tableID);
		if (null == entityClass) {
			entityClass = ADUser.class;
		}
		return search(entityClass, paramMap);
	}

	@Transactional
	public boolean create4Window(String entityText, int tableID) {
		Class<?> entityClass = tableMap.get(tableID);
		List<?> entityList = JSON.parseArray(entityText, entityClass);
		persistAll(entityList);
		return true;
	}

	@Transactional
	public boolean update4Window(String entityText, int tableID) {
		Class<?> entityClass = tableMap.get(tableID);
		List<?> entityList = JSON.parseArray(entityText, entityClass);
		mergeAll(entityList);
		return true;
	}

	@Transactional
	public boolean delete4Window(String entityText, int tableID) {
		Class<?> entityClass = tableMap.get(tableID);
		List<?> entityList = JSON.parseArray(entityText, entityClass);
		removeAll(entityList);
		return true;
	}

	@Override
	public Map<String, List<LookupModel>> getAllRefList() {
		List<ADRefListV> resultList = selectListByNamedQuery("queryAllRef",
				ADRefListV.class);
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

	@Override
	public PageResult<?> lookup4Table(Map<String, String> paramMap,
			Integer refValueID) {
		ADRefTable refTable = find(ADRefTable.class, refValueID);
		if (null == refTable) {
			return null;
		}
		boolean metaDemand = Boolean.parseBoolean(paramMap.get("metaDemand"));
		int offset = Integer.parseInt(paramMap.get(PARAM_START));
		int limit = Integer.parseInt(paramMap.get(PARAM_LIMIT));
		String rawValue = paramMap.get("rawValue");
		Class<?> entityClass = tableMap.get(refTable.getADTableID());
		List<?> rows = selectListByNamedQuery(refTable.getQueryName(),
				entityClass, toMap("filter", '%' + rawValue + '%'), offset,
				limit);
		PageResult<?> result = new PageResult<>(rows, rows.size());
		if (metaDemand) {
			List<ADColumn> columns = selectListByNamedQuery(
					"queryLookupColumnsByTable", ADColumn.class,
					toMap("tableID", refTable.getADTableID()));
			result.setLookupTable(new LookupTable(refTable, columns));
		}
		return result;
	}

	@Override
	@Transactional
	public boolean saveOrder(String entityText) {
		COrder order = JSON.parseObject(entityText, COrder.class);
		Integer orderID = order.getCOrderID();
		initEntity(order);
		if (null == orderID) {
			em.persist(order);
			em.flush();
		} else {
			em.merge(order);
		}
		orderID = order.getCOrderID();
		COrderLine orderLine = JSON.parseObject(entityText, COrderLine.class);
		orderLine.setCOrderID(orderID);
		orderLine.setLineNo(1);
		initEntity(orderLine);
		em.merge(orderLine);
		return false;
	}

	@Override
	@Transactional
	public int saveMove(String entityText) {
		CMove cMove = JSON.parseObject(entityText, CMove.class);
		initEntity(cMove);
		CMove mergeMove = em.merge(cMove);
		em.flush();
		return mergeMove.getCMoveID();
	}

	@Override
	public PageResult<?> searchInventory(Map<String, String> paramMap) {
		int offset = Integer.parseInt(paramMap.get(PARAM_START));
		int limit = Integer.parseInt(paramMap.get(PARAM_LIMIT));
		Integer departOrgID = Integer.parseInt(paramMap.get("departOrgID"));
		Integer destOrgID = Integer.parseInt(paramMap.get("destOrgID"));
		Map<String, Object> queryMap = toMap("ownerOrgID", departOrgID);
		queryMap.put("destOrgID", destOrgID);
		List<?> rows = selectListByNamedQuery("queryInventory",
				CInventoryV.class, queryMap, offset, limit);
		return new PageResult<>(rows, rows.size());
	}

	@Override
	public PageResult<?> searchMoveline(Map<String, String> paramMap) {
		int offset = Integer.parseInt(paramMap.get(PARAM_START));
		int limit = Integer.parseInt(paramMap.get(PARAM_LIMIT));
		Integer moveID = Integer.parseInt(paramMap.get("moveID"));
		Map<String, Object> queryMap = toMap("moveID", moveID);
		List<?> rows = selectListByNamedQuery("queryMoveline",
				CInventoryV.class, queryMap, offset, limit);
		return new PageResult<>(rows, rows.size());
	}

	@Override
	@Transactional
	public void deleteMoveline(String entityText) {
		List<?> entityList = JSON.parseArray(entityText, CMoveLine.class);
		removeAll(entityList);
	}

	@Override
	@Transactional
	public void createMoveline(String entityText) {
		List<?> entityList = JSON.parseArray(entityText, CMoveLine.class);
		persistAll(entityList);
	}

	@Override
	public PageResult<?> getMenuItems() {
		List<ADTree> trees = selectListByNamedQuery("queryMenuItem", ADTree.class);
		List<MenuModel> resultList = new ArrayList<>();
		if (null != trees) {
			for (ADTree tree : trees) {
				resultList.add(new MenuModel(tree));
			}
		}
		return new PageResult<>(resultList, resultList.size());
	}

}
