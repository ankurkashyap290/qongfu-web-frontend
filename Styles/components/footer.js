import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  simpleGird: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  footer: {
    backgroundColor: "#f8fcff",
  },
  footerPadding: {
    padding: theme.spacing(6),
  },
  email: {
    width: "90%",
  },
  feedback: {
    width: "90%",
  },
  submit: {
    marginLeft: "65%",
  },
  footerInfo: {
    padding: "15px 0px",
  },
  expendedCont: {
    textAlign: "right",
  },
  copyRightText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.secondary.main,
  },
  footerBtn: {
    padding: "9px 12px",
    backgroundColor: "#ffffff",
    border: "1px solid #000000",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  footerBtnLable: {
    fontSize: theme.typography.pxToRem(16),
    color: "#5d5d5d",
    fontFamily: "'Roboto', sans-serif",
    textTransform: "capitalize",
  },
  divider: {
    height: 2,
    marginTop: 20,
    width: "100%",
  },
  footerHeading: {
    fontSize: theme.typography.pxToRem(24),
    color: "#5d5d5d",
    fontWeight: 400,
  },
  footerHeading2: {
    padding: "18px 0px",
  },
  submitBtn: {
    width: "132px",
    borderRadius: "30px",
    padding: "14px 12px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  submitBtnLable: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 400,
    fontFamily: "'Roboto', sans-serif;",
    textTransform: "capitalize",
  },
  submitContainer: {
    textAlign: "right",
    paddingRight: "60px",
  },
  footerMenu: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.custom.black60,
    lineHeight: "30px",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
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
  errorText: {
    color: "#ff0000",
  },
  confirmationModal: {
    padding: "30px",
  },
}));

export default useStyles;
