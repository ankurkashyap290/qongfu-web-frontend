import React, { FunctionComponent, useState, useEffect } from "react";
import { Typography, Grid, Button, LinearProgress, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { useRouter } from "next/router";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Dropzone from "react-dropzone";
import clsx from "clsx";
import useStyles from "../../Styles/components/userOnboarding";
import { User } from "../../redux/actionTypes";
import { saveUserDetails, setUploadProgressParam } from "../../redux/actions/user";
import Alert from "@material-ui/lab/Alert";
import { IMAGE_API } from "../../config";

interface Props {
  profile: User | null;
  token: string | null;
  saveUserDetails: typeof saveUserDetails;
  setUploadProgressParam: typeof setUploadProgressParam;
  uploadProgressParam: number;
  loading: boolean;
  error: string | null;
}

const SecondStep: FunctionComponent<Props> = ({
  profile,
  token,
  saveUserDetails,
  uploadProgressParam,
  setUploadProgressParam,
  loading,
  error,
}) => {
  const [files, setFile] = useState([]);
  const [avatar, setAvatar] = useState(false);
  const [isDropRejected, setDropError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setUploadProgressParam(0);
    };
  }, []);

  const classes = useStyles();
  const handleFileUpload = acceptedFiles => {
    setDropError(false);
    setFile(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleUploadAvatar = () => {
    const payload = {
      avatar: files[0],
      //@ts-ignore
      first_name: profile.first_name,
      //@ts-ignore
      last_name: profile.last_name,
    };
    saveUserDetails({ ...payload }, token, "second");
    setAvatar(true);
  };

  const handleNextStep = () => {
    router.push("/user-onboarding?slug=step3", "/user-onboarding/step3");
  };

  const handleDropReject = rejected => {
    console.log(rejected.length);
    setDropError(true);
  };

  return (
    <Grid container justify="center">
      <Grid item className={classes.uploadMarginBottom} style={{ marginTop: "20px" }}>
        <Typography variant="h4" className={classes.uploadHeading}>
          Awesome!
        </Typography>
        <Typography
          variant="h4"
          className={clsx(classes.uploadHeading, classes.uploadMarginBottom)}
        >
          Now let’s make an Avatar
        </Typography>
        <Typography
          variant="h6"
          className={clsx(classes.uploadHeadingSubText, classes.uploadMarginBottom)}
        >
          It’s your latest picture or an image <br />
          that represents you.
        </Typography>
        {error || isDropRejected ? (
          <div style={{ margin: "10px 0px" }}>
            <Alert severity="error">{isDropRejected ? "File size 512KB allowed" : error}</Alert>
          </div>
        ) : null}
      </Grid>

      <Dropzone
        maxSize={512000}
        onDrop={acceptedFiles => handleFileUpload(acceptedFiles)}
        onDropRejected={rejected => handleDropReject(rejected)}
        multiple={false}
        accept="image/jpeg, image/png"
      >
        {({ getRootProps, getInputProps }) => (
          <Grid container justify="center">
            {files.length && files.length > 0 ? (
              <section>
                <input {...getInputProps()} />
                <div {...getRootProps()}>
                  {files.map((file, index) => {
                    return (
                      <Avatar
                        //@ts-ignore
                        src={file.preview}
                        //@ts-ignore
                        alt={file.name}
                        className={classes.uploadAvatar}
                        key={`upload-file-${index}`}
                      />
                    );
                  })}
                </div>
              </section>
            ) : profile && profile.avatar_url ? (
              <section>
                <input {...getInputProps()} />
                <div {...getRootProps()}>
                  <Avatar
                    //@ts-ignore
                    src={`${IMAGE_API}${profile.avatar_url}`}
                    //@ts-ignore
                    alt={profile.avatar}
                    className={classes.uploadAvatar}
                  />
                </div>
              </section>
            ) : (
              <section>
                <input {...getInputProps()} />
                <div {...getRootProps()} className={classes.uploadDragableUpload}>
                  <Typography variant="h6" className={classes.dragUploadHeading}>
                    Drag or click to <br /> upload a photo
                  </Typography>
                </div>
              </section>
            )}
          </Grid>
        )}
      </Dropzone>

      <Grid container direction="column" style={{ marginTop: "10px" }}>
        <Grid item xs={6} md={6} lg={6} xl={6} style={{ textAlign: "left", marginRight: "10px" }}>
          <Typography variant="h6" className={clsx(classes.uploadHeadingSubText)}>
            Avatar image
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Dropzone
            maxSize={512000}
            multiple={false}
            accept="image/jpeg, image/png"
            onDropRejected={rejected => handleDropReject(rejected)}
            onDrop={acceptedFiles => handleFileUpload(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <input {...getInputProps()} />
                <div {...getRootProps()}>
                  <Typography
                    variant="h6"
                    className={clsx(classes.uploadHeadingSelect)}
                    style={{ cursor: "pointer" }}
                  >
                    {files.length && files.length > 0
                      ? files.map(
                          file =>
                            //@ts-ignore
                            file.name
                        )
                      : profile && profile.avatar_url
                      ? "Change Avatar"
                      : "Select"}
                    <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                  </Typography>
                </div>
              </section>
            )}
          </Dropzone>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <div className={classes.progress}>
          <LinearProgress variant="determinate" value={uploadProgressParam} />
        </div>
      </Grid>
      {avatar && !loading ? (
        <Grid container justify="center">
          <Typography
            variant="body2"
            className={clsx(classes.uploadHeadingSubText, classes.uploadMarginBottom)}
          >
            Upload Success!
          </Typography>
        </Grid>
      ) : null}
      {loading ? (
        <Grid container justify="center">
          <Typography
            variant="body2"
            className={clsx(classes.uploadHeadingSubText, classes.uploadMarginBottom)}
          >
            Please wait!
          </Typography>
        </Grid>
      ) : null}

      <Grid container justify="center" className={classes.uploadMarginBottom}>
        {files.length > 0 && !avatar ? (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableRipple
            disabled={files.length === 0}
            onClick={handleUploadAvatar}
          >
            Upload my avatar
          </Button>
        ) : (files.length > 0 && avatar) || (profile && profile.avatar_url) ? (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disableRipple
            style={{ padding: "8px 45px" }}
            onClick={handleNextStep}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableRipple
            disabled={files.length === 0}
            onClick={handleUploadAvatar}
          >
            Upload my avatar
          </Button>
        )}
      </Grid>
      <Grid container justify="center" className={classes.uploadMarginBottom}>
        <Button className={classes.cancelButton} disableRipple onClick={handleNextStep}>
          Skip
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    uploadProgressParam: appState.user.uploadProgressParam,
    error: appState.user.error["update-details-normal"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);
