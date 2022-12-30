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
import { NewAView } from "./components/Article/NewAView";

import { ArticleEditor } from "./components/Article/ArticleEditor";
import { SettingEditor } from "./components/Home/SettingEditor";
import { Loader } from "./components/Home/Loader";
import { ToastProvider } from "react-toast-notifications";
import { NotFound } from "./components/Home/NotFound";
import { Profile } from "./components/PersonalCenter/Profile";
import { Work } from "./components/Work/Work";
import Privacy_1 from "./components/Auth/Privacy_1";
import { GuardRouter } from "./GuardRouter";
import { PersonalCenter } from "./components/PersonalCenter/PersonalCenter";
import AnimationRevealPage from "src/components/BaseUtils/tre/AnimationRevealPage.js";
import {
  Container,
  Content2Xl,
  ContentWithVerticalPadding,
} from "src/components/BaseUtils/tre/Layouts";
import Footer from "src/components/Home/foot";
import { WorkDetail } from "./components/Work/WorkDetail";
import { MainPage } from "./components/Home/MainPage";
import { ProjectRes } from "./components/Home/ProjectRes";
import { ForumRes } from "./components/Home/ForumRes";
import { Private_1 } from "./components/Auth/Private_1";
import Privacy_3 from "./components/Auth/Privacy_3";
import Privacy_2 from "./components/Auth/Privacy_2";
import { MsgPC } from "./components/PersonalCenter/MsgPC";
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
                        <Route path="/" exact>
                          <MainPage />
                        </Route>
                        <Route path="/work/search/:slug" exact>
                          <ProjectRes></ProjectRes>
                        </Route>
                        <Route path="/article/search/:slug" exact>
                          <ForumRes />
                        </Route>
                        <Route path="/work" exact>
                          <Work />
                        </Route>
                        <Route path="/msgcenter/:slug" exact>
                          <MsgPC />
                        </Route>
                        <Route path="/work/:slug" component={WorkDetail} />
                        <Route
                          path="/pcenter/:username"
                          component={PersonalCenter}
                          exact
                        />
                        <Route path="/privacy/1" exact>
                          <Privacy_1 />
                        </Route>
                        <Route path="/privacy/2" exact>
                          <Privacy_2 />
                        </Route>
                        <Route path="/privacy/3" exact>
                          <Privacy_3 />
                        </Route>
                        <Route
                          path="/profile/:slug"
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
                          {/* <ArticleView /> */}
                          <NewAView></NewAView>
                        </Route>

                        <Route path="/forum" exact>
                          <GuardRouter Comp={MainView} />
                        </Route>
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
        </Content2Xl>
      </Container>
    </AnimationRevealPage>
  );
}

export default App;
