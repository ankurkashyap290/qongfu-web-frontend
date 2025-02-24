import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import useStyles from "../../Styles/components/qongfuBusiness";

export default function OutlinedTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2} square>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={6} container>
              <Grid
                item
                xs
                container
                direction="column"
                justify="space-around"
                style={{ marginLeft: "114px", marginTop: "80px" }}
              >
                <Grid item>
                  <Typography
                    component="h4"
                    variant="h4"
                    align="left"
                    color="textPrimary"
                    gutterBottom
                    className={classes.headingText}
                  >
                    Qongfu Business
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    paragraph
                    gutterBottom
                    className={classes.desc}
                  >
                    Do you own a Health & Fitness Center or Studio?
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    paragraph
                    gutterBottom
                    className={classes.desc}
                  >
                    Do you offer Sports or Wellness Services?
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    paragraph
                    gutterBottom
                    className={classes.desc}
                  >
                    Are you a Health & Fitness Specialist?
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.moreBtn}
                    size="large"
                  >
                    More about Qongfu Business
                  </Button> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.staticStyledImage}>
              <img className={classes.img} alt="complex" src="/assets/img/staticstyledimage.png" />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
}
