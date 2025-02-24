import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../redux/actions";
import { AppState } from "../../redux/reducers";
import { Grid, Button, Dialog, LinearProgress, DialogContent } from "@material-ui/core";
import Dropzone from "react-dropzone";
import { User } from "../../redux/actionTypes";
import { saveUserDetails, setUploadProgressParam } from "../../redux/actions/user";
import { hideDialog } from "../../redux/actions/app";
import useStyles from "../../Styles/components/accountSettings";
import SuccessModal from "../SuccessModal";
import Alert from "@material-ui/lab/Alert";
import { IMAGE_API } from "../../config";

interface Props {
  token: string | null;
  profile: User | null;
  saveUserDetails: typeof saveUserDetails;
  setUploadProgressParam: typeof setUploadProgressParam;
  dialogInfo: any;
  hideDialog: typeof hideDialog;
  uploadProgressParam: number;
  error: string | null;
}

const AvatarUpdate: FunctionComponent<Props> = ({
  token,
  profile,
  saveUserDetails,
  setUploadProgressParam,
  dialogInfo,
  hideDialog,
  uploadProgressParam,
  error,
}) => {
  const classes = useStyles();

  const [files, setFile] = useState([]);
  const [showUploadBtn, setUploadBtn] = useState(false);

  const handleModalClose = () => {
    setFile([]);
    setUploadBtn(false);
    hideDialog("info", "upload-user-avatar");
    setUploadProgressParam(0); //reset back
  };

  const handleSelectFile = acceptedFiles => {
    setFile(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setUploadBtn(true);
  };

  const handleUploadFile = () => {
    saveUserDetails(
      {
        avatar: files[0],
        //@ts-ignore
        first_name: profile.first_name,
        //@ts-ignore
        last_name: profile.last_name,
      },
      token,
      "second",
      "upload-user-avatar"
    );
  };

  return (
    <form
      onSubmit={() => {
        return false;
      }}
    >
      <Dropzone
        maxSize={512000}
        multiple={false}
        onDrop={acceptedFiles => handleSelectFile(acceptedFiles)}
        accept="image/jpeg, image/png"
      >
        {({ getRootProps, getInputProps }) => (
          <Grid container justify="center">
            {files.length && files.length > 0 ? (
              <section className={classes.uploadDragableUpload}>
                <input {...getInputProps()} />
                <div {...getRootProps()} className={classes.uploadPlaceholderCt}>
                  {files.map((file, index) => {
                    return (
                      <img
                        key={`upload-file-${index}`}
                        //@ts-ignore
                        src={file.preview}
                        //@ts-ignore
                        alt={file.name}
                      />
                    );
                  })}
                </div>
              </section>
            ) : profile && profile.avatar_url ? (
              <section className={classes.uploadDragableUpload}>
                <input {...getInputProps()} />
                <div {...getRootProps()} className={classes.uploadPlaceholderCt}>
                  <img
                    //@ts-ignore
                    src={`${IMAGE_API}${profile.avatar_url}`}
                    //@ts-ignore
                    alt={profile.avatar}
                  />
                </div>
              </section>
            ) : (
              <section className={classes.uploadDragableUpload}>
                <input {...getInputProps()} />
                <div {...getRootProps()} className={classes.uploadPlaceholderCt}>
                  <img src="/assets/img/placeholder.jpg" alt={""} style={{ objectFit: "cover" }} />
                </div>
              </section>
            )}
          </Grid>
        )}
      </Dropzone>
      <Grid container justify="center">
        <div className={classes.progress}>
          <LinearProgress variant="determinate" value={uploadProgressParam} />
        </div>
      </Grid>

      {showUploadBtn && (
        <Grid container justify="center">
          {error && (
            <div style={{ margin: "10px 0px" }}>
              <Alert severity="error">{error}</Alert>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableRipple
            style={{ width: "100px", marginTop: "16px" }}
            onClick={handleUploadFile}
          >
            Upload
          </Button>
        </Grid>
      )}

      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={
          dialogInfo &&
          dialogInfo.dialogCode === "account-update-upload-user-avatar" &&
          dialogInfo.open
            ? true
            : false
        }
        className={classes.confirmationModal}
        onClose={handleModalClose}
        maxWidth="xl"
      >
        <DialogContent>
          <SuccessModal
            title="Success!"
            icon="success"
            description=" Image uploaded successfully"
            buttonText="Done"
            handlerFunction={handleModalClose}
          />
        </DialogContent>
      </Dialog>
    </form>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    token: appState.user.token,
    loading: appState.user.loading,
    profile: appState.user.profile,
    dialogInfo: appState.app.dialogInfo,
    uploadProgressParam: appState.user.uploadProgressParam,
    error: appState.user.error["update-details-upload-user-avatar"] || null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUpdate);
