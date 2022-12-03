import App from "app/App";
import { userRoutes } from "config/routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export const PrivateRoute = ({ ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <React.Suspense fallback={null}>
          <App>
            <Switch>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                render={() => {
                  return (
                    <Redirect to={`${process.env.PUBLIC_URL}/landing-page`} />
                  );
                }}
              />
              {userRoutes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  render={(props) => {
                    return <Component />;
                  }}
                ></Route>
              ))}
            </Switch>
          </App>
        </React.Suspense>
      );
    }}
  />
);
