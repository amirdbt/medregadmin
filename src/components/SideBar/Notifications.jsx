import React, { useState } from "react";
import { IconButton, Badge, Snackbar, Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NotificationsActive } from "@material-ui/icons";

const Notifications = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={11} color="secondary">
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
          You have 11 pending requests
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notifications;
