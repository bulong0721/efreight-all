package com.freight.service;

import java.util.List;

import com.freight.model.*;

public interface InventoryService {

    CInventory inbound(COrder order, COrderLine line);

    CInventory inbound(COrder order, COrderLine line, CInout inout);

    void inbound(CMove move, List<CMoveLine> lineList);

    void inbound(CMove move, List<CMoveLine> lineList, CInout inout, List<CInoutLine> inoutList);

    void outbound(CMove move, List<CMoveLine> lineList);

    void outbound(CMove move, List<CMoveLine> lineList, CInout inout, List<CInoutLine> inoutList);

    void outbound(CInventory inventory);

    void outbound(CInventory inventory, CInout inout);

    void freeze(CInventory inventory);
}
