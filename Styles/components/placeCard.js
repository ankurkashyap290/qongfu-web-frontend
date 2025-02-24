import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxShadow: "0px 1px 2px " + theme.custom.black36,
    cursor: "pointer",
    borderRadius: "10px",
  },
  carouselCard: {
    [theme.breakpoints.down("xs", "sm")]: {
      margin: "auto",
      // marginBottom: "25px",
    },
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 1px 2px " + theme.custom.black36,
    cursor: "pointer",
    borderRadius: "10px",
  },
  cardMedia: {
    paddingTop: "40%", // 16:9
    // [theme.breakpoints.down("xs", "sm")]: {
    //   paddingTop: "35%",
    // },
  },
  cardContent: {
    flexGrow: 1,
    padding: "9px",
    [theme.breakpoints.down("xs", "sm")]: {
      padding: "10px 16px 0px 16px",
    },
    "&:last-child": {
      padding: "10px !important",
    },
  },

  emptyIcon: {
    color: "transparent",
  },
  icon: {
    verticalAlign: "middle",
    fontSize: "24px",
    marginRight: theme.spacing(1),
  },
  placeName: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,
  },
  open: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    color: "#54b948",
  },
  closed: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    color: "red",
  },
  time: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(14),
    color: "#5d5d5d",
  },
  location: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(14),
    color: "#5d5d5d",
  },
  city: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(14),
    color: "#ababab",
  },
  icon2: {
    verticalAlign: "middle",
    color: theme.palette.secondary.main,
    fontSize: "18px",
    marginRight: theme.spacing(2),
  },
  review: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(14),
  },
  ratingButton: {
    backgroundColor: "#333333",
    color: "#fff",
    float: "right",
    height: "28px",
    minWidth: "52px",
    borderRadius: "14px",
    padding: "0px  15px",
    opacity: "0.8",
    "&:hover": {
      backgroundColor: "#333333",
      color: "#fff",
      opacity: "0.8",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(10),
    },
  },
  carouselCardContent: {
    padding: "12px",
    paddingBottom: "12px",
  },
  carouselCardMedia: {
    paddingTop: "35%", // 16:9
    [theme.breakpoints.down("xs", "sm")]: {
      paddingTop: "35%",
    },
  },

  textOverflow: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "calc(100% - 24px)",
  },
}));

export default useStyles;
