package com.freight.inject;

import org.directwebremoting.guice.DwrGuiceServletContextListener;
import org.directwebremoting.guice.ParamName;

import com.freight.common.DwrSerializable;
import com.freight.common.EntityBase;
import com.freight.common.EntityConverter;
import com.freight.common.PageResult;
import com.freight.service.FacadeService;
import com.freight.service.OrderService;
import com.freight.service.UserService;
import com.freight.service.impl.FacadeServiceImpl;
import com.freight.service.impl.OrderServiceImpl;
import com.freight.service.impl.UserServiceImpl;
import com.google.inject.persist.jpa.JpaPersistModule;

public class AcuityDwrGuiceListener extends DwrGuiceServletContextListener {

    @Override
    protected void configure() {
        install(new JpaPersistModule("acuity"));
        bind(JpaInitializer.class).asEagerSingleton();
        bindConversion(DwrSerializable.class).to(EntityConverter.class);
        bindConversion(PageResult.class).to(EntityConverter.class);
        bindConversion(EntityBase.class).to(EntityConverter.class);
        bind(UserService.class).to(UserServiceImpl.class);
        bind(OrderService.class).to(OrderServiceImpl.class);
        bindRemotedAs("facade", FacadeService.class).to(FacadeServiceImpl.class);
        bindParameter(ParamName.DEBUG).to(true);
    }

}
