import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  mainCard: {
    backgroundColor: theme.custom.offWhite,
    borderRadius: "10px",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "#ffffff",
      borderRadius: "0px",
      boxShadow: "none",
      marginRight: "0px",
    },
  },
  scheduleIcon: {
    verticalAlign: "middle",
    color: "#54b948",
    fontSize: theme.typography.pxToRem(16),
  },
  scheduleIconClosed: {
    verticalAlign: "middle",
    color: "#ff000",
    fontSize: theme.typography.pxToRem(16),
  },
  todayOpen: {
    fontSize: theme.typography.pxToRem(16),
    color: "#54b948",
    fontWeight: 500,
  },
  todayClosed: {
    fontSize: theme.typography.pxToRem(16),
    color: "#ff0000",
  },
  todayTime: {
    fontSize: theme.typography.pxToRem(16),
    color: "#474747",
    marginLeft: "26px",
  },
  weekDay: {
    fontSize: theme.typography.pxToRem(16),
    color: "#5d5d5d",
    padding: "10px 0px",
  },
  weekColumn: {
    marginTop: "10px",
  },
  weekDayActive: {
    fontSize: theme.typography.pxToRem(16),
    color: "#5d5d5d",
    fontWeight: 800,
    padding: "10px 0px",
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "#e8f6fd",
    },
  },
  address: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.secondary.main,
  },
  mediaCard: {
    height: "213px",
  },
  media: {
    height: "160px",
  },
  mediaDesc: {
    color: theme.palette.secondary.main,
    paddingTop: theme.spacing(2),
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "16px 0px",
    },
  },
  mediaGalleryLink: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.primary.main,
    float: "right",
  },
  aboutUsHeading: {
    color: "#5d5d5d",
  },
  aboutUsDesc: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  moreInfo: {
    width: "50px",
    color: "#333333",
    marginLeft: "10px",
  },
  moreInfoLabel: {
    fontSize: theme.typography.pxToRem(16),
    fontFamily: "'Poppins', sans",
    color: "#919191",
    fontWeight: 600,
  },
  moreInfoValue: {
    fontSize: theme.typography.pxToRem(16),
    fontFamily: "'Poppins', sans",
    color: "#919191",
    fontWeight: 400,
  },
  smallMediaCards: {
    height: "160px",
    marginBottom: theme.spacing(2.4),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  avatar: {
    height: "90px",
    width: "90px",
  },
  userName: {
    fontSize: theme.typography.pxToRem(20),
    color: "#474747",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  userMembership: {
    fontSize: theme.typography.pxToRem(16),
    color: "#5d5d5d",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  reviewDate: {
    fontSize: theme.typography.pxToRem(12),
    color: "#ababab",
  },
  verticalIcon: {
    verticalAlign: "bottom",
  },
  aboutUsDescLifestyle: {
    textAlign: "right",
  },
  mediaGalleryHeading: {
    color: "#000000",
    marginTop: "20px",
  },
  mediaGalleryDesc: {
    color: "#000000",
    marginTop: "20px",
  },
  mediaInfoGlobeIcon: {
    padding: "20px",
    borderLeft: "1px solid",
    borderLeftColor: "#cccccc",
    borderRight: "1px solid",
    borderRightColor: "#cccccc",
  },
  mediaInfoAuctionIcon: {
    paddingLeft: "20px",
  },
  mediaInfoDate: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(12),
    textAlign: "right",
  },
  mediaDropdownSelected: {
    color: theme.palette.primary.main,
  },
  mediaDropdownRoot: {
    width: "285px",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "30px",
    color: theme.palette.primary.main,
    padding: "20px",
    "&:focus": {
      borderRadius: "30px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
    },
  },
  select: {
    marginTop: "20px",
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
  reviewDesc: {
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  rateUsDialogRoot: {
    zIndex: `${99999} !important`,
    top: "48px !important",
  },
  mediaCarouselDialog: {
    zIndex: `${999} !important`,
    top: "60px !important",
  },
  mediaCardActionArea: {
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  timingSpan: {
    "& span": {
      display: "block",
    },
  },
}));

export default useStyles;
