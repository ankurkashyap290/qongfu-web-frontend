import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    height: "100px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    padding: "2px 4px",
    display: "inline-block",
    alignItems: "center",
    width: "25%",
    marginRight: "20px",
    borderRadius: "24px",
  },
  searchdivider: {
    height: 28,
    margin: 4,
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 4,
    width: "70%",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  logo: {
    left: "8%",
    position: "absolute",
  },
  topButtons: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  link: {
    fontSize: "15px",
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&: hove": {
      textDecoration: "none",
    },
  },
  active: {
    fontWeight: 500,
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
  acountCircle: {
    color: theme.palette.secondary.main,
  },
}));

export default useStyles;
