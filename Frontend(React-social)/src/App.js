import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StaffRoutes, UserRoutes, AdminRoutes } from "./routes";
import axios from "axios";
import { ToastContainer } from "react-bootstrap";

export const ApplicationContext = React.createContext([]);

function App() {
  useEffect(() => {
    const jwt = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/banner/listBanner")
      .then((response) => {
        const activeBanners = response.data
          .filter((banner) => banner.active == 1)
          .map((banner) => {
            return { id: banner.bannerid, content: banner.picture };
          });
        setBanners(activeBanners);
      })
      .catch((error) => console.log(error));

    if (jwt != null) {
      axios
        .get("http://localhost:8080/api/user/currentUser", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          sessionStorage.setItem("roleId", response.data.user.roleID);
          localStorage.setItem("token", response.data.user.token);
          setUser(response.data.user);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const [banners, setBanners] = React.useState([]);

  const [user, setUser] = React.useState([]);

  localStorage.setItem("email", user.email);
  const makeSignIn = (user) => {
    setUser(user);
  };
  const makeSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("roleId");
    setUser([]);
  };
  const roleID = sessionStorage.getItem("roleId");
  return (
    <ApplicationContext.Provider
      value={{ user, setUser, makeSignIn, makeSignOut, banners, setBanners }}
    >
      <div style={{ backgroundColor: "rgb(246, 241, 241)" }}>
        <React.Fragment>
          <BrowserRouter>
            <Routes>
              {UserRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = route.layout;

                if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}

              {AdminRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = route.layout;

                if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    // element={
                    //   <Layout>
                    //     <Page />
                    //   </Layout>
                    // }

                    element={
                      roleID == 1 && route.isProtected ? ( // Check if user is authenticated
                        <Layout>
                          <Page />
                        </Layout>
                      ) : (
                        <Navigate to="/" /> // Redirect to login page if user is not authenticated
                      )
                    }
                  />
                );
              })}
              {StaffRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = route.layout;

                if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    // element={
                    //   <Layout>
                    //     <Page />
                    //   </Layout>
                    // }
                    element={
                      roleID == 2 && route.isProtected ? ( // Check if user is authenticated
                        <Layout>
                          <Page />
                        </Layout>
                      ) : (
                        <Navigate to="/" /> // Redirect to login page if user is not authenticated
                      )
                    }
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </React.Fragment>
        <ToastContainer />
      </div>
    </ApplicationContext.Provider>
  );
}

export default App;
