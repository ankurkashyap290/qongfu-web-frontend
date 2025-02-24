import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minWidth: "290px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  advanceSearchRoot: {
    padding: "10px 24px",
    backgroundColor: "rgba(212, 236, 250,.86)",
    borderRadius: "10px",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "0px",
      backgroundColor: "#fff",
      borderRadius: 0,
      boxShadow: "none",
      overflow: "hidden", // to fix scroll
    },
  },
  advanceSearchHead: {
    color: "#707070",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0px 5px 0px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginTop: "0px",
      borderTop: "1px solid #ccc",
    },
  },
  advanceSearchHeadLabel: {
    color: "#707070",
    marginTop: "10px",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    padding: "0px 8px",
  },
  advanceSearchLabel: {
    backgroundColor: "#ffffff",
    color: theme.palette.primary.main,
    width: "100%",
    textTransform: "capitalize",
    borderRadius: "25px",
    padding: "7px 20px",
    boxShadow: "0 0 5px #b2b2b2",
    justifyContent: "flex-start",

    "&:hover": {
      backgroundColor: "#ffffff",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      borderRadius: "0px",
      boxShadow: "none",
    },
  },
  labelText: {
    paddingLeft: "10px",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    [theme.breakpoints.between("xs", "sm")]: {
      color: theme.palette.primary.main,
    },
  },
  filterIcon: {
    verticalAlign: "middle",
    color: theme.palette.primary.main,
  },
  filterGreyIcon: {
    color: theme.palette.secondary.main,
  },
  advSearchExpendedPanel: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
    borderRadius: "30px !important",
    margin: "0px !important",
    marginBottom: "9px !important",
    "&:hover": {
      boxShadow: "none !important",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      marginBottom: "0px !important",
    },
    "&:before": {
      height: "0px !important",
    },
  },
  advSearchExpansionPanelSummary: {
    backgroundColor: "#ffffff",
    "&:hover": {
      boxShadow:
        "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      "&:hover": {
        boxShadow: "none",
      },
    },
  },
  advSearchMarginBottom: {
    marginBottom: "9px",
    padding: "0 5px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginBottom: "0px",
      padding: "0",
    },
  },
  advSearchExpansionPanelSummaryExpanded: {
    minHeight: "0px !important",
  },
  advSearchExpansionPanelSummaryContent: {
    margin: "0px !important",
    [theme.breakpoints.between("xs", "sm")]: {
      color: theme.palette.secondary.main,
      paddingLeft: "20px",
    },
  },
  advanceSearchFontFamily: {
    fontFamily: "'Poppins', sans-serif",
  },
  checkboxLabel: {
    paddingLeft: "10px",
    fontSize: theme.typography.pxToRem(14),
    color: "#5b5b5b",
    fontFamily: "'Roboto', sans-serif",
    textTransform: "capitalize",
    [theme.breakpoints.between("xs", "sm")]: {
      paddingLeft: "0px",
    },
  },
  advanceSearchAreaCitiesLabel: {
    display: "flex",
    backgroundColor: "#ffffff",
    color: "#707070",
    width: "100%",
    textTransform: "capitalize",
    borderRadius: "25px",
    marginBottom: "10px",
    padding: "0px 7px 0px 10px",
    whiteSpace: "nowrap",
    justifyContent: "space-between",
    boxShadow: "0 0 5px #b2b2b2",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  advanceSearchAreaCitiesLabelText: {
    fontSize: theme.typography.pxToRem(12),
    fontFamily: "'Poppins', sans-serif",
    padding: "0px 8px",
    marginTop: "15px",
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.pxToRem(10),
    },
  },
  advanceSearchAreaCitiesBtnLabelText: {
    fontSize: theme.typography.pxToRem(12),
    fontFamily: "'Poppins', sans-serif",
    padding: "6px 0px 6px 21px",
  },
  advanceSearchExpansionDetail: {
    padding: "10px !important",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "10px !important",
    },
  },
  advanceSearchNearBy: {
    padding: "15px 10px 15px 20px",
  },
  advanceSearchNearByBottom: {
    boxShadow: "0 0 5px #b2b2b2",
    marginBottom: "9px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    [theme.breakpoints.between("xs", "sm")]: {
      borderRadius: "0px",
    },
  },
  advanceSearchNearByPrimary: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: "'Poppins', sans-serif",
    color: "#707070",
    fontWeight: 500,
  },
  advanceSearchNearBySecondary: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: "'Poppins', sans-serif",
    color: "#9d9b9b",
  },
  advanceSearchSelectionRoot: {
    width: "100%",
    padding: "2px 17px",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
  advanceSearchTextPrimary: {
    paddingRight: "0px",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
  advSearchExpansionPanelSummaryRoot: {
    padding: "0px 8px 0px 22px !important",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "10px 0px !important",
      borderTop: "1px solid #ccc",
    },
  },
  resetLabel: {
    textTransform: "capitalize",
    fontSize: theme.typography.pxToRem(14),
  },
  advanceSearchFromGroupRoot: {
    marginLeft: "20px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: "0px",
    },
  },
  advSearchMarginFilterBottomBottom: {
    marginTop: "10px",
    textAlign: "center",
  },
  advanceSearchHideFilters: {
    textTransform: "capitalize",
    backgroundColor: "#ffffff",
    width: "80%",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    width: "800px",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "30px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  headingText: {
    fontSize: theme.typography.pxToRem(24),
    color: "#707070",
    position: "absolute",
    top: 15,
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  groupName: {
    fontSize: theme.typography.pxToRem(22),
    color: "#707070",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(18),
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
  advanceSearchFormControl: {
    width: "100%",
  },
  advSearchLabelPlacementStart: {
    justifyContent: "space-between",
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: "0px !important",
    },
  },
  mbDrawerTitle: {
    textAlign: "center",
    marginBottom: "10px",
    [theme.breakpoints.between("xs", "sm")]: {
      marginTop: "10px",
    },
  },
  mbDrawerLabel: {
    display: "inline-block",
    width: "calc(100% - 128px)",
    textAlign: "center",
  },
  mbResetButton: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
    },
  },
  mbExpandIcon: {
    [theme.breakpoints.between("xs", "sm")]: {
      color: `${theme.palette.secondary.main} !important`,
      paddingRight: "20px",
    },
  },
  advSearchCollapseLabel: {
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.pxToRem(10),
    },
  },
  areaCitiesCheckbox: {
    padding: "0px 9px 9px 9px",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "0px",
    },
  },

  areasCitiesModal: {
    padding: "32px !important",
  },
  checkboxColor: {
    padding: "4px !important",
    "&checked": {
      color: "red",
    },
  },
  areaCitiesHeadingCheckbox: {
    padding: "2px 9px 9px 9px !important",
  },
  filterButton: {
    textTransform: "capitalize",
  },
  advSearchExpandIcon: {
    marginRight: "-8px !important",
  },
  areasCheckboxWidth: {
    [theme.breakpoints.between("xs", "sm")]: {
      minWidth: "30px",
    },
  },
  gridViewIcon: {
    borderRadius: "50%",
    height: "32px",
    width: "32px",
    color: "#0092DD",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  advSearchPanelLabelCt: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "5px",
    flexDirection: "row",
    [theme.breakpoints.between("xs", "sm")]: {
      justifyContent: "space-between",
    },
  },
  filterValueLabel: {
    width: "50%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    [theme.breakpoints.between("xs", "sm")]: {
      textAlign: "right",
    },
  },
  inputBorder: {
    borderRadius: "30px",
    borderColor: "#61c1fc !important",
  },
  filterNote: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.secondary.main,
    marginTop: "5px",
    marginBottom: "5px",
  },
  checkboxRegionLabel:{
    paddingLeft: "10px",
    fontSize: theme.typography.pxToRem(16),
    color: "#5b5b5b",
    fontFamily: "'Roboto', sans-serif",
    textTransform: "capitalize",
    [theme.breakpoints.between("xs", "sm")]: {
      paddingLeft: "0px",
    },
  },searchField:{
    width:'100%'
  }
}));

export default useStyles;
