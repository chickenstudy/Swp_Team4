import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserRoutes } from "./routes";
import { AdminRoutes } from "./routes";

export const ApplicationContext = React.createContext([]);

function App() {
  const [user, setUser] = React.useState([]);

  const makeSignIn = (user) => {
    setUser(user);
  };
  const makeSignOut = () => {
    setUser([]);
  };

  return (
    <ApplicationContext.Provider
      value={{ user, setUser, makeSignIn, makeSignOut }}>
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
