package com.freight.service;

import java.util.Map;

import com.freight.common.PageResult;
import com.freight.model.CUser;

public interface UserService {

    PageResult<CUser> search(Map<String, String> paramMap);

}
