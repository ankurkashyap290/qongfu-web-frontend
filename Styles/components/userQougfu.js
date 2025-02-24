import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  heroContent: {
    height: "900px",
    backgroundImage: 'url("/assets/img/landingImage.png")',
    backgroundRepeat: "no-repeat",
    transition: "opacity 1s ease-in-out",
    backgroundPositionX: "-131px",
    backgroundPositionY: "70px",
    marginTop: 70,
    overflow: "hidden",
    backgroundColor: "#ffffff",
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
