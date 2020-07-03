import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  DialogContentText,
  IconButton,
  Badge,
} from "@material-ui/core";

import { NotificationsActive } from "@material-ui/icons";

const Notifications = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <Badge badgeContent={11} color="secondary">
          <NotificationsActive />
        </Badge>
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Notifications"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have 11 pending requests.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Notifications;
