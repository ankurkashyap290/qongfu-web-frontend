import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { NextPage } from "next";
import { Notification } from "../../redux/actionTypes";
import { unsetNotification } from "../../redux/actions/app";
interface Props {
  notification: Notification;
  unsetNotification?: typeof unsetNotification;
}
export function openSnackbar(message) {
  openSnackbarFn({ message });
}
let openSnackbarFn;
const Notifier: NextPage<Props> = ({ notification, unsetNotification }) => {
  const handleSnackbarClose = () => {
    unsetNotification!();
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      message={notification && notification.message ? notification.message : "Error"}
      autoHideDuration={5000}
      onClose={handleSnackbarClose}
      open={notification && notification.open ? notification.open : false}
      ContentProps={{
        "aria-describedby": "snackbar-message-id",
      }}
      style={{ marginTop: "90px" }}
    >
      <Alert onClose={handleSnackbarClose} severity="error">
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notifier;
