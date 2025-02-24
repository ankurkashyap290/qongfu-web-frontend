import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  theme => ({
    grow: {
      flexGrow: 1,
    },
    logoContainer: {
      paddingLeft: "0px",
      [theme.breakpoints.between("xs", "sm")]: {
        paddingLeft: "0px",
      },
    },
    logo: {
      width: "163px",
    },
    link: {
      [theme.breakpoints.down("md")]: {
        margin: "0px 7px",
      },
    },
    linkActive: {},
    accountCircle: {
      color: theme.custom.black60,
      verticalAlign: "bottom",
      marginRight: 5,
    },
    appBarRootShadowNone: {
      boxShadow: "none",
    },
    appBarRoot: {
      backgroundColor: "#F8FCFF",
      padding: "8px 0px",
      [theme.breakpoints.between("xs", "sm")]: {
        backgroundColor: "#ffffff",
        padding: "6px 0px",
      },
    },
    searchContainer: {
      paddingLeft: 40,
      [theme.breakpoints.between("xs", "sm")]: {
        paddingLeft: "10px",
        textAlign: "center",
      },
    },
    alignIcon: {
      verticalAlign: "bottom",
    },
    notification: {
      display: "inline-block",
    },
    profileImage: {
      marginLeft: "15px",
      display: "inline-flex",
      verticalAlign: "middle",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 1px 3px 1px rgba(0,0,0,.1)",
      [theme.breakpoints.down("md")]: {
        marginLeft: "0px",
      },
    },
    dropdownIcon: {
      marginBottom: "-8px",
      color: theme.palette.primary.main,
    },
    dropdownList: {
      color: theme.palette.primary.main,
      fontSize: theme.typography.pxToRem(14),
      width: "280px",
      // outline: 0,
      // "&:hover": {
      //   backgroundColor: "#ffffff",
      // },
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
    headerFilter: {
      paddingLeft: "10px",
    },
    userLayoutBackground: {
      backgroundColor: "#fff",
    },
    placeName: {
      color: theme.palette.primary.main,
    },
    alignIconMiddle: {
      verticalAlign: "middle",
      marginRight: "10px",
    },
    drawerPaper: {
      top: 0,
      zIndex: "999999",
      borderRight: "0px",
      width: "80vw",
      boxShadow: "0 0 5px #b2b2b2",
    },
    drawerHeader: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      height: "130px",
    },
    mbUserImage: {
      marginTop: "30px",
      marginLeft: "26px",
      marginRight: "18px",
      height: "66px",
      width: "66px",
      borderRadius: "50%",
      border: "2px solid #fff",
    },
    mbProfilePageAvatar: {
      height: "36px",
      width: "36px",
    },
    mbUserProfileName: {
      color: "#fff",
      marginTop: "30px",
      fontSize: theme.typography.pxToRem(16),
      paddingLeft: "10px",
    },
    mbUserProfileArea: {
      color: "#fff",
      fontSize: theme.typography.pxToRem(14),
      paddingLeft: "10px",
    },
    list: {
      borderRadius: "8px",
      marginTop: "10px",
      paddingLeft: "15px",
      cursor: "pointer",
      boxShadow: "none",
      listStyleType: "none",
    },
    listItemInactive: {
      fontSize: theme.typography.pxToRem(16),
      color: theme.custom.black86,
      marginBottom: "10px",
      "& .MuiListItemIcon-root": {
        minWidth: "30px",
      },
    },
    listItemActive: {
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.primary.main,
      marginBottom: "10px",
      "& .MuiListItemIcon-root": {
        minWidth: "30px",
      },
    },
    divider: {
      color: theme.palette.primary.main,
    },
    mbActiveBtn: {
      color: "#ffffff",
      textTransform: "capitalize",
      width: "109px",
      marginRight: "5px",
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
    accountPageHeader: {
      color: theme.palette.primary.main,
    },
    inputBorder: {
      borderRadius: "10px",
      borderColor: "#61c1fc !important",
      backgroundColor: "#fcfcfb",
    },
    inputLabels: {
      fontSize: theme.typography.pxToRem(12),
      textTransform: "uppercase",
      marginTop: "15px",
      marginBottom: "5px",
    },
    helpdeskModalHeading: {
      fontSize: theme.typography.pxToRem(24),
      color: theme.palette.primary.main,
      textAlign: "center",
      marginBottom: "5px",
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: theme.typography.pxToRem(23),
      },
    },
    closeIcon: {
      fontSize: "30px",
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
    confirmationModal: {
      padding: "30px",
      width: "40vw",
    },
    errorText: {
      color: "#ff0000",
      fontSize: theme.typography.pxToRem(10),
      marginLeft: "0px",
      marginRight: "0px",
    },
  }),
  { name: "Qongfu" }
);

export default useStyles;
