import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  cardMedia2: {
    // 16:9
    marginTop: 45,
    borderRadius: "50%",
    width: "33%",
    height: "130px",
    margin: "auto",
  },
  cardContent: {
    flexGrow: 1,
  },
}));
export default useStyles;
