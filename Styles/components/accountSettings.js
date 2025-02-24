import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#d1dae2",
    },
  },
  accountLeftPanel: {
    backgroundColor: theme.custom.offWhite,
  },
  mainMargin: {
    marginTop: "80px",
    // height: "100vh",
    [theme.breakpoints.between("xs", "sm")]: {
      marginTop: "0px",
    },
  },
  drawerPaper: {
    top: "71px",
    backgroundColor: "#f8fcff",
    borderRight: "0px",
    width: "30%",
    zIndex: 1000,
    boxShadow: "0 0 5px #b2b2b2",
    [theme.breakpoints.between("xs", "sm")]: {
      top: "0px",
      zIndex: "999999",
      width: "90vw",
      backgroundColor: "#fff",
    },
  },
  dividerText: {
    fontSize: theme.typography.pxToRem(15),
    color: "#9f9e9e",
    marginTop: "15px",
    marginLeft: "15px",
  },
  list: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,.1)",
    width: "93%",
    borderRadius: "8px",
    marginTop: "10px",
    marginLeft: "15px",
    cursor: "pointer",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
      marginLeft: "32px",
      boxShadow: "none",
      listStyleType: "none",
    },
  },
  listItemInactive: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.custom.black86,
    margin: "0px",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  listItemActive: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.primary.main,
    margin: "0px",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  divider: {
    margin: "5px 15px",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px",
    },
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    margin: "20px",
    boxShadow: "0 0 5px #b2b2b2",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px",
      marginTop: "64px",
      borderRadius: "0px",
    },
  },
  headingText: {
    fontSize: theme.typography.pxToRem(26),
    color: theme.palette.primary.main,
  },
  DescriptionText: {
    fontSize: theme.typography.pxToRem(14),
    color: "#474747",
    marginTop: "10px",
    marginBottom: "20px",
  },
  inputFields: {
    borderRadius: "27px",
    width: "95%",
    marginBottom: "20px",
  },
  searchField: {
    borderRadius: "27px",
    width: "100%",
  },
  dateOfBirth: {
    "& .MuiInputBase-input.Mui-disabled": {
      color: "#000",
    },
  },
  inputBorder: {
    borderRadius: "30px",
    borderColor: "#61c1fc !important",
    backgroundColor: "#fcfcfb",
  },
  inputLabels: {
    fontSize: theme.typography.pxToRem(12),
    textTransform: "uppercase",
    marginTop: "15px",
    marginBottom: "5px",
  },
  hidePassword: {
    color: "#5d5d5d",
  },
  showPassword: {
    color: theme.palette.primary.main,
  },
  adornment: {
    fontSize: theme.typography.pxToRem(17),
    position: "absolute",
    top: "18px",
    marginRight: "10px",
  },
  cardContent: {
    padding: "30px",
    minHeight: "calc(100vh - 120px)",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "20px",
      minHeight: "calc(100vh - 64px)",
    },
  },
  footerText: {
    fontSize: theme.typography.pxToRem(12),
    marginTop: "20px",
    color: "#9f9e9e",
  },
  errorText: {
    color: "#ff0000",
    fontSize: theme.typography.pxToRem(10),
    marginLeft: "0px",
    marginRight: "0px",
  },
  confirmationModal: {
    padding: "30px",
  },
  uploadDragableUpload: {
    width: "100%",
    height: "400px",
    position: "relative",
  },
  uploadPlaceholderCt: {
    width: "100%",
    height: "400px",
    border: "1px solid #f1f1f1",
    borderRadius: "10px",
    "& img": {
      width: "100%",
      height: "400px",
      objectFit: "contain",
    },
  },
  progress: {
    width: "100%",
    margin: "30px 0px",
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f2f2f2",
      height: "8px",
      borderRadius: "5px",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#4fa11b",
      },
    },
  },
  dropdownList: {
    fontSize: theme.typography.pxToRem(14),
    outline: 0,
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  selectedLanguages: {
    minHeight: "150px",
    backgroundColor: "transparent",
    border: "1px solid #61c1fc",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  newLanguageButton: {
    fontSize: theme.typography.pxToRem(12),
    color: "#54b948",
    fontWeight: 700,
    marginTop: "8px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  selectedLanguagesChip: {
    backgroundColor: "#61c1fc",
    color: "#fff",
    fontSize: theme.typography.pxToRem(18),
    margin: "10px",
    padding: "10px",
    height: "40px",
    borderRadius: "20px",
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
  locationSetUpHeading: {
    fontSize: theme.typography.pxToRem(30),
    color: theme.custom.black86,
    margin: "40px 0px",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(18),
      margin: "20px 0px",
    },
  },
  locationSetupButton: {
    height: "220px",
    width: "220px",
    textTransform: "none",
    borderRadius: "50%",
    fontSize: theme.typography.pxToRem(26),
    margin: "10px 0px",
  },
  locationSetUpFooter: {
    fontSize: theme.typography.pxToRem(16),
    color: "#ff0000",
    margin: "40px 0px",
  },
  suggestion: {
    background: "#fff",
    padding: "10px",
    color: "#474747",
    height: "40px",
    margin: "10px",
    fontSize: theme.typography.pxToRem(18),
    borderRadius: "25px",
    border: "1px solid #474747",
    "&:hover": {
      backgroundColor: "#fff",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px 0px 8px 0px",
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
  selectionHeading: {
    fontSize: theme.typography.pxToRem(18),
    marginTop: "20px",
  },
  listAutoComplete: {
    float: "left",
    "& .MuiChip-root": {
      backgroundColor: "#fff !important",
      border: "1px solid #ccc",
    },
    backgroundColor: "#fff !important",
  },
  modalClose: {
    position: "absolute",
    right: -5,
    top: -27,
  },
  closeIcon: {
    fontSize: "30px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  addNewModalContent: {
    textAlign: "center",
  },
  modalHeading: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(24),
    margin: "20px 0px",
    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "0px",
    },
  },
  modalDesc: {
    color: "#474747",
    fontSize: theme.typography.pxToRem(14),
    margin: "20px 0px",
    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "0px",
    },
  },
  addPlaceInput: {
    height: "48px",
    width: "84%",
    border: "1px solid #0092DD",
    borderRadius: "25px",
    padding: "15px",
    margin: "10px",
  },
  modalLowerDesc: {
    color: "#9f9e9e",
    fontSize: theme.typography.pxToRem(12),
    marginBottom: "25px",
    padding: " 25px 50px",
  },
  locationAddressField: {
    padding: "0px 20px",
  },
  locationAddressFieldColor: {
    color: theme.palette.primary.main,
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
  drawerHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    height: "128px",
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
  mbUserProfileName: {
    color: "#fff",
    marginTop: "30px",
    fontSize: theme.typography.pxToRem(16),
  },
  mbUserProfileArea: {
    color: "#fff",
    fontSize: theme.typography.pxToRem(13),
  },
  mbDialogPaper: {
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px",
    },
  },
  mapLocationCardContent: {
    padding: "0px",
  },
  mapLocationSearchBtn: {
    borderRadius: "0px",
    width: "100%",
    height: "60px",
    backgroundColor: "#0092DD !important",
    color: "#fff",
  },
  mapLocationDisabledSearchBtn: {
    borderRadius: "0px",
    width: "100%",
    height: "60px",
    backgroundColor: "#ccc !important",
    color: "#fff !important",
  },
  searchFlagIcon: {
    width: "40px",
    height: "40px",
  },
  myLocationContainer: {
    position: "fixed",
    bottom: "75px",
    right: "20px",
    zIndex: 9999,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50px",
    boxShadow: "0px 1px 2px " + theme.custom.black36,
    color: "#fff",
  },
  myLocationContainerWeb: {
    position: "absolute",
    bottom: "120px",
    right: "8px",
    zIndex: 9999,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50px",
    boxShadow: "0px 1px 2px " + theme.custom.black36,
    color: "#fff",
  },
  myLocationContainerEnable: {
    backgroundColor: "#ffffff",
  },
  mbSelectedLifestyles: {
    minHeight: "100px",
  },
  qongfusDivider: {
    boxShadow: "0 0 5px #b2b2b2",
  },

  qongfuModal: {
    margin: "50px 15px 15px 15px",
  },
  flagAdornment: {
    border: "1px solid #61c1fc",
    borderRadius: "44px",
    height: "56px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  countriesModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dateRangeIcon: {
    color: theme.palette.primary.main,
  },
  profileImage: {
    display: "inline-block",
    marginLeft: "15px",
    marginBottom: "-12px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
      marginBottom: "-12px",
    },
  },

  searchedLanguageChip: {
    fontSize: theme.typography.pxToRem(18),
    border: "1px solid #919191",
    color: "#919191",
    height: "35px",
    borderRadius: "18px",
    backgroundColor: "#fff",
    margin: "5px",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px 8px 8px 0px",
    },
    "&:hover": {
      backgroundColor: "#61c1fc",
      color: "#fff",
      border: "0px",
    },
  },
  searchedLanguagesSection: {
    height: "160px",
    overflowY: "auto",
    borderRadius: "10px",
    borderTop: "0px",
    border: "1px solid #ababab",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    "& .MuiAutocomplete-groupLabel": {},
  },
  searchedSection: {
    height: "160px",
  },
  noResulFindText: {
    fontSize: theme.typography.pxToRem(12),
  },
  notFindLanguageText: {
    color: "#9f9e9e",
    fontSize: theme.typography.pxToRem(18),
  },
  addNewButton: {
    color: theme.palette.primary.main,
    float: "right",
    padding: "0px",
  },
  languageModal: {
    margin: "50px 15px 15px 15px",
  },
  languagesList: {
    backgroundColor: "#fff",
  },
}));

export default useStyles;
