import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../Styles/components/navCard";

export default function OutlinedTextFields(props: {
  image: string | undefined;
  name: React.ReactNode;
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={props.image} title="Image title"></CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography align="center">{props.name}</Typography>
      </CardContent>
    </Card>
  );
}
