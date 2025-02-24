import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import useStyles from "../../Styles/components/userCard";

export default function OutlinedTextFields() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia2} image="specialist1.jpeg" title="Image title" />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          <b>Jamie Reid Borja</b>
        </Typography>
        <Typography align="center">Taekwondo Trainer</Typography>
        <Typography align="center">
          <StarIcon color="primary" fontSize="small" />
          <StarIcon color="primary" fontSize="small" />
          <StarIcon color="primary" fontSize="small" />
          <StarIcon color="primary" fontSize="small" />
          <StarBorderIcon color="primary" fontSize="small" />
        </Typography>
        <Typography align="center">Manama, Bahrain</Typography>
      </CardContent>
    </Card>
  );
}
