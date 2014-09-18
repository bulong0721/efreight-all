package org.freight;

import java.util.ArrayList;
import java.util.List;

public class FreightDB {

    public final static List<ViewTable> tables = new ArrayList<>();

    public static void clear() {
        tables.clear();
    }
}
