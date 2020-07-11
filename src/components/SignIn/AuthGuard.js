import React from "react";
import { Route, Redirect } from "react-router-dom";
const jwtDecode = require("jwt-decode");

const CheckToken = () => {
  let token = localStorage.getItem("token");
  if (token) {
    let decodedToken = jwtDecode(token);

    if (decodedToken.exp < new Date().getTime() / 1000) {
      console.log("Expired");
      return false;
    } else {
      console.log("NOPE");
      return true;
    }
  }
};

const AuthGuard = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      CheckToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AuthGuard;
