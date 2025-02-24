import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  icon: {
    verticalAlign: "middle",
    marginRight: "10px",
  },
  breadcrumbLink: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.custom.black60,
  },
  breadcrumbLinkActive: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

export default useStyles;
