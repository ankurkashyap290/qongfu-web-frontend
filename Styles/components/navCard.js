import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: 100,
  },
  cardContent: {
    flexGrow: 1,
    height: 20,
  },
}));

export default useStyles;
