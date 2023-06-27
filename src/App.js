import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserRoutes } from "./routes";
import { AdminRoutes } from "./routes";
import { useEffect } from "react";
import axios from "axios";

export const ApplicationContext = React.createContext([]);

function App() {
  useEffect(() => {
    const jwt = sessionStorage.getItem("token");
    if (jwt != null) {
      axios
        .post("http://localhost:8080/api/bootstrap", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const [user, setUser] = React.useState([]);

  const makeSignIn = (user) => {
    setUser(user);
  };
  console.log(user);
  const makeSignOut = () => {
    setUser([]);
  };

  return (
    <ApplicationContext.Provider
      value={{ user, setUser, makeSignIn, makeSignOut }}
    >
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
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }

                  // element={
                  //   user.roleID == 1 && route.isProtected ? ( // Check if user is authenticated
                  //     <Layout>
                  //       <Page />
                  //     </Layout>
                  //   ) : (
                  //     <Navigate to="/" /> // Redirect to login page if user is not authenticated
                  //   )
                  // }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </ApplicationContext.Provider>
  );
}

export default App;
