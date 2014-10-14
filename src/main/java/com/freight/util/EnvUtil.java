package com.freight.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public final class EnvUtil {

    public static Integer getUser() {
        return 100;
    }

    static SimpleDateFormat fullFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static String currentTimestamp() {
        return fullFormat.format(new Date());
    }

}
