import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { NextPage } from "next";
import ExplorerLayout from "../components/Layout/ExplorerLayout";
import actionCreators from "../redux/actions";
import useStyles from "../Styles/components/profile";
import { User, Lifestyles } from "../redux/actionTypes";
import { AppState } from "../redux/reducers";
import Profile from "../components/Profile";
import { getIsMobile } from "../utils";
import { fetchAllLifestyles } from "../redux/actions/app";
import { saveUserDetails, setActiveSettingsTab } from "../redux/actions/user";
import Container from "@material-ui/core/Container";

interface Props {
  profile: User | null;
  token: string | null;
  lifestyles: Lifestyles[] | [];
  fetchAllLifestyles: typeof fetchAllLifestyles;
  saveUserDetails: typeof saveUserDetails;
  setActiveSettingsTab: typeof setActiveSettingsTab;
}

const ProfilePage: NextPage<Props> = ({
  profile,
  lifestyles,
  fetchAllLifestyles,
  saveUserDetails,
  token,
  setActiveSettingsTab,
}) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const [isProfileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileLoaded(true);
    }
  }, [profile]);

  return (
    <ExplorerLayout showHeroHeader={false} pageType="myProfile" loading={!isProfileLoaded}>
      <main className={classes.mainMargin}>
        {isProfileLoaded && (
          <Container style={{ padding: "0px" }}>
            <Profile
              profile={profile}
              isMobile={isMobile}
              lifestyles={lifestyles}
              fetchAllLifestyles={fetchAllLifestyles}
              saveUserDetails={saveUserDetails}
              token={token}
              setActiveSettingsTab={setActiveSettingsTab}
            />
          </Container>
        )}
      </main>
    </ExplorerLayout>
  );
};

const mapStateToProps = (appState: AppState) => {
  return {
    profile: appState.user.profile,
    lifestyles: appState.app.lifestyles,
    token: appState.user.token,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
