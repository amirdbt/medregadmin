import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  LinearProgress,
  makeStyles,
  Avatar,
  CssBaseline,
  Container,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { SupervisorAccount } from "@material-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "rgb(235, 54, 54)",
  },
}));

const OTPVerification = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  // console.log(location.state);
  const userName = location.state.userName;
  console.log(userName);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ userName, OTP: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("OTP  in", values);
          setLoading(true);
          axios
            .post(`https://polar-dusk-61658.herokuapp.com/users/verify`, values)
            .then((res) => {
              console.log(res.data);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userName", res.data.user.userName);

              setLoading(false);
              history.push("/");
            })
            .catch((err) => {
              console.log(err.response.data);
              setMessage(err.response.data);
              setLoading(false);
              setErr(true);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required("Required"),
        OTP: Yup.string().required("No OTP provided"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {err ? (
              <Alert style={{ marginTop: "20px" }} severity="error">
                {message}
              </Alert>
            ) : (
              <div></div>
            )}
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <SupervisorAccount />
              </Avatar>

              <Typography component="h1" variant="h5">
                MedReg Admin Portal
              </Typography>
              <Typography variant="subtitle1">
                Enter your OTP sent to your mobile phone
              </Typography>

              <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.textfields}>
                  <TextField
                    name="OTP"
                    label="OTP*"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    error={err}
                    value={values.OTP}
                    className={errors.OTP && touched.OTP && "error"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.OTP && touched.OTP && (
                    <div className={classes.error}> {errors.OTP} </div>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    Verify OTP
                  </Button>

                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}

                  <div style={{ marginTop: "10px" }}></div>
                </div>
              </form>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};
export default OTPVerification;
