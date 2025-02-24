import React, { FunctionComponent, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogContent,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import ClearIcon from "@material-ui/icons/Clear";
import { ActionMenu, FilterCountry } from "../CustomIcon";
import useStyles from "../../Styles/components/PlaceDetails/placeDetailCards";

interface Props {}

const MediaGallery: FunctionComponent<Props> = () => {
  const [openGallery, setOpenGallery] = useState(false);
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

  const handleOpenGallery = () => {
    setOpenGallery(true);
  };

  const handleModelClose = () => {
    setOpenGallery(false);
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        direction="row"
        className={classes.weekColumn}
        style={{ padding: "18px 10px" }}
      >
        <Grid item sm={6} md={6} lg={6}>
          <Typography variant="h5" component="h5">
            Media Gallery
          </Typography>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
          <Button color="primary" onClick={handleOpenGallery} className={classes.mediaGalleryLink}>
            View All
          </Button>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
          <Card className={classes.mainCard} style={{ boxShadow: "none" }}>
            <CardActionArea className={classes.mediaCardActionArea}>
              <CardMedia className={classes.mediaCard} image="/assets/img/placeDetail2.png" />
              <CardContent>
                <Typography variant="body2" component="p">
                  Running at Gold Gym Riffa (Part 2)
                </Typography>
                <Typography variant="body2" component="p" className={classes.mediaDesc}>
                  The video is in full length which means you can just follow whatever I’m doing 30s
                  for each exercise. There are two 1min rests in between. You need to pause longer -
                  feel free to do so
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
          <Grid container>
            {cards.map(card => (
              <Grid item sm={6} md={6} lg={6} key={card}>
                <Card className={classes.smallMediaCards}>
                  <CardActionArea>
                    <CardMedia className={classes.media} image="/assets/img/placeDetail2.png" />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={openGallery}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
        className={classes.mediaCarouselDialog}
      >
        <DialogContent>
          <Grid container justify="flex-end" spacing={2}>
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
            <ClearIcon color="primary" onClick={handleModelClose} />
          </Grid>
          <Grid container spacing={2} direction="row" className={classes.weekColumn}>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
              <Carousel showIndicators={false} showStatus={false}>
                {cards.map(item => {
                  return <img key={item} src="/assets/img/placeDetail2.png" />;
                })}
              </Carousel>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Grid container justify="space-between">
                <Grid item>
                  <img src="/assets/img/slider_info.png" width="48" height="48" />
                </Grid>
                <Grid item />
                <Grid item />
                <Grid item />
                <Grid item />
                <Grid item>
                  <Typography variant="body2" component="p" className={classes.mediaInfoDate}>
                    Posted: 4:56pm 4 March 2017
                  </Typography>
                  <Typography variant="body2" component="p" className={classes.mediaInfoDate}>
                    3,566 views
                  </Typography>
                </Grid>
                <Grid item>
                  <span className={classes.mediaInfoGlobeIcon}>
                    <FilterCountry />
                  </span>
                  <span className={classes.mediaInfoAuctionIcon}>
                    <ActionMenu />
                  </span>
                </Grid>
              </Grid>
              <Typography variant="h6" component="h6" className={classes.mediaGalleryHeading}>
                Lorem ipsum dolor sit amen connecter lipzig Dormicom
              </Typography>
              <Typography variant="body2" component="p" className={classes.mediaGalleryDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus viverra vitae
                congue eu consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed augue lacus
                viverra vitae congue eu consequat.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default MediaGallery;
