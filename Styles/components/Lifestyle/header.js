import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  headBackgroundImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#ccc",
  },
  breadcrumb: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(14),
    color: "#fff",
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "20px 20px 0px 20px",
    },
  },
  headerImageText: {
    color: "#fff",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(14),
    [theme.breakpoints.between("xs", "sm")]: {
      margin: "10px 20px 10px 20px",
    },
  },
  lifestyleHeading: {
    fontSize: theme.typography.pxToRem(80),
    fontWeight: 100,
    color: "#fff",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(40),
    },
  },
  headerText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    color: "#fff",
  },
}));

export default useStyles;
