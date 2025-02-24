import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import Grid from "@material-ui/core/Grid";
// import Link from "next/link";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LocalBarOutlinedIcon from "@material-ui/icons/LocalBarOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HeadsetMicOutlinedIcon from "@material-ui/icons/HeadsetMicOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "white",
    height: 75,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  mapicon: {
    color: "#7f8183",
    fontSize: "40px",
  },

  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  topbar: {
    marginTop: 10,
  },
  avatar: {
    backgroundColor: "#ffffff",
    color: "#979797",
    width: 60,
    height: 60,
    margin: 10,
  },
}));

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.topbar}>
          <img alt="logo" src="/assets/mobilelogo.png" />
          <Paper className={classes.paper}>
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search Qongfu"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton className={classes.iconButton} aria-label="search">
              <LocalBarOutlinedIcon />
            </IconButton>
          </Paper>

          <Typography className={classes.title}></Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MapOutlinedIcon className={classes.mapicon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* {['Explore', 'Maps', 'About Us','Qongfu Mobile', 'Qongfu Business', 'Helpdesk'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}

          <ListItem style={{ width: "100%", padding: "0px" }}>
            <div style={{ backgroundColor: "#0092dd", width: "100%", height: "100px" }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <PersonOutlineOutlinedIcon />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: "15px", color: "white" }}>Guest User</Typography>
                  <Typography style={{ fontSize: "12px", color: "white" }}>
                    Manama, Bahrain
                  </Typography>
                  {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
                  <Typography style={{ fontSize: "12px", color: "white" }}>
                    Signup or Login
                  </Typography>
                  {/* </Link> */}
                </Grid>
              </Grid>
            </div>
          </ListItem>
          <ListItem button key={"Explore"}>
            <ListItemIcon>{<AlternateEmailOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={"Explore"} />
          </ListItem>

          <ListItem button key={"Maps"}>
            <ListItemIcon>{<MapOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={"Maps"} />
          </ListItem>
          <Divider />
          <ListItem button key={"About Us"}>
            <ListItemIcon>{<StarBorderIcon />}</ListItemIcon>
            {/* <Link  as="/aboutUs">
              <ListItemText primary={"About Us"} />
            </Link> */}
          </ListItem>

          <ListItem button key={"Qongfu Mobile"}>
            <ListItemIcon>{<PhoneAndroidIcon />}</ListItemIcon>
            {/* <Link as="/qongfuMobile">
              <ListItemText primary={"Qongfu Mobile"} />
            </Link> */}
          </ListItem>

          <ListItem button key={"Qongfu Business"}>
            <ListItemIcon>{<HomeOutlinedIcon />}</ListItemIcon>
            {/* <Link as="/qongfuBusiness">
              <ListItemText primary={"Qongfu Business"} />
            </Link> */}
          </ListItem>

          <ListItem button key={"Help Desk"}>
            <ListItemIcon>{<HeadsetMicOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={"Help Desk"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
