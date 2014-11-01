package com.freight.service.impl;

import java.util.List;

import com.freight.enums.InoutType;
import com.freight.model.CInout;
import com.freight.model.CInoutLine;
import com.freight.model.CInventory;
import com.freight.model.CMove;
import com.freight.model.CMoveLine;
import com.freight.model.COrder;
import com.freight.model.COrderLine;
import com.freight.service.AbstractService;
import com.freight.service.InventoryService;
import com.freight.util.EnvUtil;

public class InventoryServiceImpl extends AbstractService implements InventoryService {

    @Override
    public CInventory inbound(COrder order, COrderLine line) {
        CInventory inv = new CInventory();
        inv.setCOrderID(order.getCOrderID());
        inv.setCOrderLineID(line.getCOrderLineID());
        // TODO 获取入库仓库逻辑
        inv.setCWarehouseID(101);
        persistAndFlush(inv);

        CInout in = new CInout();
        in.setCOrderID(order.getCOrderID());
        in.setTimeInouted(EnvUtil.currentTimestamp());
        in.setInoutTypeEnum(InoutType.OrderIn);
        in.setTotalAmount(line.getAmount());
        in.setTotalWeight(line.getWeight());
        in.setTotalVolume(line.getVolume());
        // TODO 开单员
        in.setSignedUserID(100);
        // TODO 获取入库仓库逻辑
        in.setCWarehouseID(101);
        persistAndFlush(in);

        CInoutLine inLine = new CInoutLine();
        inLine.setCInoutID(in.getCInoutID());
        inLine.setCOrderID(order.getCOrderID());
        inLine.setCOrderLineID(line.getCOrderLineID());
        inLine.setTargetQty(line.getAmount());
        inLine.setConfirmedQty(line.getAmount());
        persistAndFlush(inLine);
        return inv;
    }

    @Override
    public CInventory inbound(COrder order, COrderLine line, CInout inout) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void inbound(CMove move, List<CMoveLine> lineList) {
        // TODO Auto-generated method stub

    }

    @Override
    public void inbound(CMove move, List<CMoveLine> lineList, CInout inout, List<CInoutLine> inoutList) {
        // TODO Auto-generated method stub

    }

    @Override
    public void outbound(CMove move, List<CMoveLine> lineList) {
        // TODO Auto-generated method stub

    }

    @Override
    public void outbound(CMove move, List<CMoveLine> lineList, CInout inout, List<CInoutLine> inoutList) {
        // TODO Auto-generated method stub

    }

    @Override
    public void outbound(CInventory inventory) {
        // TODO Auto-generated method stub

    }

    @Override
    public void outbound(CInventory inventory, CInout inout) {
        // TODO Auto-generated method stub

    }

    @Override
    public void freeze(CInventory inventory) {
        // TODO Auto-generated method stub

    }

}
