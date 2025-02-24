import React, { FunctionComponent, useState } from "react";
import { Grid, Typography, Avatar, Divider, Button, Dialog } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../../Styles/components/PlaceDetails/placeDetailCards";
import { Rating } from "../../redux/actionTypes";
import StarRating from "../StarRating";
import RateUs from "./rateUs";
import moment from "moment";
interface Props {
  reviews: Rating[] | undefined;
  ratingCount: number | null;
  logo: string;
  name: string;
}

const RatingsAndReviews: FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { reviews, ratingCount, logo, name } = props;
  const [listLimit, setListLimit] = useState(3);
  const [rateUsModalVisibility, setRateUsModalVisibility] = useState(false);

  const handleLoadMoreList = () => {
    setListLimit(listLimit + 3);
  };

  const handleRateUsModal = () => {
    setRateUsModalVisibility(true);
  };

  const handleModalClose = () => {
    setRateUsModalVisibility(false);
  };

  const renderLoadMoreList = data => {
    return data.slice(0, listLimit).map((item, index) => {
      return (
        <div key={`${item}-${index}`}>
          <Grid item container direction="row">
            <Grid item xs={6} xl={6} md={6} lg={6} sm={6}>
              <Grid item container direction="row">
                <Grid item xs={12} xl={3} md={3} lg={3} sm={12} className={classes.hiddenSm}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://via.placeholder.com/728.png?text=review"
                    className={classes.avatar}
                  />
                </Grid>{" "}
                <Grid item xs={12} xl={9} md={9} lg={9} sm={12}>
                  <Typography gutterBottom variant="h5" component="h5" className={classes.userName}>
                    Fermie Fonda
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h5"
                    className={clsx(classes.userMembership, classes.hiddenSm)}
                  >
                    Qongfu member
                  </Typography>
                  <Typography gutterBottom variant="body2" className={classes.reviewDate}>
                    {item.updated_at ? moment(item.updated_at).format("DD-MMMM-YYYY") : null}
                  </Typography>
                  <Typography gutterBottom variant="body2" className={classes.reviewDate}>
                    Manama, Bahrain
                  </Typography>
                </Grid>
              </Grid>
            </Grid>{" "}
            <Grid item xs={12} xl={6} md={6} lg={6} sm={12}>
              <StarRating
                rating={item.stars}
                pageType="pageDetailsHeader"
                filledFontSize="35px"
                unfilledFontSize="35px"
              />
              {item.review ? (
                <div>
                  <Typography gutterBottom variant="h5" className={classes.reviewDesc}>
                    {item.review}
                  </Typography>

                  {/* <Typography gutterBottom variant="body2">
              {review.reviewDescription}
            </Typography> */}
                </div>
              ) : (
                <Typography gutterBottom variant="body2">
                  User did not leave a review
                </Typography>
              )}
            </Grid>
          </Grid>
          <Divider style={{ margin: "20px 10px" }} />
        </div>
      );
    });
  };

  return (
    <div className={classes.mainCard}>
      <Typography
        variant="h5"
        component="h5"
        style={{ paddingBottom: "20px" }}
        className={classes.hiddenSm}
      >
        Ratings & Reviews {ratingCount && `(${ratingCount})`}
      </Typography>
      <Grid item container direction="row" className={classes.hiddenXs}>
        <Grid item xs={6} xl={6} md={6} lg={6} sm={6}>
          <Typography variant="h6" component="h6" style={{ paddingBottom: "20px" }}>
            Reviews {ratingCount && `(${ratingCount})`}
          </Typography>
        </Grid>
        <Grid item xs={6} xl={6} md={6} lg={6} sm={6} style={{ textAlign: "right" }}>
          <Button size="small" variant="outlined" color="primary" onClick={handleRateUsModal}>
            Rate us
          </Button>
        </Grid>
      </Grid>
      {reviews?.length && reviews?.length > 0 ? (
        renderLoadMoreList(reviews)
      ) : (
        <span style={{ color: "#919191" }}>No reviews found.</span>
      )}
      {reviews?.length && reviews?.length > listLimit ? (
        <div style={{ textAlign: "center" }}>
          <Button color="primary" onClick={() => handleLoadMoreList()}>
            Load more
          </Button>
        </div>
      ) : null}

      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={rateUsModalVisibility}
        onClose={handleModalClose}
        maxWidth="xl"
        classes={{ root: classes.rateUsDialogRoot }}
      >
        <RateUs logo={logo} name={name} handleModalClose={handleModalClose} />
      </Dialog>
    </div>
  );
};

export default RatingsAndReviews;
