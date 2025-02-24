import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px 16px",
    backgroundColor: "rgba(217, 238, 251, .6)",
    borderRadius: "5px",
  },
  mainContainerMapView: {
    border: "1px solid rgba(30,160,228,.2)",
    padding: "16px",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
  },
  emojiListItemIcon: {
    fontSize: "28px",
    color: "#000",
    lineHeight: 1,
  },
  selectedFilterIcon: {
    color: theme.palette.primary.main,
    verticalAlign: "middle",
  },
  filterIcon: {
    verticalAlign: "middle",
  },
  clearFilterLink: {
    textTransform: "capitalize",
    fontWeight: 600,
  },
  filterSelectedChip: {
    backgroundColor: "transparent",
    border: "1px solid #5D5D5D",
    color: "#5D5D5D",
    height: "32px",
    fontSize: theme.typography.pxToRem(14),
    margin: "5px",
    padding: "10px 0px",
    textTransform: "capitalize",
    borderRadius: "7px",
  },
}));

export default useStyles;
