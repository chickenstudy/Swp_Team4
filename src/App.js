import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {UserRoutes} from './routes';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
        {UserRoutes.map((route, index) => {
            const Layout = route.layout
            const Page = route.component;
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
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
