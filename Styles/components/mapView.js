import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  mapView: {
    position: "absolute",
    // height: "100%",
    // width: "100%",
    top: 0,
    zIndex: 0,
  },
  mapViewContent: {
    position: "relative",
    zIndex: 1,
  },
  drawerPaper: {
    top: "90px",
    backgroundColor: "transparent",
    borderRight: "0px",
    zIndex: 1201,
    width: "25%",
    maxWidth: "400px",
    minWidth: "302px",
    height: "calc(100% - 100px)",
    borderRadius: "8px",
    backgroundColor: "rgba(212, 236, 250,.86)",
    marginLeft: "10px",
  },
  drawerBottomPaper: {
    backgroundColor: "transparent",
    borderTop: "0px",
  },
  markerStyle: {
    width: "40px",
    height: "60px",
  },
  mapViewLeft: {
    position: "relative",
  },
  mapViewLeftDrawerBtn: {
    position: "absolute",
    right: "-12px",
    top: "11px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  mapViewAction: {
    display: "inline-grid",
    backgroundColor: "#ededed",
    margin: "36px",
    borderRadius: "35px",
    padding: "3px",
    boxShadow:
      "2px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "20px",
    },
  },
  mapViewActionBtn: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    width: "43px",
    height: "43px",
    color: theme.palette.primary.main,
  },
  mapViewSelectedActionBtn: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  mapViewActionIcon: {
    padding: "10px 0px 0px 8px",
  },
  markerBtn: {
    padding: "0px",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  hiddenXs: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  hiddenSm: {
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },

  mbMapSliderShowHideBtn: {
    backgroundColor: "#ffffff",
    color: theme.palette.primary.main,
    padding: "4px 26px",
    borderRadius: "5px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#ffffff !important",
    },
  },
  mbMapGridViewBtnContainer: {
    position: "fixed",
    bottom: "60px",
    right: "10px",
  },

  mbMapGridViewBtnContainerEnable: {
    position: "fixed",
    bottom: "430px",
    right: "10px",
  },
  mbHideButton: {
    position: "fixed",
    left: "36%",
    bottom: "285px",
  },
  mbShowButton: {
    position: "fixed",
    left: "36%",
    bottom: "25px",
  },
  closeIcon: {
    fontSize: "30px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  locationContainerTop: {
    position: "fixed",
    bottom: "303px",
    right: "20px",
    backgroundColor: "#fff",
    borderRadius: "50px",
    boxShadow: "0px 1px 2px " + theme.custom.black36,
    [theme.breakpoints.between("xs", "sm")]: {
      bottom: "285px",
    },
  },
  locationContainerBottom: {
    position: "fixed",
    bottom: "25px",
    right: "20px",
    backgroundColor: "#fff",
    borderRadius: "50px",
    boxShadow: "0px 1px 2px " + theme.custom.black36,
    [theme.breakpoints.between("xs", "sm")]: {
      bottom: "25px",
    },
  },
  smallCluster: {
    color: "#fff",
    fontSize: theme.typography.pxToRem(16),
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "44px",
    height: "49px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  largeCluster: {
    color: "#fff",
    fontSize: theme.typography.pxToRem(16),
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "44px",
    height: "49px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  extraLargeCluster: {
    color: "#fff",
    fontSize: theme.typography.pxToRem(16),
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "87px",
    height: "98px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
