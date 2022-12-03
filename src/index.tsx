import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./i18n/i18n";
import { Provider } from "react-redux";
import WebFont from "webfontloader";
import store from "./store";
import { PrivateRoute } from "pages/Authentication/PrivateRoute";
import Login from "pages/Authentication/Login/Login";
import { LANDING_PAGE_ROUTE } from "config/route-consts";
import LandingPageView from "views/LandingPageView/LandingPage";
import { SignalRContext } from "app/AppContext";
import signalRService from "services/signalr-service";

WebFont.load({
  google: {
    families: ["Inter"],
  },
});

const app = (
  <Provider store={store}>
    <SignalRContext.Provider value={signalRService}>
      <BrowserRouter>
        <Switch>
          <Route exact path={`/login`} component={Login} />
          <Route exact path={LANDING_PAGE_ROUTE} component={LandingPageView} />
          <PrivateRoute path="/" />
        </Switch>
      </BrowserRouter>
    </SignalRContext.Provider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
