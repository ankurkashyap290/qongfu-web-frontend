import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: "#f8fcff",
    padding: theme.spacing(6),
  },
  email: {
    width: "90%",
  },
  feedback: {
    width: "90%",
  },
  submit: {
    marginLeft: "65%",
  },
}));

export default function OutlinedTextFields() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="textSecondary">
              <b>Navigate Qongfu</b>
            </Typography>
            <Typography color="textSecondary">Explore Qongfu</Typography>
            <Typography color="textSecondary">About Us</Typography>
            <Typography color="textSecondary">Qongfu Mobile</Typography>
            <Typography color="textSecondary">Qongfu Business</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography color="textSecondary">Terms and Conditions</Typography>
            <Typography color="textSecondary">Privacy Statement</Typography>
            <Typography color="textSecondary">Sitemap</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="textSecondary">
              <b>Share your feedback</b>
            </Typography>
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.email}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Feedback"
              className={classes.feedback}
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              placeholder="If you have any questions, suggestions or feedback feel free to share it with us"
              multiline={true}
              rows={3}
            />
            <Typography>
              <Fab variant="extended" color="primary" aria-label="add" className={classes.submit}>
                Submit
              </Fab>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
