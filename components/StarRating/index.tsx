import React, { FunctionComponent } from "react";
import Rating from "@material-ui/lab/Rating";
import { RatingStarActive, RatingStarInactive, StarFilled, StarOutlined } from "../CustomIcon";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import useStyles from "../../Styles/components/starRating";

interface Props {
  rating: number;
  pageType?: string;
  filledFontSize?: string;
  unfilledFontSize?: string;
  color?: string;
}

const StarRating: FunctionComponent<Props> = props => {
  const classes = useStyles();
  return (
    <Rating
      name="customized-empty"
      defaultValue={props.rating}
      readOnly
      icon={
        props.pageType === "pageDetailsHeader" ? (
          <StarFilled style={{ fontSize: `${props.filledFontSize}` }} />
        ) : props.pageType === "placeCard" ? (
          <StarIcon
            style={{ fontSize: `${props.filledFontSize}` }}
            classes={{
              root:
                props.color && props.color === "primary"
                  ? classes.starRatingPrimary
                  : classes.starRating,
            }}
          />
        ) : (
          <RatingStarActive fontSize="inherit" />
        )
      }
      emptyIcon={
        props.pageType === "pageDetailsHeader" ? (
          <StarOutlined style={{ fontSize: `${props.unfilledFontSize}` }} />
        ) : props.pageType === "placeCard" ? (
          <StarBorderIcon
            style={{ fontSize: `${props.unfilledFontSize}` }}
            classes={{
              root:
                props.color && props.color === "primary"
                  ? classes.starRatingPrimary
                  : classes.starRating,
            }}
          />
        ) : (
          <RatingStarInactive fontSize="inherit" />
        )
      }
    />
  );
};

export default StarRating;
