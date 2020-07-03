import React from "react";
import SignIn from "./components/SignIn/SignIn";
import AuthGuard from "./components/SignIn/AuthGuard";
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/Dashboard/Home";
import { Switch, Route, withRouter } from "react-router-dom";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" && (
        <>
          <SideBar />
        </>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
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
