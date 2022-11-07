import React, { Component, Fragment } from "react";
import { Provider as ReduxProvider } from "react-redux";
import LoginPage from "./components/Auth/lg";
import RegisterPage from "./components/Auth/rs";

import { Notification } from "./components/Home/Notification";
import { useConstructor } from "./hooks";
import { initServices, IServices, ServicesContext } from "./models/Services";
import { store } from "./redux/store";

import "semantic-ui-css/semantic.min.css";
import "./globals.css";
import Header from "src/components/BaseUtils/tre/NvBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MainView } from "./components/MainView";
import { ArticleView } from "./components/Article/ArticleView";
import { ArticleEditor } from "./components/Article/ArticleEditor";
import { SettingEditor } from "./components/Home/SettingEditor";
import { Loader } from "./components/Home/Loader";
import { ToastProvider } from "react-toast-notifications";
import { NotFound } from "./components/Home/NotFound";
import { Profile } from "./components/Home/Profile";
import { Work } from "./components/Work/Work";

import { GuardRouter } from "./GuardRouter";
import { PersonalCenter } from "./components/PersonalCenter/PersonalCenter";
import AnimationRevealPage from "src/components/BaseUtils/tre/AnimationRevealPage.js";
import {
  Container,
  Content2Xl,
  ContentWithVerticalPadding,
} from "src/components/BaseUtils/tre/Layouts";

function App() {
  let services: IServices;

  useConstructor(() => {
    services = initServices();
  });

  return (
    <AnimationRevealPage>
      <Container tw="bg-gray-100 -mx-8 -mt-8 pt-8 px-8">
        <Content2Xl>
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
                        <Route path="/work">
                          <Work />
                        </Route>
                        <Route
                          path="/pcenter/:username"
                          component={PersonalCenter}
                          exact
                        />

                        <Route
                          path="/profile/:username"
                          component={Profile}
                          exact
                        />
                        <Route
                          path="/setting"
                          component={SettingEditor}
                          exact
                        />
                        <Route path="/login" component={LoginPage}></Route>
                        <Route
                          path="/register"
                          component={RegisterPage}
                        ></Route>
                        <Route path="/article/edit/:slug?" exact>
                          <ArticleEditor />
                        </Route>
                        <Route path="/article/:slug" exact>
                          <ArticleView />
                        </Route>
                        <Route path="/" exact>
                          <GuardRouter Comp={MainView} />
                        </Route>
                        <Route component={NotFound} />
                      </Switch>
                      {/* </header> */}
                      {/* <Footer /> */}
                    </div>
                  </Fragment>
                </ServicesContext.Provider>
              </ToastProvider>
            </ReduxProvider>
          </Router>
        </Content2Xl>
      </Container>
    </AnimationRevealPage>
  );
}

export default App;
