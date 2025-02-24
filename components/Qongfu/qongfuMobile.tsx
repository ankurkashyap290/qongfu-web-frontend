import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Container from "@material-ui/core/Container";
import useStyles from "../../Styles/components/qongfuMobile";

export default function OutlinedTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img className={classes.img} alt="complex" src="/assets/img/staticphoneimage.png" />
          </Grid>
          <Grid item xs={12} sm={6} container id="grid">
            <Grid
              item
              container
              direction="column"
              spacing={2}
              className={classes.descRoot}
              justify="space-around"
            >
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  spacing={2}
                  justify="space-around"
                  className={classes.downloadSection}
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
                      Download our App!
                    </Typography>
                    <Typography className={classes.listHeading}>
                      The Qongfu App is an on-the-go mobile Health & Fitness Marketplace!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <List component="nav" aria-label="contacts">
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineOutlinedIcon className={classes.checkedIcon} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Discover the best Health & Fitness Services
                        and Activities near you!"
                          className={classes.listItemtext}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineOutlinedIcon className={classes.checkedIcon} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Looking for a Fitness Trainer? A Wellness or Sports Specialist? We’ve got you covered!"
                          className={classes.listItemtext}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineOutlinedIcon className={classes.checkedIcon} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Explore the best of what your area or neighboring cities have to offer!"
                          className={classes.listItemtext}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.moreBtn}
                  size="large"
                >
                  More about Qongfu Mobile
                </Button>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
