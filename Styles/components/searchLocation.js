import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  searchInput: {
    backgroundColor: "#fcfcfb",
    height: "39px",
    borderRadius: "28px",
    width: "100%",
    paddingLeft: "15px",
    fontSize: "15px",
    border: "1px solid #a4a4a4",
  },
  inputWidth: {
    width: "95%",
    marginBottom: "20px",
  },
  errorText: {
    color: "#ff0000",
    fontSize: theme.typography.pxToRem(10),
    marginLeft: "0px",
    marginRight: "0px",
  },
  searchContainer: {
    width: "100%",
    marginBottom: "20px",
  },
  placeSearchCt: {
    width: "calc(100% - 100px)",
  },
  placeSearchInput: {
    backgroundColor: "#fcfcfb",
    borderRadius: "28px",
    width: "100%",
    paddingLeft: "15px",
    fontSize: "15px",
    border: "1px solid #a4a4a4",
  },
  placeRootCt: {
    width: "100%",
  },
}));
export default useStyles;
