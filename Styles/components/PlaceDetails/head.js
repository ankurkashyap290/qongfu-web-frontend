import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  headBackgroundImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "360px",
    borderBottom: "5px solid #dcdcdc",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      height: "155px",
    },
    ["@media (max-width:320px)"]: {
      height: "150px",
    },
  },
  bigAvatar: {
    width: 168,
    height: 168,
    position: "absolute",
    top: "-58px",
    marginLeft: "16px",
    border: "3px solid #faf9fa",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.between("xs", "sm")]: {
      width: 130,
      height: 130,
      top: "-121px",
    },
  },
  avatarFixed: {
    width: 100,
    height: 100,
    position: "absolute",
    top: "12px",
    left: "0px",
    marginLeft: "16px",
    border: "3px solid #faf9fa",

    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.between("xs", "sm")]: {
      left: "10px",
      marginLeft: "0px",
      width: "88px",
      height: "88px",
    },
  },
  infoBarMain: {
    backgroundColor: theme.custom.offWhite,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "#fff",
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
  infoBarLogoMain: {
    position: "relative",
  },
  placeInfo: {
    paddingTop: "10px",
    marginLeft: "190px",
    [theme.breakpoints.between("xs", "sm")]: {
      paddingLeft: "16px",
      marginLeft: "0px",
      marginTop: "0px",
      width: "100%",
    },
  },
  placeInfoFixed: {
    paddingTop: "15px",
    marginLeft: "125px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: "106px",
      width: "100%",
      paddingTop: "5px",
      width: "calc(100% - 106px)",
    },
  },
  icon: {
    verticalAlign: "middle",
    marginRight: "10px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginRight: "8px",
    },
  },
  authenticatedIcon: {
    marginLeft: "-2px",
    verticalAlign: "middle",
    marginRight: "10px",
  },
  placeName: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: 500,
    color: theme.custom.black100,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(20),
      paddingBottom: "0px",
      paddingTop: "0px",
    },
  },
  placeDescription: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.custom.black60,
    paddingBottom: theme.spacing(1),
  },
  placeLocation: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.custom.black60,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: "0px",
      fontSize: theme.typography.pxToRem(13),
    },
  },
  starRating: {
    fontSize: theme.typography.pxToRem(36),
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(2),
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  ratingSection: {
    paddingRight: theme.spacing(2),
  },
  ratingSectionFixed: {
    paddingRight: theme.spacing(2),
  },
  rateUs: {
    textAlign: "right",
  },
  rateUsRoot: {
    borderRadius: "30px",
  },
  rateUsLabel: {
    textTransform: "capitalize",
  },
  rateUsModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    position: "absolute",
    width: "676px",
    backgroundColor: "#fff",
    padding: "25px",
    textAlign: "center",
    borderRadius: "10px",
    borderColor: "#fff",
    "&:focus": {
      outline: "none",
    },
  },
  rateUsModalHeading: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.primary.main,
    marginBottom: "5px",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(23),
    },
  },
  rateUsModalPlaceName: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.custom.black100,
    margin: "5px 0px",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  bigModalAvatar: {
    width: 168,
    height: 168,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.between("xs", "sm")]: {
      width: 55,
      height: 55,
    },
  },
  rateUsModalText: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.custom.black60,
    margin: "5px 0px",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  rateUsCancelButton: {
    width: "175px",
    marginTop: "5px",
    color: theme.custom.black60,
  },
  submitButtonEnable: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontSize: theme.typography.pxToRem(16),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  submitButtonDisable: {
    backgroundColor: theme.custom.black16,
    color: "#fff",
    fontSize: theme.typography.pxToRem(16),
  },
  infoBarFixed: {
    position: "fixed",
    width: "100%",
    maxWidth: "1280px",
    zIndex: 999,
    top: 75,
    [theme.breakpoints.between("xs", "sm")]: {
      top: 63,
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
  alignItemMiddle: {
    verticalAlign: "middle",
  },
  mbOpenTitle: {
    color: "#fff",
    backgroundColor: "#54b948",
    padding: "5px",
    borderRadius: "4px",
  },
  mbOpenTime: {
    marginLeft: "10px",
  },
  mbStartRating: {
    position: "absolute",
    top: 116,
    right: 0,
  },
  mbPhoneCallRating: {
    float: "right",
    paddingTop: "5px",
    paddingRight: "5px",
  },
  mbTabFlexContainer: {
    justifyContent: "center",
  },
  timingMenuPaper: {
    left: "15% !important",
  },
  dayClose: {
    color: "#fff",
    backgroundColor: "#fb1d00",
    padding: "4px",
    borderRadius: "4px",
  },
  rateUsContainer: {
    padding: "20px",
    textAlign: "center",
  },
  rateUsDialogRoot: {
    zIndex: `${99999} !important`,
    top: "60px !important",
  },
  headerTabBtn: {
    width: "100%",
    textTransform: "capitalize",
  },
  headerTabBtnInActive: {
    border: "0px",
    // borderBottom: "1px solid",
    borderRadius: "0px",
  },
  headerTabBtnActive: {
    border: "0px",
    // borderBottom: "1px solid",
    borderRadius: "0px",
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  buttonBoxShadow: {
    // boxShadow: "0 7px 6px -6px #b2b2b2",
  },
  complimentLabel: {
    textAlign: "left",
    fontSize: theme.typography.pxToRem(12),
    color: theme.custom.black60,
  },
  inputBorder: {
    borderRadius: "10px",
  },
  rateUsModalFeedback: {
    color: theme.custom.black86,
    fontSize: theme.typography.pxToRem(18),
  },
  rateUsModalThanksText: {
    color: theme.custom.black60,
    fontSize: theme.typography.pxToRem(14),
  },
  rateUsRating: {
    color: "#fff",
    fontSize: theme.typography.pxToRem(29),
    position: "absolute",
    top: "30px",
    left: "calc(50% - 20px)",
    width: "40px",
  },
  rateUsFeedbackBadge: {
    position: "relative",
    width: "100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ratingButton: {
    backgroundColor: "#333333",
    color: "#fff",
    float: "right",
    height: "28px",
    minWidth: "52px",
    borderRadius: "14px",
    padding: "0px  15px",
    opacity: "0.8",
    "&:hover": {
      backgroundColor: "#333333",
      color: "#fff",
      opacity: "0.8",
    },
  },
  icon2: {
    verticalAlign: "middle",
    color: theme.palette.secondary.main,
    fontSize: "18px",
    marginRight: theme.spacing(2),
  },
  open: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    color: "#54b948",
  },
  closed: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    color: theme.custom.dangerColor,
  },
  rateUsModalAlreadySubmit: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.custom.dangerColor,
  },
  loginLink: {
    padding: "20px 0px",
  },
  infoBarContainer: {
    paddingBottom: "16px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  infoBarContainerFixed: {
    backgroundColor: theme.custom.offWhite,
  },
  ratingsAndShareActionCt: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default useStyles;
