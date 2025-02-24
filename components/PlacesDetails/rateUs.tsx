import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { Typography, Avatar, Button, TextField, Grid, Link } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "../../Styles/components/PlaceDetails/head";
import { RatingStarInactive, RatingScore } from "../CustomIcon";
import { savePlaceRating } from "../../redux/actions/places";
import { Places, User } from "../../redux/actionTypes";

interface Props {
  logo: string;
  name: string;
  handleModalClose: any;
  savePlaceRating: typeof savePlaceRating;
  token: string | null;
  selectedPlace: Places | null;
  dialogInfo: any;
  profile: User | null;
  reviewError: string | null;
}

const RateUs: FunctionComponent<Props> = props => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [isEdited, setEditMode] = React.useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = React.useState(false);
  const {
    logo,
    name,
    handleModalClose,
    savePlaceRating,
    token,
    selectedPlace,
    dialogInfo,
    profile,
    reviewError,
  } = props;
  useEffect(() => {
    if (token) {
      if (selectedPlace && selectedPlace.ratings) {
        const review = selectedPlace.ratings.find(
          rating =>
            //@ts-ignore
            parseInt(rating.user_id, 10) === parseInt(profile && profile.id, 10)
        );
        if (review) {
          setAlreadySubmitted(true);
        }
      }
    }
  }, []);
  const classes = useStyles();
  const handleRatingChange = value => {
    setEditMode(true);
    setRating(value);
  };
  const handleReviewChange = evt => {
    setEditMode(true);
    setReview(evt.target.value);
  };
  const handleSubmitRating = () => {
    savePlaceRating(
      {
        //@ts-ignore
        id: selectedPlace && selectedPlace.id,
        stars: rating,
        review,
      },
      token
    );
  };
  return (
    <form
      onSubmit={() => {
        return false;
      }}
    >
      <div className={classes.rateUsContainer}>
        <Typography variant="h5" className={classes.rateUsModalHeading}>
          Rate Us!
        </Typography>
        <Grid container justify="center">
          <Avatar src={logo} alt={`${name}-logo`} className={classes.bigModalAvatar} />
        </Grid>
        <Typography variant="body1" className={classes.rateUsModalPlaceName}>
          {name}
        </Typography>

        {token === "null" ? (
          <div>
            <Typography variant="body1" className={classes.rateUsModalAlreadySubmit}>
              Please sign-in to give rating and feedback
            </Typography>
            <div className={classes.loginLink}>
              <Link href="/sign-in">Sign In</Link>
            </div>
          </div>
        ) : alreadySubmitted || reviewError ? (
          <div>
            <Typography variant="body1" className={classes.rateUsModalAlreadySubmit}>
              We have your rating and feedback for this place.
            </Typography>
          </div>
        ) : (
          <div>
            {dialogInfo && dialogInfo.dialogCode === "saved-place-rating" && dialogInfo.open ? (
              <div>
                <div className={classes.rateUsFeedbackBadge}>
                  <RatingScore style={{ fontSize: "100px" }} />
                  <Typography className={classes.rateUsRating}>{rating}</Typography>
                </div>
                <Typography variant="body1" className={classes.rateUsModalFeedback}>
                  Rating Submitted{" "}
                </Typography>
                <Typography variant="body1" className={classes.rateUsModalThanksText}>
                  Thanks for your feedback!
                </Typography>
              </div>
            ) : (
              <div>
                <Rating
                  name="hover-feedback"
                  precision={1}
                  value={rating}
                  emptyIcon={<RatingStarInactive fontSize="inherit" />}
                  onChange={(evt, value) => {
                    evt.preventDefault();
                    handleRatingChange(value);
                  }}
                  style={{ textAlign: "left" }}
                />
                <Typography variant="body1" className={classes.rateUsModalText}>
                  Give a Complement
                </Typography>
                <Typography variant="body1" className={classes.complimentLabel}>
                  WRITE A REVIEW
                </Typography>
                <TextField
                  id="filled-full-width"
                  variant="outlined"
                  placeholder="Write a review here"
                  multiline
                  rows="4"
                  fullWidth
                  onChange={handleReviewChange}
                  InputProps={{
                    classes: {
                      root: classes.inputBorder,
                    },
                  }}
                />
              </div>
            )}
          </div>
        )}

        {token === "null" ? null : (
          <div>
            {" "}
            <Typography
              variant="body1"
              className={classes.rateUsModalText}
              style={{ marginTop: "10px" }}
            >
              Your support to the
            </Typography>
            <Typography variant="h5" className={classes.rateUsModalHeading}>
              Qongfu Community
            </Typography>
            <Typography variant="body1" className={classes.rateUsModalText}>
              is much appreciated!
            </Typography>
          </div>
        )}
        {alreadySubmitted ||
        reviewError ||
        (dialogInfo && dialogInfo.dialogCode === "saved-place-rating" && dialogInfo.open) ? (
          <Button
            className={classes.submitButtonEnable}
            variant="contained"
            color="primary"
            style={{ width: "175px" }}
            onClick={() => handleModalClose()}
          >
            Done
          </Button>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={!isEdited}
              style={{ width: "175px" }}
              className={isEdited ? classes.submitButtonEnable : classes.submitButtonDisable}
              disableRipple
              onClick={() => handleSubmitRating()}
            >
              Submit
            </Button>
            <br />
            <Button className={classes.rateUsCancelButton} onClick={() => handleModalClose()}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
    selectedPlace: appState.places.place,
    reviewError: appState.places.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RateUs);
