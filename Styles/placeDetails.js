import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#e4e4e4",
    },
  },
  mainMargin: {
    marginTop: "80px",
    backgroundColor: "#e4e4e4",
    position: "relative",
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "#ffffff",
      marginTop: "66px",
    },
  },
  mbFixedHeader: {
    position: "fixed",
    top: 0,
    width: "100%",
  },
  leftSection: {
    paddingLeft: theme.spacing(2),
  },
  placeDetailBody: {
    padding: "16px 0",
  },
  mainCard: {
    backgroundColor: theme.custom.offWhite,
    borderRadius: "10px",
    marginBottom: theme.spacing(2),
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
  aboutUsHeading: {
    color: "#5d5d5d",
  },
  verticalIcon: {
    verticalAlign: "bottom",
  },
  moreInfo: {
    width: "50px",
    color: "#333333",
    marginLeft: "10px",
  },
  aboutUsDesc: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  onScrollMargin: {
    marginTop: "200px",
  },
}));

export default useStyles;
