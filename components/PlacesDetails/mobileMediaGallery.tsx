import React, { FunctionComponent, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import useStyles from "../../Styles/components/PlaceDetails/placeDetailCards";

interface Props {}

const MobileMediaGallery: FunctionComponent<Props> = () => {
  const classes = useStyles();
  const cards = [1, 2, 3, 4];
  const [mediaType, setMediaType] = useState("");
  const [selectedQongfu, setSelectedQongfu] = useState("");

  const handleChange = event => {
    setMediaType(event.target.value);
  };

  const handleQongfuChange = event => {
    setSelectedQongfu(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        className={classes.weekColumn}
        style={{ padding: "18px 10px" }}
      >
        <Grid item xs={6} sm={6} style={{ padding: "16px 0px" }}>
          <FormControl style={{ marginRight: "30px" }}>
            <Select
              value={mediaType}
              onChange={handleChange}
              displayEmpty
              classes={{
                root: classes.mediaDropdownRoot,
              }}
              disableUnderline
            >
              <MenuItem value="" disabled>
                All Media type
              </MenuItem>
              <MenuItem value={10}>Image</MenuItem>
              <MenuItem value={20}>Video</MenuItem>
              <MenuItem value={30}>Gif</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} style={{ padding: "16px 0px" }}>
          <FormControl style={{ marginRight: "30px" }}>
            <Select
              value={selectedQongfu}
              onChange={handleQongfuChange}
              displayEmpty
              classes={{
                root: classes.mediaDropdownRoot,
              }}
              disableUnderline
            >
              <MenuItem value="" disabled>
                All Qongfus
              </MenuItem>
              <MenuItem value={10}>Cheerleading</MenuItem>
              <MenuItem value={20}>Accupressure</MenuItem>
              <MenuItem value={30}>Anma Massage</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {cards.map(item => {
          return (
            <Grid item sm={12} md={6} lg={6} xs={12} key={item}>
              <Card className={classes.mainCard} style={{ boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia className={classes.mediaCard} image="/assets/img/placeDetail2.png" />
                  <CardContent>
                    <Typography variant="body2" component="p">
                      Running at Gold Gym Riffa (Part 2)
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.mediaDesc}>
                      The video is in full length which means you can just follow whatever I’m doing
                      30s for each exercise. There are two 1min rests in between. You need to pause
                      longer - feel free to do so
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default MobileMediaGallery;
