import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Link,
  LinearProgress,
  makeStyles,
  Avatar,
  CssBaseline,
  Grid,
  Container,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import {
  SupervisorAccount,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
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

const SiginIn = () => {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let history = useHistory();
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setLoading(true);
          axios
            .post(`https://polar-dusk-61658.herokuapp.com/admin/login`, values)
            .then((res) => {
              console.log(res.data);

              setLoading(false);
              history.push("/otp-verification");
            })
            .catch((err) => {
              console.log(err.response);
              setMessage("Username or Password is incorrect");
              setErr(true);
              setLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required("Required"),
        password: Yup.string()
          .required("No password provided")
          .min(8)
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase,one lowercase, one number and one special case character"
          ),
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
                Sign in to your account to continue
              </Typography>

              <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.textfields}>
                  <TextField
                    name="userName"
                    label="Username*"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    error={err}
                    value={values.userName}
                    className={errors.userName && touched.userName && "error"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.userName && touched.userName && (
                    <div className={classes.error}> {errors.userName} </div>
                  )}
                  <div style={{ marginTop: "20px" }}></div>
                  <TextField
                    name="password"
                    label="Password *"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    error={err}
                    className={errors.password && touched.password && "error"}
                    // className={classes.text}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && touched.password && (
                    <div className={classes.error}> {errors.password} </div>
                  )}
                  <div style={{ marginTop: "10px" }}></div>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>

                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}

                  <div style={{ marginTop: "10px" }}></div>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};
export default SiginIn;
