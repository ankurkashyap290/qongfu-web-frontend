import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  tabContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },

  activeTab: {
    position: "absolute",
    width: "52%",
    backgroundColor: "#fff",
    textAlign: "center",
    padding: "10px",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
    boxShadow: "-6px -2px 4px -5px rgba(0,0,0,.1)",
    borderTopRightRadius: "15px",
    borderTopLeftRadius: "15px",
    top: "0px",
    right: "0px",
    color: "#5D5D5D",
    cursor: "pointer",
  },
  inactiveTab: {
    float: "left",
    width: "50%",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
    padding: "10px",
    textAlign: "center",
    borderTopRightRadius: "15px",
    color: "#919191",
    cursor: "pointer",
  },
  formContainer: {
    backgroundColor: "#fff",
    minHeight: 100,
    marginTop: 45,
    borderTopLeftRadius: 15,
    padding: 16,
  },
}));

export default useStyles;
