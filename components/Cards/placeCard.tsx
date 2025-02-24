import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import useStyles from "../../Styles/components/placeCard";
import { AuthenticatedSeal } from "../CustomIcon";
import { Button } from "@material-ui/core";
import StarRating from "../StarRating";
import { getTimeToAmPmFormat } from "../../utils";
import { IMAGE_API } from "../../config";

interface Props {
  data: any;
  carousel?: boolean;
}

const PlaceCard: FunctionComponent<Props> = ({ data, carousel }) => {
  const classes = useStyles();
  const router = useRouter();
  const handlePlaceCardDetails = (slug: string) => {
    router.push("/place-details?slug=" + slug, `/places/${slug}`);
  };

  return (
    <Card
      className={carousel ? classes.carouselCard : classes.card}
      elevation={4}
      onClick={() => handlePlaceCardDetails(data.slug)}
    >
      <CardMedia
        className={carousel ? classes.carouselCardMedia : classes.cardMedia}
        image={
          data.place_cover_url
            ? `${IMAGE_API}${data.place_cover_url}`
            : `https://via.placeholder.com/728.png?text=${data.place_name}`
        }
        title={data.place_name}
      >
        <Button className={classes.ratingButton}>
          <StarRating
            rating={data.stars || 0}
            pageType="placeCard"
            filledFontSize="19px"
            unfilledFontSize="19px"
          />
          &nbsp;
          <span className={classes.review}>
            {new Intl.NumberFormat().format(data.ratings_count || 0)}
          </span>
        </Button>
      </CardMedia>
      <CardContent className={carousel ? classes.carouselCardContent : classes.cardContent}>
        <Typography
          variant="h5"
          component="h2"
          color="primary"
          className={clsx(classes.placeName, classes.textOverflow)}
        >
          <AuthenticatedSeal className={classes.icon} />
          {data.place_name}
        </Typography>
        <Typography>
          <WatchLaterOutlinedIcon className={classes.icon2} />
          <span className={data.open_now ? classes.open : classes.closed}>
            {data.open_now ? "OPEN" : "CLOSED"}
          </span>{" "}
          <span className={classes.time}>
            {" "}
            |{" "}
            {data.open_now ? (
              <span>{`${getTimeToAmPmFormat(data.start)}-${getTimeToAmPmFormat(data.close)}`}</span>
            ) : (
              "Now"
            )}
          </span>
        </Typography>
        <div title={data.location}>
          <Typography className={classes.textOverflow}>
            <LocationOnOutlinedIcon className={classes.icon2} />
            <span className={classes.location}>{data.distance_formatted}</span>{" "}
            <span className={classes.city}>- {data.location}</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
