import React from "react";
import SignIn from "./components/SignIn/SignIn";
import AuthGuard from "./components/SignIn/AuthGuard";
import SideBar from "./components/SideBar/SideBar";
import OTPVerification from "./components/SignIn/Otp";
import Home from "./components/Dashboard/Home";
import AllProviders from "./components/Providers/AllProviders";
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
