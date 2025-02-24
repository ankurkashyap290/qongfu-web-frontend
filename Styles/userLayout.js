import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#fff",
    },
  },
  heroContent: {
    minHeight: "800px",
    backgroundImage: 'url("/assets/img/landingImage.png")',
    backgroundRepeat: "no-repeat",
    transition: "opacity 1s ease-in-out",
    backgroundPositionY: "bottom",
    overflow: "hidden",
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
}));

export default useStyles;
