import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  heroContent: {
    height: "700px",
    padding: theme.spacing(9, 0, 6),
    backgroundImage: 'url("/assets/img/landingImage.png")',
    backgroundRepeat: "no-repeat",
    transition: "opacity 1s ease-in-out",
    // backgroundPositionX: "-131px",
    overflow: "hidden",
    marginTop: 100,
    [theme.breakpoints.between("xs", "sm")]: {
      marginTop: 72,
    },
  },
  hideContent: {
    opacity: 0,
    transition: "opacity 1s ease-in-out",
  },
  mbWelcomeContent: {
    marginTop: "66px",
    paddingTop: "15px",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontWeight: 500,
    lineHeight: 1.34,
    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(32),
      textAlign: "left",
      paddingLeft: "20px",
    },
  },
  welcomeSubText: {
    color: theme.custom.black60,
    marginBottom: 15,
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(24),
      textAlign: "left",
      paddingLeft: "20px",
      marginBottom: 0,
    },
  },
  welcomeLinksContainer: { marginTop: 10, textAlign: "center", whiteSpace: "nowrap" },
  link: {
    fontFamily: "Poppins, sans-serif",
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.primary.main,
    margin: "0 17px",
    textDecoration: "none",
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

  categoryCardLink: {
    textDecoration: "none",
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(10),
    },
  },
  categoryCardAction: {
    display: "block",
    textAlign: "center",
  },
  lifeStyleCarouselItem: {
    margin: "0px 17px 10px 0px",
    width: "106px !important",
  },
  carouselCardMb: {
    borderRadius: "7px",
  },
  mbMapViewBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    width: "80px",
    height: "80px",
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  mbMapViewIcon: {
    fontSize: theme.typography.pxToRem(88),
  },
  mbMapViewContainer: {
    position: "fixed",
    bottom: "30px",
    left: "calc(100% - 50% - 33px)",
  },
}));
export default useStyles;
