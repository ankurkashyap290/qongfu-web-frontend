import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  cardGrid1: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.between("xs", "sm")]: {
      paddingTop: theme.spacing(1),
    },
  },
  advSearchMargin: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  placesMargin: {
    paddingRight: "36px",
  },
  searchPageMain: {
    marginTop: "80px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginTop: "65px",
      backgroundColor: "#fff",
    },
    "& .infinite-scroll-component__outerdiv": {
      width: "100%",
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
  mbDisableBtn: {
    backgroundColor: "#f7f7fa",
    color: "#b1b1b1",
    borderRadius: "30px",
    textTransform: "capitalize",
    width: "109px",
    marginRight: "5px",
    "&:hover": {
      backgroundColor: "#f7f7fa",
    },
  },
  mbActiveBtn: {
    color: "#ffffff",
    textTransform: "capitalize",
    width: "109px",
    marginRight: "5px",
    ["@media (max-width:320px)"]: {
      width: "100px",
    },
  },
}));

export default useStyles;
