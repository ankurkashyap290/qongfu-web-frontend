import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  mainContainer: {
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
  toggleCarouselBtn: {
    backgroundColor: "#fff",
    color: theme.palette.primary.main,
    padding: "0 5px",
    paddingLeft: "12px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#fff !important",
    },
  },
}));

export default useStyles;
