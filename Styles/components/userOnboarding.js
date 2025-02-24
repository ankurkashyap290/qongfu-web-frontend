import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  onboardingMainConatiner: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    marginBottom: "40px",
    marginTop: "90px",
    // minHeight: "800px",
    [theme.breakpoints.between("xs", "sm")]: {
      paddingTop: "30px",
      margin: "0px",
      backgroundColor: "#fff",
      // minHeight: "auto",
      // height: "100vh",
    },
  },
  welcomeText: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(46),
    [theme.breakpoints.between("xs", "sm")]: {
      textAlign: "center",
      fontSize: theme.typography.pxToRem(40),
    },
  },
  logo: {
    marginTop: "20px",
  },
  startedText: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(24),
    margin: "10px 0px",
    textAlign: "center",
  },
  startedDesc: {
    color: "#404040",
    fontSize: theme.typography.pxToRem(14),
    textAlign: "center",
  },
  cancelButton: {
    fontSize: theme.typography.pxToRem(17),
    color: theme.custom.black36,
    textTransform: "none",
    marginTop: "10px",
    "&:hover": {
      background: "transparent",
    },
  },

  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    backgroundColor: "transparent",
    padding: "0px",
    width: "100%",
  },
  thirdStepDesc: {
    fontSize: theme.typography.pxToRem(14),
    color: "#404040",
    textAlign: "center",
    marginBottom: "15px",
  },

  inputFields: {
    borderRadius: "27px",
    width: "100%",
    marginBottom: "10px",
  },
  inputBorder: {
    borderRadius: "30px",
    textAlign: "left",
    backgroundColor: "#fcfcfb",
    [theme.breakpoints.between("xs", "sm")]: {
      paddingRight: "20px !important",
    },
  },
  suggestion: {
    background: "#fff",
    padding: "10px",
    color: "#d9d7d7",
    height: "40px",
    margin: "10px",
    fontSize: theme.typography.pxToRem(18),
    border: "1px solid #d9d7d7",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  selectedSuggestion: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    height: "32px",
    fontSize: theme.typography.pxToRem(14),
    margin: "10px",
    padding: "10px",
  },
  successModalHeading: {
    fontSize: theme.typography.pxToRem(46),
    color: theme.palette.primary.main,
    [theme.breakpoints.between("xs", "sm")]: {
      textAlign: "center",
      fontSize: theme.typography.pxToRem(40),
    },
  },
  successModalText: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.primary.main,
  },
  successModalConfirm: {
    fontSize: theme.typography.pxToRem(14),
    color: "#ababab",
    marginTop: "15px",
    marginBottom: "30px",
  },
  uploadMarginBottom: {
    marginBottom: "10px",
  },
  uploadHeading: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  uploadHeadingSubText: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.secondary.main,
    textAlign: "center",
  },
  uploadDragableUpload: {
    backgroundImage: 'url("/assets/img/placeholder.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "0px -32px",
    width: "240px",
    height: "200px",
    borderRadius: "20px",
    position: "relative",
  },

  dragUploadHeading: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.secondary.main,
    textAlign: "center",
    paddingTop: "130px",
  },

  uploadHeadingSelect: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  uploadDropZone: {
    position: "absolute",
    top: 0,
    width: "100%",
    opacity: 0,
    height: "100% !important",
  },
  uploadAvatar: {
    height: "152px",
    width: "152px",
    marginBottom: "30px",
  },
  progress: {
    width: "100%",
    margin: "10px 0px 20px 0px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "80%",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f2f2f2",
      height: "8px",
      borderRadius: "5px",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#4fa11b",
      },
    },
  },
  personalInfoLink: {
    padding: "20px 0px",
    fontSize: theme.typography.pxToRem(17),
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(14),
      padding: "30px 0px 0px 0px",
    },
  },
  stepLabel: {
    height: "20px",
  },
  headingText: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.primary.main,
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "center",
  },
  errorText: {
    color: "#ff0000",
  },
  dropdownList: {
    fontSize: theme.typography.pxToRem(14),

    outline: 0,
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  listAutoComplete: {
    "&:hover": {
      backgroundColor: "#ffffff",
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
  stepAlternativeLabel: {
    display: "none",
  },
  stepContent: {
    textAlign: "center",
    padding: "0px 20px",
    maxWidth: "352px",
  },
  stepTwoContent: {
    textAlign: "center",
  },
  stepLeftArrow: {
    verticalAlign: "middle",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  SkipLink: {
    color: theme.palette.secondary.main,
  },

  mbSubmitButton: {
    width: "100%",
    borderRadius: "0px",
  },
  dateRangeIcon: {
    color: theme.palette.primary.main,
  },
  datePicker: {
    height: "56px",
    borderRadius: "30px",
    backgroundColor: "#fff",
    border: "1px solid #61c1fc",
    width: "100%",
    padding: "15px",
    "&:focus": {
      outline: "#fff",
    },
  },

  stepsContainer: {
    maxWidth: "352px",
  },
  root: {
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: theme.palette.primary.main,
    borderColor: `${theme.palette.primary.main} !important`,
  },
  circle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid #919191",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: theme.typography.pxToRem(17),
  },
}));

export default useStyles;
