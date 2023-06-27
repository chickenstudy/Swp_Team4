import React, { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { ApplicationContext } from "../../App";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Account() {
  const { user, makeSignOut } = useContext(ApplicationContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const setting = ["Profile", "Log out"];

  return (
    <Container sx={{ flexGrow: 0 }}>
      <Tooltip title={user.username}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="A hihi "
            // src="https://www.ldg.com.vn/media/uploads/uploads/16210423-gai-xinh-bikini-do-0001-0001.jpg"
            src={user.picture}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "30px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              Profile
            </Link>
            <Typography onClick={makeSignOut}>Log Out</Typography>
          </Typography>
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default Account;
// <>
//   <ButtonGroup variant="light">
//     <DropdownButton
//       as={ButtonGroup}
//       title={
//         <>
//           <i className="bi bi-person-circle mr-2"></i>
//         </>
//       }
//       drop="down"
//     >
//       <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
//       <Dropdown.Item eventKey="2" onClick={makeSignOut}>
//         Log out
//       </Dropdown.Item>
//     </DropdownButton>
//   </ButtonGroup>
// </>
