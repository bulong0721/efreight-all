package org.acuity;

import java.io.IOException;

import org.apache.openjpa.jdbc.meta.ReverseMappingTool;

public class JPAGeneratorTestes {

    public static void main(String[] args) throws IOException {
        try {
            String path = "d:/acuity_home/entity";
            String jpaArg = "-no false -fkn false -cc org.acuity.AcuityCustomizer -cp adempiere.properties -pkj false -d "
                            + path
                            + " -is PK -ann true -md none -inn false -pkg com.acuity.model -ir false -access property";
            // jpaArg += " -s " + "ad_table";
            String[] jpaArgs = jpaArg.split(" ");
            ReverseMappingTool.main(jpaArgs);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void print(int... values) {
        for (int i : values) {
            System.out.println(i);
        }
    }

}
