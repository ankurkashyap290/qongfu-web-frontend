import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  whiteButton: {
    color: theme.palette.primary.main,
    backgroundColor: "#fff",
    textTransform: "capitalize",
    boxShadow: "0px 1px 3px rgba(0,0,0,.2)",
    "&:hover": {
      backgroundColor: "#fff",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      boxShadow: "none",
      fontSize: theme.typography.pxToRem(20),
      color: "#000",
      "&:active": {
        boxShadow: "none",
      },
      "&:hover": {
        boxShadow: "none",
      },
    },
  },
  dropDownIcon: {
    color: theme.palette.primary.main,
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(34),
      color: "#000",
    },
  },
  menuItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuItemSelected: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
