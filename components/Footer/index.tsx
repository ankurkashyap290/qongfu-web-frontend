import React, { useState } from "react";
import { Divider, Button, Grid, Container, Typography, Link } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../../Styles/components/footer";
import FeedbackForm from "./FeedbackForm";
import { useRouter } from "next/router";
export default function Footer() {
  const classes = useStyles();
  const router = useRouter();
  const [footerExpended, setFooterExpended] = useState(false);
  // const { scrollToRef, myRef } = props;

  const handleFooterBtnClick = () => {
    setFooterExpended(!footerExpended);
    setTimeout(() => {
      document.getElementsByClassName("footer-btn")[0].scrollIntoView();
    }, 200);
  };

  const handleHashLinkClicked = hashValue => {
    router.push(`/?hash=${hashValue}`, "/");
  };

  return (
    <React.Fragment>
      <Container
        className={clsx(classes.simpleGird, classes.hiddenSm)}
        style={{ paddingLeft: 115 }}
      >
        {footerExpended ? (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.footerHeading}
                paragraph
              >
                Navigate Qongfu
              </Typography>
              <div>
                <Link
                  href="#explore-qongfu"
                  onClick={evt => {
                    evt.preventDefault();
                    handleHashLinkClicked("explore-qongfu");
                  }}
                  className={classes.footerMenu}
                >
                  Explore Qongfu
                </Link>
              </div>
              <div>
                <Link
                  href="#about-us"
                  onClick={evt => {
                    evt.preventDefault();
                    handleHashLinkClicked("about-us");
                  }}
                  className={classes.footerMenu}
                >
                  About Us
                </Link>
              </div>
              <div>
                <Link
                  href="#qongfu-mobile"
                  onClick={evt => {
                    evt.preventDefault();
                    handleHashLinkClicked("qongfu-mobile");
                  }}
                  className={classes.footerMenu}
                >
                  Qongfu Mobile
                </Link>
              </div>
              <div>
                <Link
                  href="#qongfu-business"
                  onClick={evt => {
                    evt.preventDefault();
                    handleHashLinkClicked("qongfu-business");
                  }}
                  className={classes.footerMenu}
                >
                  Qongfu Business
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.footerHeading2}
                paragraph
              />
              <div>
                <Link href="#" className={classes.footerMenu}>
                  Terms and Conditions
                </Link>
              </div>
              <div>
                <Link href="#" className={classes.footerMenu}>
                  Privacy Statement
                </Link>
              </div>
              <div>
                <Link href="#" className={classes.footerMenu}>
                  Sitemap
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FeedbackForm />
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}
      </Container>
      <footer className={clsx(classes.footer, classes.hiddenSm)}>
        {footerExpended ? <Divider className={classes.divider} orientation="horizontal" /> : null}
        <Container style={{ paddingLeft: 115 }}>
          <Grid container spacing={3} className={classes.footerInfo}>
            <Grid item md={5}>
              <Typography className={classes.copyRightText}>
                Copyright © 2020 by Qongfu S.P.C. All Rights Reserved.
              </Typography>
            </Grid>
            <Grid item md={1} />
            <Grid item md={6} className={classes.expendedCont}>
              <Button
                variant="contained"
                color="secondary"
                className={clsx("footer-btn", classes.footerBtn)}
                classes={{ label: classes.footerBtnLable }}
                onClick={handleFooterBtnClick}
              >
                {footerExpended ? "— Minimize" : "+ Terms, Privacy, Feedback, and More..."}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </React.Fragment>
  );
}
