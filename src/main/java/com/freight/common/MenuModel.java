package com.freight.common;

import java.util.ArrayList;
import java.util.List;

import com.freight.model.ADMenu;
import com.freight.model.ADTree;

public class MenuModel implements DwrSerializable {
	private static final long serialVersionUID = 1L;
	private String treeName;
	private String treeType;
	private String iconClass;
	private List<ItemModel> items;

	public MenuModel() {
	}

	public MenuModel(ADTree tree) {
		this.treeName = tree.getName();
		this.treeType = tree.getTreeType();
		this.iconClass = tree.getIconClass();
		List<ADMenu> menuList = tree.getADMenus();
		if (null != menuList) {
			items = new ArrayList<>();
			for (ADMenu adMenu : menuList) {
				items.add(new ItemModel(adMenu));
			}
		}
	}

	public List<ItemModel> getItems() {
		return items;
	}

	public void setItems(List<ItemModel> items) {
		this.items = items;
	}

	public String getTreeName() {
		return treeName;
	}

	public void setTreeName(String treeName) {
		this.treeName = treeName;
	}

	public String getTreeType() {
		return treeType;
	}

	public void setTreeType(String treeType) {
		this.treeType = treeType;
	}

	public String getIconClass() {
		return iconClass;
	}

	public void setIconClass(String iconClass) {
		this.iconClass = iconClass;
	}

	static class ItemModel implements DwrSerializable {
		private static final long serialVersionUID = 1L;
		private String action;
		private String formPrototype;
		private Integer windowID;
		private String itemName;
		private String image;
		private Integer seqNo;

		public ItemModel(ADMenu menu) {
			this.formPrototype = menu.getFormPrototype();
			this.action = menu.getAction();
			this.windowID = menu.getAdWindowId();
			this.itemName = menu.getName();
			this.image = menu.getImage();
			this.seqNo = menu.getSeqNo();
		}

		public Integer getSeqNo() {
			return seqNo;
		}

		public void setSeqNo(Integer seqNo) {
			this.seqNo = seqNo;
		}

		public String getAction() {
			return action;
		}

		public void setAction(String action) {
			this.action = action;
		}

		public String getFormPrototype() {
			return formPrototype;
		}

		public void setFormPrototype(String formPrototype) {
			this.formPrototype = formPrototype;
		}

		public Integer getWindowID() {
			return windowID;
		}

		public void setWindowID(Integer windowID) {
			this.windowID = windowID;
		}

		public String getItemName() {
			return itemName;
		}

		public void setItemName(String itemName) {
			this.itemName = itemName;
		}

		public String getImage() {
			return image;
		}

		public void setImage(String image) {
			this.image = image;
		}
	}

}
