import React, { FunctionComponent } from "react";
import { Card, CardMedia, CardActionArea, CardActions } from "@material-ui/core";
import Link from "next/link";
import useStyles from "../../Styles/components/welcomeToQongfu";

interface Props {
  name: string;
  href: string;
  as: string;
}

const CategoryCard: FunctionComponent<Props> = ({ name, href, as }) => {
  const classes = useStyles();
  return (
    <Card elevation={3} className={classes.carouselCardMb}>
      <Link href={href} as={as}>
        <a className={classes.categoryCardLink}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={name}
              width="105"
              height="92"
              image="/assets/img/filter image sports.png"
              title={name}
            />
          </CardActionArea>
          <CardActions className={classes.categoryCardAction}>
            <div className={classes.categoryCardLink}>{name}</div>
          </CardActions>
        </a>
      </Link>
    </Card>
  );
};

export default CategoryCard;
