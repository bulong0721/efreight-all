package com.freight.service;

import java.util.Map;

import com.freight.common.PageResult;
import com.freight.model.ADUser;

public interface UserService {

    PageResult<ADUser> search(Map<String, String> paramMap);

}
