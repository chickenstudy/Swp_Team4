package com.namnguyenmoihoc.realworldapp.model.roles;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRolesDTOResponse {
    private int roleId;
    private String roleName;
}
