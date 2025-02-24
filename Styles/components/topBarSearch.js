import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  searchBoxContainer: {
    position: "relative",
  },
  search: {
    padding: "6px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: "400px",
    minWidth: "200px",
    borderRadius: "25px",
  },
  searchNormal: {
    maxWidth: "500px",
    position: "relative",
    width: "100%",
    zIndex: 999,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  selectedCategory: {
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Roboto, sans-serif",
  },
  searchIcon: {
    color: theme.palette.primary.main,
  },
  searchIconBtn: {
    padding: 10,
    zIndex: 1,
    position: "relative",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "4px 10px",
    },
  },
  lifestyleSelect: {
    borderBottom: "0px",
    color: theme.palette.primary.main,
  },
  searchResultDropDown: {
    display: "block",
    width: "100%",
    top: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    borderRadius: "10px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    "& .MuiAutocomplete-groupLabel": {
      textAlign: "left",
      fontWeight: 600,
    },
  },
  searchResultList: {
    marginTop: "60px",
    padding: "10px",
  },
  searchResultListItem: {
    textAlign: "left",
    width: "100%",
    paddingBottom: theme.spacing(1.3),
    borderBottom: "1px solid #d3d3d3",
    "&:hover": {
      backgroundColor: "#fafafa",
    },
  },
  searchHeader: {
    maxWidth: "400px",
    minWidth: "200px",
    [theme.breakpoints.between("xs", "sm")]: {
      boxShadow: "none",
      backgroundColor: "#f7f7fa",
    },
  },
  listItemSubText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.secondary.main,
    fontFamily: "Poppins, sans-serif",
  },
  listItemHeading: {
    fontFamily: "Poppins, sans-serif",
    fontSize: theme.typography.pxToRem(14),
  },
  autocompleteRoot: {
    width: "80%",
    borderLeft: "1px solid #0065ab",
    position: "relative",
    zIndex: 1,
  },
  hidden: {
    display: "none",
  },
  autocompleteInputRoot: {
    borderBottom: "0px !important",
    "&:hover": {
      borderBottom: "0px !important",
    },
  },
  autocompleteOption: {
    backgroundColor: "#fff !important",
  },
  searchLifestyle: {
    maxWidth: "500px",
  },
  searchLifestyleMapView: {
    float: "right",
    width: "100%",
  },

  testPopper: {
    maxWidth: "400px",
    minWidth: "200px",
    width: "100% !important",
    zIndex: 0,
    top: "-5px",
    left: "0px",
    "& .MuiAutocomplete-paper": {
      paddingTop: "58px",
    },
  },
  autocompletePopper: {
    maxWidth: "500px",
    width: "100% !important",
    zIndex: 0,
    top: "-5px",
    left: "0px",
    "& .MuiAutocomplete-paper": {
      paddingTop: "58px",
    },
  },
  searchIconMobile: {
    padding: "4px 10px",
  },
}));

export default useStyles;
