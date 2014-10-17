package com.freight.util;

import java.util.ArrayList;
import java.util.List;

import com.freight.common.*;
import com.freight.model.*;

public final class DTOUtil {

    public static WindowModel toWindowModel(ADWindow window, List<ADFieldV> fieldList) {
        if (null == window) {
            return null;
        }
        WindowModel winModel = toWindowModel(window);
        List<FieldModel> fields = toFieldModels(fieldList);
        winModel.setFields(fields);
        return winModel;
    }

    public static WindowModel toWindowModel(ADWindow entity) {
        WindowModel model = new WindowModel();
        model.setName(entity.getName());
        model.setTableID(entity.getADTableID());
        model.setInfoTab(entity.isInfoTab());
        return model;
    }

    public static FieldModel toFieldModel(ADFieldV entity) {
        FieldModel model = new FieldModel();
        model.setLabel(entity.getName());
        model.setFieldName(entity.getPropertyName());
        model.setDefaultValue(entity.getDefaultValue());
        model.setValueMax(entity.getValueMax());
        model.setValueMin(entity.getValueMin());
        model.setVformat(entity.getVformat());
        model.setSeqNo(entity.getSeqNo());
        model.setRefType(entity.getADReferenceID());
        model.setRefValueID(entity.getADReferenceValueID());
        model.setDisplayLength(entity.getDisplayLength());
        model.setDisplayed(entity.isDisplayed());
        model.setFieldOnly(entity.isFieldOnly());
        model.setIdentifier(entity.isIdentifier());
        model.setMandatory(entity.isMandatory());
        model.setPrimaryKey(entity.isParimayKey());
        model.setReadonly(entity.isReadonly());
        model.setSelection(entity.isSelectionColumn());
        model.setColumnName(entity.getColumnName());
        return model;
    }

    public static List<FieldModel> toFieldModels(List<ADFieldV> fieldList) {
        int size = null == fieldList ? 0 : fieldList.size();
        List<FieldModel> resultList = new ArrayList<FieldModel>(size);
        if (null != fieldList) {
            for (ADFieldV fieldEntity : fieldList) {
                resultList.add(toFieldModel(fieldEntity));
            }
        }
        return resultList;
    }

	public static List<FieldModel> convert2FieldList(List<ADColumn> columns) {
		 int size = null == columns ? 0 : columns.size();
	        List<FieldModel> resultList = new ArrayList<FieldModel>(size);
	        if (null != columns) {
	            for (ADColumn fieldEntity : columns) {
	                resultList.add(convertToField(fieldEntity));
	            }
	        }
	        return resultList;
	}

	private static FieldModel convertToField(ADColumn entity) {
		FieldModel model = new FieldModel();
        model.setLabel(entity.getName());
        model.setFieldName(entity.getPropertyName());
        model.setDefaultValue(entity.getDefaultValue());
        model.setValueMax(entity.getValueMax());
        model.setValueMin(entity.getValueMin());
        model.setVformat(entity.getVformat());
        model.setSeqNo(entity.getSeqNo());
        model.setRefType(entity.getADReferenceID());
        model.setRefValueID(entity.getADReferenceValueID());
        model.setIdentifier(entity.isIdentifier());
        model.setMandatory(entity.isMandatory());
        model.setPrimaryKey(entity.isParimayKey());
        model.setSelection(entity.isSelectionColumn());
        model.setColumnName(entity.getColumnName());
        return model;
	}
}
