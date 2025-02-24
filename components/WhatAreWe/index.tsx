import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import useStyles from "../../Styles/components/whatAreWe";

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
                container
                direction="column"
                justify="space-around"
                style={{ marginTop: "70px", marginLeft: "114px" }}
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
                    What are we all about?
                  </Typography>
                  <Typography variant="body2" align="left" gutterBottom className={classes.desc}>
                    Qongfu is a community that believe in practice and humility. consectetur
                    adipiscing elit. Morbi efficitur nisi ut facilisis fringilla. Nulla dictum
                    aliquam massa, id tempor enim ultricies a. Sed tempus ipsum massa, at fermentum
                    tortor suscipit ut. Cras porta lorem orci, mattis sodales velit scelerisque and
                    porta. Sed sit amet.
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.moreBtn}
                    size="large"
                  >
                    More about Qongfu Mobile
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
