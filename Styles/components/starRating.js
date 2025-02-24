import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  starRating: {
    color: "#fff",
  },
  starRatingPrimary: {
    color: theme.palette.primary.main,
  },
}));
export default useStyles;
