import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    margin: "auto",
    maxWidth: "100%",
    backgroundColor: "#f8fcff",
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
    lineHeight: "33px",
  },
  moreBtn: {
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    padding: "13px 45px",
  },
  listHeading: {
    fontSize: theme.typography.pxToRem(18),
    color: "#71828a",
  },
  listItemtext: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.secondary.main,
  },
  descRoot: {
    width: "100%",
    maxWidth: "380px",
    marginLeft: "30px",
  },
  downloadSection: {
    paddingTop: "50px",
  },
  checkedIcon: {
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
