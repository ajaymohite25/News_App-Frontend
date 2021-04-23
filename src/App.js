import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/SignIn";
import Savednews from "./components/SavedNews";
import News from "./components/News";
import Navbar from "./components/navBar";
import Page404 from "./components/page404";
import Store from "./redux/store";
import axios from "./axios";
import {
  loginAuthAction,
  logoutAuthAction,
} from "./redux/ActionCreator/authAction";

function App() {
  const [isLoaded, setLoaded] = useState(false);
  // const [isLogin, setLogin] = useState(false);
  // console.log("kkk");
  function onAuthChange() {
    // console.log("c");
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const email = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getEmail();
      const name = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getName();
      // console.log(email, name, "1");
      axios({
        url: "/signin",
        method: "POST",
        data: { name: name, email: email },
      })
        .then((data) => {
          const name = data.data.name;
          const jwt = data.data.jwt;
          const refreshtoken = data.data.refreshtoken;
          const objId = data.data.objId;
          const expiresin = data.data.expiresin;
          // console.log(jwt);
          window.localStorage.setItem("name", name);
          window.localStorage.setItem("jwt", jwt);
          window.localStorage.setItem("objId", objId);
          window.localStorage.setItem("refreshtoken", refreshtoken);
          window.localStorage.setItem("expiresin", expiresin);

          Store.dispatch(loginAuthAction());
          // console.log(Store.getState(), "last");

          // setLogin(true);
          // console.log(window.location.pathname);
          if (window.location.pathname === "/signin") {
            window.location.replace("/");
          } else {
            window.location.replace(window.location.pathname);
          }
        })
        .catch((err) => {
          // console.log(err);
          // window.history.pushState({}, "", "/404"); //try rep 404
          window.location.replace("/404");
        });
    } else {
      Store.dispatch(logoutAuthAction());
      // setLogin(false);
      window.location.replace("/");
    }
  }

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "569698617269-uo5u212q0gp66ljj7md6k7dmiete6u21.apps.googleusercontent.com",
          scope: "email profile",
        })
        .then((result) => {
          // console.log(1);
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
          Store.dispatch(loginAuthAction());
          // console.log(Store.getState(), "onload");
          setLoaded(true);
        })
        .catch((err) => {
          // console.log(err);
          // console.log(err);
          window.history.pushState({}, "", "/404");
          // window.location.replace("/404");
        });
    });
  }, []);

  return (
    <div className="App">
      {isLoaded ? (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/news_page" exact component={News} />
            <Route path="/saved_news" exact component={Savednews} />
            <Route path="/" component={Page404} />
          </Switch>
        </Router>
      ) : null}
    </div>
  );
}

export default App;
