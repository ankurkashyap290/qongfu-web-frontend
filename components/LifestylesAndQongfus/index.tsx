import React, { FunctionComponent, useState, useEffect } from "react";
import { Grid, Chip, Typography } from "@material-ui/core";
import useStyles from "../../Styles/components/lifestylesAndQongfus";
import _ from "lodash";

interface Props {
  lifestyles: any[];
  qongfus: any[];
  qongfuMax: number;
  systemLifestyles: any[];
}

const LifeStylesAndQongfus: FunctionComponent<Props> = ({
  lifestyles,
  qongfuMax,
  qongfus,
  systemLifestyles,
}) => {
  const classes = useStyles();
  const [selectedLifestyles, setSelectedLifestyles] = useState([] as any);
  const [selectedQongfus, setSelectedQongfus] = useState([] as any);
  const [displayMode, setDisplayMode] = useState("more");

  useEffect(() => {
    if (lifestyles.length) {
      sliceLifestyles(3);
    }
  }, [lifestyles]);

  useEffect(() => {
    if (qongfus.length) {
      sliceQongfus(qongfuMax);
    }
  }, [qongfus]);

  const sliceLifestyles = maxLength => {
    setSelectedLifestyles(
      lifestyles.slice(0, lifestyles.length > maxLength ? maxLength : lifestyles.length)
    );
  };
  const sliceQongfus = maxLength => {
    setSelectedQongfus(qongfus.slice(0, qongfus.length > maxLength ? maxLength : qongfus.length));
  };

  const handleMoreQogfus = mode => {
    if (mode === "less") {
      sliceLifestyles(3);
      sliceQongfus(qongfuMax);
      setDisplayMode("more");
    } else {
      sliceLifestyles(lifestyles.length);
      sliceQongfus(qongfus.length);
      setDisplayMode("less");
    }
  };

  const lifestyleBackgroundColor = item => {
    let lifestyleColor = "";
    const tempLifestyle = systemLifestyles.find(lifestyle => lifestyle.id === item.lifestyle_id);
    if (tempLifestyle) {
      lifestyleColor = `#${tempLifestyle.lifestyle_color}`;
    }
    return lifestyleColor;
  };

  const renderLifestyles = () => {
    return (
      <Grid container direction="column" className={classes.weekColumn}>
        <Grid item>
          {selectedLifestyles.map((item, index) => {
            return (
              <Chip
                size="medium"
                label={item.lifestyle}
                className={classes.lifestyleHeadings}
                style={{ backgroundColor: `#${item.lifestyle_color}` || "#2e8f5d" }}
                key={`${item.lifestyle}-${index}`}
              />
            );
          })}
        </Grid>
      </Grid>
    );
  };

  const renderQongfus = () => {
    return (
      <React.Fragment>
        <Grid container direction="column" className={classes.weekColumn}>
          <Grid item>
            {selectedQongfus.map((item, index) => {
              return (
                <Chip
                  key={`${item.qongfu}-${index}`}
                  size="medium"
                  label={item.qongfu}
                  className={classes.lifestyleChips}
                  style={{
                    backgroundColor: item.qongfu_color
                      ? `#${item.qongfu_color}`
                      : lifestyleBackgroundColor(item),
                  }}
                />
              );
            })}
            {selectedQongfus.length === 0 && selectedLifestyles.length === 0 && (
              <span style={{ color: "#919191" }}>Not Found!</span>
            )}
            <div className={classes.moreButton}>
              {qongfus.length > qongfuMax ? (
                <Chip
                  size="medium"
                  label={`${displayMode}...`}
                  className={classes.lifestyleChips}
                  onClick={() => handleMoreQogfus(displayMode)}
                ></Chip>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Typography variant="h5" component="h5">
        Lifestyles & Qongfu
      </Typography>
      {renderLifestyles()}
      {renderQongfus()}
    </React.Fragment>
  );
};

export default LifeStylesAndQongfus;
