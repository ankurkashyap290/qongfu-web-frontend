import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: "27px",
    marginBottom: theme.spacing(2),
    width: "650px",
    boxShadow: "0 0 5px #b2b2b2",
    [theme.breakpoints.down("sm")]: {
      width: "320px",
    },
    ["@media (max-width:320px)"]: {
      width: "280px",
    },
  },

  inputFields: {
    borderRadius: "27px",
    width: "100%",
    marginBottom: "20px",
  },
  leftDivider: {
    width: "100%",
  },
  rightDivider: {
    width: "100%",
  },
  dividerText: {
    fontSize: theme.typography.pxToRem(14),
    color: "#b2b2b2",
    textAlign: "center",
  },
  signUpAndSignInHeading: {
    fontSize: theme.typography.pxToRem(28),
    margin: "30px 0px",
    textAlign: "center",
  },
  headingText: {
    fontSize: theme.typography.pxToRem(28),
    color: theme.palette.primary.main,
    margin: "30px 0px",
    textAlign: "center",
  },
  hidePassword: {
    color: "#5d5d5d",
  },
  showPassword: {
    color: theme.palette.primary.main,
  },
  checkbox: {
    margin: "20px 0px",
  },
  termsAndConditions: {
    margin: "20px 40px",
  },
  forgotLink: {
    marginBottom: "20px",
    fontSize: theme.typography.pxToRem(14),
    pointer: "cursor",
  },
  returnToLogin: {
    marginBottom: "20px",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    pointer: "cursor",
  },
  inputBorder: {
    borderRadius: "30px",
    backgroundColor: "#fcfcfb",
  },
  modalPaper: {
    backgroundColor: "#fff",
    position: "absolute",
    backgroundColor: "#fff",
    padding: "45px",
    textAlign: "center",
    borderRadius: "10px",
    borderColor: "#fff",
    "&:focus": {
      outline: "none",
    },
    width: "420px",
  },
  countriesModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCountry: {
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
  },
  notSelectedCountry: {
    cursor: "pointer",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successModalHeading: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.primary.main,
  },
  successModalConfirm: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.custom.black60,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "30px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  newPasswordText: {
    color: "#b2b2b2",
    marginBottom: "30px",
    textAlign: "center",
  },
  cancelButton: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.custom.black36,
    textTransform: "none",
  },
  cancelPasswordChangeLink: {
    color: "#ff0000",
    fontSize: theme.typography.pxToRem(18),
    textDecoration: "none",
    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  cancelPasswordText: {
    fontSize: theme.typography.pxToRem(22),
    color: "#5d5d5d",
    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  errorText: {
    color: "#ff0000",
  },
  tabHeading: {
    color: "#5d5d5d",
    textTransform: "none",
    width: "50%",
    "&:active": {
      color: "#5d5d5d",
    },
  },
  indicator: {
    backgroundColor: "#fff",
  },
  rememberMe: {
    color: "#b2b2b2",
    fontSize: theme.typography.pxToRem(12),
  },
  adornment: {
    fontSize: theme.typography.pxToRem(17),
    marginRight: "10px",
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
  mbAuthContent: {
    padding: "0px 30px !important",
  },
  mbAuthHead: {
    textAlign: "center",
  },
  forgotPasswordSubmit: {
    width: "100%",
    margin: "20px 0px",
  },
  submitBtn: {
    width: "100%",
    margin: "20px 0px",
    textTransform: "capitalize",
  },
  inputHeadingText: {
    fontSize: theme.typography.pxToRem(28),
    color: theme.palette.primary.main,
    margin: "30px 0px 0px 0px",
    textAlign: "center",
  },
  authLink: {
    textDecoration: "underline",
  },
  headerTabBtnActive: {
    backgroundColor: "#ffffff",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  headerTabBtn: {
    backgroundColor: "#f7f7f7",
    "&:hover": {
      backgroundColor: "#f7f7f7",
    },
  },
  countryModalHeading: {
    color: theme.palette.primary.main,
  },
  confirmationModal: {
    padding: "30px",
  },
  listScroll: {
    height: "400px",
    overflowX: "auto",
  },
  countryIconButton: {
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  inlineCountryIconButton: {
    border: "1px solid #61c1fc",
    borderRadius: "44px",
    height: "56px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
}));

export default useStyles;
