package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.model.roles.UserRolesDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;

public class RoleMapper {
    public static UserRolesDTOResponse toUserRoleDTOResponse(Roles roles){
        return UserRolesDTOResponse.builder().
        roleId(roles.getRoleid()).
        roleName(roles.getRolename()).
        build();
    }
}
