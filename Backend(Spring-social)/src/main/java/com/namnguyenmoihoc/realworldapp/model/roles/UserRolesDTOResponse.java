package com.namnguyenmoihoc.realworldapp.model.roles;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRolesDTOResponse {
    private int roleId;
    private String roleName;
}
