import React, { useEffect } from "react";
import SideBar from "../components/admin/sidebar/SideBar";
import Header from "../components/admin/header/Header";
import "./layout.css";
import { ApplicationContext } from "../App";
import { useNavigate } from "react-router-dom";

function AdminLayout({ className = "container-fluid row", children }) {
  // const { user } = React.useContext(ApplicationContext);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(user.roleID);
  //   if (user.roleID != 1) {
  //     navigate("/");
  //   }
  // }, []);

  //[]: gọi hàm khi compnent được load lần đầu tiên

  return (
    <div className="wrapper">
      <Header />
      <div className="body">
        <SideBar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
