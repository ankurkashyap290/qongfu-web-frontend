import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: "5px",
    maxWidth: "100%",
  },

  leftgrid: {
    marginLeft: "15%",
    marginTop: "80px",
  },
  rightgrid: {
    marginLeft: "10%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  headingText: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 400,
    color: "#5d5d5d",
  },
  desc: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.secondary.main,
  },
  moreBtn: {
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    padding: "13px 45px",
  },
  staticStyledImage: {
    padding: "46px 0px",
  },
}));

export default useStyles;
