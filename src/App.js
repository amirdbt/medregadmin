import React from "react";
import SignIn from "./components/SignIn/SignIn";
import AuthGuard from "./components/SignIn/AuthGuard";
import SideBar from "./components/SideBar/SideBar";
import OTPVerification from "./components/SignIn/Otp";
import Home from "./components/Dashboard/Home";
import AllProviders from "./components/Providers/AllProviders";
import AllUsers from "./components/Users/AllUsers";
import { Switch, Route, withRouter } from "react-router-dom";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" &&
        location.pathname !== "/otp-verification" && (
          <>
            <SideBar />
          </>
        )}
      <Switch>
        <AuthGuard exact path="/" component={Home} />
        <AuthGuard path="/providers" component={AllProviders} />
        <AuthGuard path="/users" component={AllUsers} />
        <Route path="/signin" component={SignIn} />
        <Route path="/otp-verification" component={OTPVerification} />
      </Switch>
    </>
  );
});

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}
export default App;
