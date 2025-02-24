import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#e4e4e4",
    },
  },
  mainMargin: {
    marginTop: "80px",
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "#ffffff",
      marginTop: "66px",
    },
  },
  headBackgroundImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "360px",
    backgroundColor: "#ccc",
    backgroundPosition: "center",
    // borderBottom: "5px solid #dcdcdc",
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
    top: "-55px",
    marginLeft: "16px",
    border: "3px solid #faf9fa",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.between("xs", "sm")]: {
      width: 100,
      height: 100,
      top: "-59px",
    },
  },
  avatarFixed: {
    width: 88,
    height: 88,
    position: "absolute",
    top: "33px",
    left: "31px",
    marginLeft: "16px",
    border: "3px solid #faf9fa",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    [theme.breakpoints.between("xs", "sm")]: {
      left: "0px",
    },
  },
  infoBarMain: {
    backgroundColor: theme.custom.offWhite,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    paddingBottom: theme.spacing(2),
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "#fff",
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
  infoBarLogoMain: {
    position: "relative",
  },
  infoBarFixed: {
    position: "fixed",
    width: "100%",
    zIndex: 999,
    top: 68,
    [theme.breakpoints.between("xs", "sm")]: {
      top: 56,
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
  userName: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: 600,
    color: theme.custom.black100,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(22),
      paddingTop: "39px",
    },
  },
  userInfo: {
    marginLeft: "200px",
    paddingTop: "10px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: "16px",
      marginTop: "-11px",
    },
  },
  userInfoFixed: {
    marginLeft: "160px",
    paddingTop: "20px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: "118px",
      width: "80%",
    },
  },

  aboutUs: {
    fontSize: theme.typography.pxToRem(24),
    color: "#5d5d5d",
    marginBottom: "15px",
    marginTop: "10px",
  },
  aboutUsDesc: {
    fontSize: theme.typography.pxToRem(16),
    color: "#858585",
  },
  mainCard: {
    backgroundColor: "#f8fcff",
    borderRadius: "10px",
    boxShadow: "0 0 5px #b2b2b2",
    padding: "15px",
    // margin: "15px",
  },
  moreInfo: {
    width: "50px",
    color: "#333333",
    marginLeft: "10px",
  },
  verticalIcon: {
    verticalAlign: "bottom",
  },
  editIcon: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    float: "right",
    height: "36px",
    width: "45px",
    minWidth: "45px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      marginTop: "9px",
    },
    border: "1px solid #fff",
    boxShadow: "0px 1px 2px 2px rgba(0,0,0,.2)",
  },
  validatedMember: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  area: {
    color: theme.custom.black60,
  },
  cameraIcon: {
    backgroundColor: "#000",
    opacity: 0.5,
    borderRadius: "5px",
    padding: "6px 11px",
    "&:hover": {
      backgroundColor: "#000",
      opacity: 0.5,
      borderRadius: "5px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "4px 8px",
    },
    marginBottom: "15px",
  },
  cameraCoverIcon: {
    position: "absolute",
    backgroundColor: "#000",
    opacity: 0.5,
    borderRadius: "5px",
    right: "10px",
    top: "10px",
    padding: "6px 11px",
    "&:hover": {
      backgroundColor: "#000",
      opacity: 0.5,
      borderRadius: "5px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "4px 8px",
    },
  },
  userProfileBody: {
    padding: "16px",
  },
  avatarContainer: {
    width: "168px",
    height: "168px",
    position: "absolute",
    top: "-55px",
    left: "0px",
    marginLeft: "16px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: 100,
      height: 100,
      top: "-59px",
    },
  },
}));

export default useStyles;
