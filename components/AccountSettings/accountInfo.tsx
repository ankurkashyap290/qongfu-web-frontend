import React, { FunctionComponent } from "react";
import _ from "lodash";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import useStyles from "../../Styles/components/accountSettings";
import EmailUpdate from "./EmailUpdate";
import PasswordUpdate from "./PasswordUpdate";
import MobileUpdate from "./MobileUpdate";
import AvatarUpdate from "./AvatarUpdate";

interface Props {}

const AccountInfo: FunctionComponent<Props> = () => {
  const classes = useStyles();

  return (
    <Card className={classes.mainCard}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h4" className={classes.headingText}>
              Account Info
            </Typography>
            <Typography variant="body1" className={classes.DescriptionText}>
              Lorem ipsum dolor sit amen. Lorem ipsum dolor
            </Typography>
            <EmailUpdate />
            <PasswordUpdate />
            <MobileUpdate />
            <Typography variant="body1" className={classes.footerText}>
              This is a lorem ipsum dolor. The more information you share the easier it will be for
              our team to locate the place and have them join the Qongfu Community
            </Typography>
          </Grid>
          <Grid item md={6} lg={6} className={classes.hiddenSm}>
            <AvatarUpdate />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
