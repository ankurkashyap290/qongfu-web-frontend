import React, { FunctionComponent } from "react";
import _ from "lodash";
import { Typography, Card, CardContent } from "@material-ui/core";
import useStyles from "../../Styles/components/accountSettings";
import { getIsMobile } from "../../utils";
import LifestylesAndQogfusUpdate from "../LifestylesAndQongfus/LifestylesAndQogfusUpdate";

interface Props {}

const LifestylesAndQongfus: FunctionComponent<Props> = ({}) => {
  const isMobile = getIsMobile();
  const classes = useStyles();

  return (
    <Card className={classes.mainCard}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" className={classes.headingText}>
          Lifestyles and Qongfu
        </Typography>
        <Typography variant="body1" className={classes.DescriptionText}>
          Add Lifestyles & Qongfu to personalize your search results and maximize your overall
          experience.
        </Typography>
        <div style={{ width: isMobile ? "100%" : "70%", margin: "auto" }}>
          <LifestylesAndQogfusUpdate
            selectionFieldLabel="Your Current Selection:"
            submitButtonText="Update"
            selectionBoxMaxWidth={720}
            successDialog={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LifestylesAndQongfus;
