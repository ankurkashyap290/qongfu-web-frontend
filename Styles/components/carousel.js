import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  selectedSlide: {
    boxShadow: "0px 1px 10px rgba(0,0,0,.5)",
    borderRadius: "16px",
    margin: "16px",
  },
  placeCarouselContainer: {
    padding: "0 10px",
    // backgroundColor: "#0000001c",
    width: "100%",
    margin: "0 auto",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "0 10px",
      backgroundColor: "transparent",
    },
  },
  chevronWrapperLeft: {
    backgroundColor: "#00000033",
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "transparent",
    },
  },
  chevronWrapperRight: {
    backgroundColor: "#00000033",
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "transparent",
    },
  },
  chevronIcon: {
    fontSize: theme.typography.pxToRem(34),
  },
  chevronIconBtn: {
    minWidth: "30px",
    backgroundColor: "#fff",
    height: "64px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
}));

export default useStyles;
