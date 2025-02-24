import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  mainMargin: {
    marginTop: "80px",
    "& .infinite-scroll-component__outerdiv": {
      width: "100%",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      marginTop: "66px",
      backgroundColor: "#fff",
    },
  },
  lifestyleDetailBody: {
    [theme.breakpoints.between("xs", "sm")]: {
      paddingLeft: "0",
      paddingRight: "0",
    },
    padding: "20px",
  },
  advSearchMargin: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  placesMargin: {
    paddingRight: "36px",
    paddingLeft: "20px",
    marginTop: "0px",
    [theme.breakpoints.between("xs", "sm")]: {
      paddingLeft: "0",
      paddingRight: "0",
    },
  },
  dividerText: {
    fontSize: theme.typography.pxToRem(22),
    color: "#b2b2b2",
    width: "40%",
    float: "left",
    textAlign: "center",
  },
  leftDivider: {
    width: "30%",
    float: "left",
    marginTop: "18px",
  },
  rightDivider: {
    width: "30%",
    float: "right",
    marginTop: "18px",
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
  mbMapViewContainer: {
    position: "fixed",
    bottom: "30px",
    left: "45%",
    ["@media (max-width:320px)"]: {
      bottom: "30px",
      left: "130px",
    },
  },
  mbMapViewBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  mbMapViewIcon: {
    width: "80px",
    height: "80px",
  },
}));

export default useStyles;
