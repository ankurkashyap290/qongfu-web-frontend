import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  successModalHeading: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.primary.main,
  },
  successModalConfirm: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.custom.black60,
  },
  successContainer: {
    margin: "15px 50px",
    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px",
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
}));
export default useStyles;
