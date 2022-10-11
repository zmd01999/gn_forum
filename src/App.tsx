import React, { Component, Fragment } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Login from "./components/Auth/Login";
import { Notification } from "./components/Home/Notification";
import { useConstructor } from "./hooks";
import { initServices, IServices, ServicesContext } from "./models/Services";
import { store } from "./redux/store";

import "semantic-ui-css/semantic.min.css";
import { Header } from "./components/Home/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Footer } from "./components/Home/Footer";
import { MainView } from "./components/MainView";
import { ArticleView } from "./components/Article/ArticleView";
import { ArticleEditor } from "./components/Article/ArticleEditor";
import { SettingEditor } from "./components/Home/SettingEditor";
import { Loader } from "./components/Home/Loader";
import { ToastProvider } from "react-toast-notifications";
import { Register } from "./components/Auth/Register";
import { NotFound } from "./components/Home/NotFound";
import { Profile } from "./components/Home/Profile";
import { GuardRouter } from "./GuardRouter";

function App() {
  let services: IServices;

  useConstructor(() => {
    services = initServices();
  });

  return (
    <Router>
      <ReduxProvider store={store}>
        <ToastProvider
          autoDismiss={true}
          autoDismissTimeout={2500}
          placement={"top-center"}
        >
          <ServicesContext.Provider value={services!}>
            <Fragment>
              <Notification />
              <div className="App">
                <Loader />
                {/* <header className="App-header"> */}
                <GuardRouter Comp={Header} />
                <Switch>
                  <Route path="/" exact>
                    <GuardRouter Comp={MainView} />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/register">
                    <Register />
                  </Route>
                  <Route path="/article/edit/:slug?" exact>
                    <ArticleEditor />
                  </Route>
                  <Route path="/article/:slug" exact>
                    <ArticleView />
                  </Route>
                  <Route path="/profile/:username" component={Profile} exact />
                  <Route path="/setting" component={SettingEditor} exact />
                  <Route component={NotFound} />
                </Switch>
                {/* </header> */}
                <Footer />
              </div>
            </Fragment>
          </ServicesContext.Provider>
        </ToastProvider>
      </ReduxProvider>
    </Router>
  );
}

export default App;
