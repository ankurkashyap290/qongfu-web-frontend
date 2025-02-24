import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
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
  inputFields: {
    borderRadius: "27px",
    width: "95%",
    marginBottom: "20px",
  },

  inputBorder: {
    borderRadius: "30px",
    borderColor: "#61c1fc !important",
    backgroundColor: "#fcfcfb",
  },
  linkSection: {
    margin: "20px 10px",
  },
  modalLowerDesc: {
    color: "#9f9e9e",
    fontSize: theme.typography.pxToRem(12),
    marginBottom: "25px",
    padding: " 25px 50px",
  },
  qongfuModal: {
    margin: "50px 15px 15px 15px",
  },
  errorText: {
    color: "#ff0000",
  },
  weekColumn: {
    marginTop: "10px",
  },
  lifestyleHeadings: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    color: "#fff",
    height: "40px",
    borderRadius: "5px",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  lifestyleChips: {
    fontSize: theme.typography.pxToRem(14),
    color: "#fff",
    height: "32px",
    borderRadius: "16px",
    marginRight: "10px",
    marginTop: "10px",
    padding: "3px 10px 5px 10px",
  },
  moreButton: {
    float: "right",
  },
  searchedQongfus: {
    height: "160px",
    overflowY: "auto",
    width: "100%",
  },
  searchedQongfusMobile: {
    overflowY: "auto",
    margin: "0px 10px 10px 10px",
    height: "160px",
    width: "100%",
  },

  suggestionsChip: {
    fontSize: theme.typography.pxToRem(18),
    border: "1px solid #919191",
    color: "#919191",
    height: "32px",
    borderRadius: "18px",
    backgroundColor: "#fff",
    margin: "2px",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px 8px 8px 0px",
    },
  },
  suggestionHeading: {
    fontSize: theme.typography.pxToRem(18),
    color: "#474747",
    textAlign: "left",
    marginBottom: "10px",
  },
  notFindQongfuText: {
    color: "#9f9e9e",
    fontSize: theme.typography.pxToRem(18),
  },
  addNewButton: {
    color: theme.palette.primary.main,
    float: "right",
    padding: "0px",
  },
  qongfuSearchField: {
    borderRadius: "27px",
    width: "60%",
    backgroundColor: "#fcfcfb",
    marginBottom: "20px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "95%",
    },
  },
  qongfuSearchFieldThirdStep: {
    borderRadius: "27px",
    width: "100%",
    marginBottom: "20px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "95%",
    },
  },
  selectedLifestylesAndQongfusMobile: {
    minHeight: "240px",
    marginBottom: "20px",
    width: "100%",
    borderRadius: "10px",
    padding: "10px",
  },
  selectedLifestylesAndQongfusOverflow: {
    minHeight: "240px",
    backgroundColor: "#f9f9f9",
    border: "2px dashed #d9d7d7",
    marginBottom: "20px",
    width: "100%",
    borderRadius: "10px",
    padding: "10px",
    paddingBottom: "30px",
    textAlign: "left",
  },
  selectedLifestyles: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    color: "#000",
    height: "40px",
    borderRadius: "5px",
    margin: "2px",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px 8px 8px 0px",
    },
  },
  selectedQongfus: {
    fontSize: theme.typography.pxToRem(18),
    border: "1px solid #919191",
    color: "#fff",
    height: "32px",
    borderRadius: "18px",
    margin: "2px",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "0px 8px 8px 0px",
    },
  },
  collapseButton: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  qongfusCount: {
    fontSize: theme.typography.pxToRem(15),
    color: "#ccc",
    marginLeft: "10px",
  },
  mbOpenMobileDrawer: {
    backgroundColor: "#ffffff",
    boxShadow: " 0px 0 10px rgba(0, 0, 0, 0.8)",
  },
  confirmationModal: {
    padding: "30px",
  },
  submitButtonThirdStep: {
    borderRadius: "30px",
    textTransform: "capitalize",
    padding: "8px 44px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
      borderRadius: "0px",
      height: "56px",
    },
  },
  submitButton: {
    width: "350px",
    borderRadius: "30px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
      borderRadius: "0px",
    },
  },
  disabledButton: {
    width: "100%",
    borderRadius: "0px",
    height: "56px",
    backgroundColor: "a4a4a4",
    color: "#fff",
  },
  selectionHeading: {
    fontSize: theme.typography.pxToRem(18),
    marginTop: "20px",
  },
}));

export default useStyles;
