import React, { useState, useEffect } from "react";
import { IconButton, Badge, Snackbar, Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NotificationsActive } from "@material-ui/icons";
import axios from "axios";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const token = localStorage.getItem("token");
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    const fetchUser = () => {
      axios
        .get(`https://polar-dusk-61658.herokuapp.com/admin/info`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          console.log(res.data.providers);
          setHospitals(res.data.providers);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUser();
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let nonactiveProviders = hospitals.filter(
    (hospital) => hospital.activated === false
  );
  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={nonactiveProviders.length} color="secondary">
          <NotificationsActive />
        </Badge>
      </IconButton>
      <Snackbar
        open={open}
        // autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info">
          You have {nonactiveProviders.length} pending requests
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notifications;
