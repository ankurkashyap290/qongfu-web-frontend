import React, { FunctionComponent } from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import moment from "moment";
import useStyles from "../../Styles/components/profile";
import { User } from "../../redux/actionTypes";
import { ClientIcon, LifestyleIconColored } from "../CustomIcon";
import HomeIcon from "@material-ui/icons/Home";
import RedeemIcon from "@material-ui/icons/Redeem";
interface Props {
  isMobile?: boolean;
  profile: User | null;
}

const MoreInfo: FunctionComponent<Props> = ({ profile }) => {
  const classes = useStyles();
  //@ts-ignore
  const selectedLifestyles = profile ? profile.lifestyles : [];
  //@ts-ignore
  const selectedLanguages = profile ? profile.languages : [];

  return (
    <React.Fragment>
      <Grid container direction="row" style={{ marginBottom: "10px" }}>
        <Grid item sm={4} xs={4} md={4} lg={4} xl={3}>
          <LifestyleIconColored className={classes.verticalIcon} />

          <span className={classes.moreInfo}>Lifestyles</span>
        </Grid>
        <Grid item sm={2} xs={2} md={2} lg={2} xl={2}>
          :
        </Grid>

        <Grid item sm={4} xs={4} md={6} lg={6} xl={7}>
          <span className={classes.aboutUsDesc}>
            {selectedLifestyles && selectedLifestyles.length && selectedLifestyles.length > 0 ? (
              <div>
                {selectedLifestyles &&
                  selectedLifestyles.map((item, index) => {
                    if (index === selectedLifestyles.length - 1) {
                      return `${item.lifestyle}`;
                    } else {
                      return `${item.lifestyle}, `;
                    }
                  })}
              </div>
            ) : null}
          </span>
        </Grid>
      </Grid>

      <Grid container direction="row" style={{ marginBottom: "10px" }}>
        <Grid item sm={4} xs={4} md={4} lg={4} xl={3}>
          <RedeemIcon className={classes.verticalIcon} />
          <span className={classes.moreInfo}>Birthdate</span>
        </Grid>
        <Grid item sm={2} xs={2} md={2} lg={2} xl={2}>
          :
        </Grid>
        <Grid item sm={4} xs={4} md={6} lg={6} xl={7}>
          <span className={classes.aboutUsDesc}>
            {//@ts-ignore
            profile && moment(profile.date_of_birth).isValid()
              ? moment(profile.date_of_birth).format("MMMM Do YYYY")
              : ""}
          </span>
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ marginBottom: "10px" }}>
        <Grid item sm={4} xs={4} md={4} lg={4} xl={3}>
          <ClientIcon className={classes.verticalIcon} />
          <span className={classes.moreInfo}>Gender</span>
        </Grid>
        <Grid item sm={2} xs={2} md={2} lg={2} xl={2}>
          :
        </Grid>
        <Grid item sm={4} xs={4} md={6} lg={6} xl={7}>
          <span className={classes.aboutUsDesc}>
            {//@ts-ignore
            profile
              ? profile.gender === "f"
                ? "Female"
                : profile.gender === "m"
                ? "Male"
                : "Other"
              : ""}
          </span>
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ marginBottom: "10px" }}>
        <Grid item sm={4} xs={4} md={4} lg={4} xl={3}>
          <HomeIcon className={classes.verticalIcon} />
          <span className={classes.moreInfo}>Hometown</span>
        </Grid>
        <Grid item sm={2} xs={2} md={2} lg={2} xl={2}>
          :
        </Grid>
        <Grid item sm={4} xs={4} md={6} lg={6} xl={7}>
          <span className={classes.aboutUsDesc}>
            {//@ts-ignore
            profile ? profile.hometown : ""}
          </span>
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ marginBottom: "10px" }}>
        <Grid item sm={4} xs={4} md={4} lg={4} xl={3}>
          <HomeIcon className={classes.verticalIcon} />
          <span className={classes.moreInfo}>Nationality</span>
        </Grid>
        <Grid item sm={2} xs={2} md={2} lg={2} xl={2}>
          :
        </Grid>
        <Grid item sm={4} xs={4} md={6} lg={6} xl={7}>
          <span className={classes.aboutUsDesc}>
            {/* {//@ts-ignore
              profile ? profile.nationality : ""} */}
          </span>
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ marginBottom: "10px" }}>
        <Grid item sm={4} xs={4} md={4} lg={4} xl={3}>
          <ClientIcon className={classes.verticalIcon} />
          <span className={classes.moreInfo}>Languages</span>
        </Grid>
        <Grid item sm={2} xs={2} md={2} lg={2} xl={2}>
          :
        </Grid>
        <Grid item sm={4} xs={4} md={6} lg={6} xl={7}>
          <span className={classes.aboutUsDesc}>
            {selectedLanguages && selectedLanguages.length && selectedLanguages.length > 0 ? (
              <div>
                {selectedLanguages &&
                  selectedLanguages.map((item, index) => {
                    if (index === selectedLanguages.length - 1) {
                      return `${item.language}`;
                    } else {
                      return `${item.language}, `;
                    }
                  })}
              </div>
            ) : null}
          </span>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MoreInfo;
