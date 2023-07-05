package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.rowset.serial.SerialException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.roles.UserRolesDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOCreateAccount;

import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;

import com.namnguyenmoihoc.realworldapp.repository.RoleRepository;
import com.namnguyenmoihoc.realworldapp.repository.UserRepository;
import com.namnguyenmoihoc.realworldapp.service.UserService;
import com.namnguyenmoihoc.realworldapp.util.JWTTokenUtil;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {
    @InjectMocks
    UserServiceImpl userServiceImpl;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JWTTokenUtil jwtTokenUtil;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserService userService;

    @Mock
    private RoleRepository roleRepository;

    @Test
    void testAuthenticate() {

    }

    @Test
    void testGetCurrentUser() {

    }

    @Test
    void testGetProfile() {

    }

    @Test
    void testGetRole() {
        // mock data
        Roles role1 = new Roles();
        role1.setRoleid(1);
        role1.setRolename("Admin");

        Roles role2 = new Roles();
        role2.setRoleid(2);
        role2.setRolename("Staff");

        Roles role3 = new Roles();
        role2.setRoleid(3);
        role2.setRolename("User");

        List<Roles> roles = new ArrayList<>();
        roles.add(role1);
        roles.add(role2);
        roles.add(role3);

        // set up mock behavior
        when(roleRepository.findAll()).thenReturn(roles);

        // call the service method
        List<UserRolesDTOResponse> result = userService.getRole();

        // assert the result
        assertEquals(3, result.size());
        assertEquals("User", result.get(1).getRoleName());
        assertEquals("Admin", result.get(3).getRoleName());
        assertEquals("Staff", result.get(2).getRoleName());

    }

    @Test
    void testGetUpdateAccount() {

    }

    @Test
    void testRegisterUser() throws ParseException, SerialException, CustomNotFoundException, SQLException, IOException {

        // given
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        UserDTOCreateAccount userDTOCreateAccount = UserDTOCreateAccount.builder().address("address")
                .dob(format.parse("2023-05-31")).email("username@gmail.com").password("password").phoneNumber("0345234")
                .picture("picture").sex((byte) 0).username("user").build();
        Map<String, UserDTOCreateAccount> userDTOCreateAcountMap = new HashMap<>();
        userDTOCreateAcountMap.put("user", userDTOCreateAccount);

        Optional<Account> userOptional = Optional.of(Account.builder().email("username@gmail.com").build());
        Map<String, UserDTOResponse> expected = new HashMap<>();

        UserDTOResponse userDTOResponseExpected = UserDTOResponse.builder().username("user")
                .email("username@gmail.com").roleID(3).token("TOKEN").build();
        expected.put("user", userDTOResponseExpected);
        // when
        when(userRepository.findByEmail(userDTOCreateAccount.getEmail())).thenReturn(userOptional);
        Map<String, UserDTOResponse> actual = userService.registerUser(userDTOCreateAcountMap);

        // then
        assertEquals(true, actual.containsKey("user"));

        UserDTOResponse userDTOResponseActual = actual.get("user");

        assertEquals(userDTOResponseExpected.getUsername(), userDTOResponseActual.getUsername());
        assertEquals(userDTOResponseExpected.getEmail(), userDTOResponseActual.getEmail());

    }
}
