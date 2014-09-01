package com.freight.inject;

import org.directwebremoting.guice.DwrGuiceServletContextListener;
import org.directwebremoting.guice.ParamName;

import com.freight.common.CommonDao;
import com.freight.common.EntityBase;
import com.freight.common.EntityConverter;
import com.freight.common.PageResult;
import com.freight.service.*;
import com.freight.service.impl.*;
import com.google.inject.persist.jpa.JpaPersistModule;

public class AcuityDwrGuiceListener extends DwrGuiceServletContextListener {

    @Override
    protected void configure() {
        install(new JpaPersistModule("acuity"));
        bind(JpaInitializer.class).asEagerSingleton();
        bindConversion(PageResult.class).to(EntityConverter.class);
        bindConversion(EntityBase.class).to(EntityConverter.class);
        bind(CommonDao.class);
        bindRemotedAs("user", UserService.class).to(UserServiceImpl.class);
        bindRemotedAs("order", OrderService.class).to(OrderServiceImpl.class);
        bindParameter(ParamName.DEBUG).to(true);
    }

}
