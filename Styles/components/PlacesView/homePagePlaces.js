import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid1: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  copyright: {
    padding: theme.spacing(6),
  },
  bar: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 4,
    width: 300,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 2,
    marginTop: 20,
    width: "100%",
  },

  root: {
    flexGrow: 1,
  },

  leftgrid: {
    marginLeft: "15%",
    marginTop: "80px",
  },

  rightgrid1: {
    marginLeft: "10%",
  },

  image: {
    width: 300,
    height: 300,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    [theme.breakpoints.between("xs", "sm")]: {
      height: "106px",
    },
  },

  open: {
    color: "#54b948",
  },

  search: {
    padding: "2px 4px",
    display: "inline-block",
    alignItems: "center",
    width: "70%",
    marginRight: "20px",
    borderRadius: "24px",
  },
  searchdivider: {
    height: 28,
    margin: 4,
  },
  logo: {
    left: "8%",
    position: "absolute",
  },

  grid: {
    width: "20%",
  },
  link: {
    fontSize: "20px",
  },
  totalPlaces: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 400,
    cursor: "pointer",
    textDecoration: "none",
  },
  advSearchMargin: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  placesMargin: {
    paddingRight: "36px",
  },
  placeHeading: {
    fontSize: theme.typography.pxToRem(32),
    fontStyle: "normal",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(28),
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  newPlace: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(20),
    marginTop: "15px",
    [theme.breakpoints.between("xs", "sm")]: {
      textAlign: "center",
    },
  },
  newPlaceAdd: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(16),
    marginTop: theme.spacing(3),
    [theme.breakpoints.between("xs", "sm")]: {
      textAlign: "center",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    position: "absolute",
    width: "676px",
    backgroundColor: "#fff",
    padding: "25px",
    textAlign: "center",
    borderRadius: "10px",
    borderColor: "#fff",
    "&:focus": {
      outline: "none",
    },
  },
  modalHeading: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(24),
    padding: " 25px 50px",
    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "0px",
    },
  },
  modalDesc: {
    color: "#474747",
    fontSize: theme.typography.pxToRem(14),

    textAlign: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      padding: "0px",
    },
  },
  modalLowerDesc: {
    color: "#9f9e9e",
    fontSize: theme.typography.pxToRem(12),
    margin: "10px 10px 25px 10px",
  },
  successModalHeading: {
    fontSize: theme.typography.pxToRem(48),
    color: theme.palette.primary.main,
  },
  successModalConfirm: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.primary.main,
  },
  successModalDesc: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.custom.black60,
    margin: "25px 70px",
  },
  closeIcon: {
    fontSize: "30px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  directionIcon: {
    float: "right",
  },
  noResultFoundTitle: {
    fontSize: theme.typography.pxToRem(32),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  notResultFoundContainer: {
    marginTop: "90px",
    marginBottom: "90px",
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
  mbArrowDown: {
    marginLeft: "20px",
    verticalAlign: "bottom",
  },
  filterIcon: {
    verticalAlign: "middle",
  },
  selectedSortItem: {
    justifyContent: "flex-end",
  },
  placesNotFoundContainer: {
    marginLeft: 138,
    marginRight: 138,
    [theme.breakpoints.between("xs", "sm")]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  addNewPlaceBtn: {
    color: "#0099dd",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
    },
  },
  mbNoPlaceDrawerClose: {
    width: "100%",
    textAlign: "right",
    padding: "20px",
  },
  mbNoPlaceDrawerPaper: {
    margin: "60px 15px 0px 15px",
  },
  addNewPlaceClose: {
    width: "100%",
    textAlign: "right",
    padding: "30px",
  },
  modalClose: {
    position: "absolute",
    top: 25,
    right: 8,
  },
  addNewModalContent: {
    textAlign: "center",
    width: "70%",
    margin: "auto",
  },
  mbAddNewPlacePaper: {
    margin: "60px 10px 0px 10px",
  },
  filterMenuMb: {
    width: "85%",
    borderRadius: "7px",
  },
  selectedFilter: {
    color: theme.palette.primary.main,
  },
  selectedFilterIcon: {
    color: theme.palette.primary.main,
    verticalAlign: "middle",
  },
  indexPageMain: {
    "& .infinite-scroll-component__outerdiv": {
      width: "100%",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      backgroundColor: "#fff",
    },
  },
  mbMapViewIcon: {
    fontSize: theme.typography.pxToRem(88),
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
  mbMapViewContainer: {
    position: "fixed",
    bottom: "30px",
    left: "calc(100% - 50% - 33px)",
  },
  searchMapView: {
    position: "absolute",
    left: "16px",
    top: "8px",
    zIndex: "999",
    // height: "calc(100vh - 120px)",
  },
  errorText: {
    color: "#ff0000",
    fontSize: theme.typography.pxToRem(14),
    textAlign: "center",
  },
  inputBorder: {
    borderRadius: "30px",
    borderColor: "#61c1fc !important",
  },
  inputFields: {
    borderRadius: "27px",
    width: "95%",
    marginBottom: "20px",
  },
}));

export default useStyles;
