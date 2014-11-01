package com.freight.inject;

import org.directwebremoting.guice.DwrGuiceServletContextListener;
import org.directwebremoting.guice.ParamName;

import com.freight.common.*;
import com.freight.service.*;
import com.freight.service.impl.*;
import com.google.inject.persist.jpa.JpaPersistModule;

public class DwrGuiceListener extends DwrGuiceServletContextListener {

    @Override
    protected void configure() {
        install(new JpaPersistModule("freight"));
        bind(JpaInitializer.class).asEagerSingleton();
        bindConversion(DwrSerializable.class).to(EntityConverter.class);
        bindConversion(PageResult.class).to(EntityConverter.class);
        bindConversion(EntityBase.class).to(EntityConverter.class);
        bind(InoutService.class).to(InoutServiceImpl.class);
        bind(InventoryService.class).to(InventoryServiceImpl.class);
        bindRemotedAs("facade", FacadeService.class).to(FacadeServiceImpl.class);
        bindParameter(ParamName.DEBUG).to(true);
    }

}
