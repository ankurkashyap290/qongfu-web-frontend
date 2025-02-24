import { takeEvery, put, fork, call, take } from "redux-saga/effects";
import Router from "next/router";
import { toast } from "react-toastify";

import { eventChannel, END } from "redux-saga";

import {
  UserActionTypes,
  userLogin,
  userRegister,
  setMobileNumber,
  verifyInputCode,
  resetPassword,
  resetPasswordCodeVerification,
  saveNewPassword,
  saveUserDetails,
  getUserDetails,
  userLogout,
  userPasswordChange,
  resendVerifyPhone,
  addMissingEntity,
} from "./../actionTypes";
import {
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userRegisterFailure,
  setMobileNumberSuccess,
  setMobileNumberFailure,
  verifyInputCodeSuccess,
  verifyInputCodeFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetPasswordCodeVerificationSuccess,
  resetPasswordCodeVerificationFailure,
  saveNewPasswordSuccess,
  saveNewPasswordFailure,
  saveUserDetailsSuccess,
  saveUserDetailsFailure,
  getUserDetailsSuccess,
  getUserDetailsFailure,
  getUserDetails as getUserProfile,
  userLogoutSuccess,
  // userLogoutFailure,
  userPasswordChangeSuccess,
  userPasswordChangeFailure,
  resendVerifyPhoneFailure,
  resendVerifyPhoneSuccess,
  addMissingEntityFailure,
  addMissingEntitySuccess,
  setUploadProgressParam,
} from "../actions/user";
import { showDialog } from "../actions/app";
import { post, get, put as puts } from "../../utils/request";
import { setToken, setProfile, setRememberMe, isUserLoggedIn } from "../../utils";
import { SuccessStatusCode } from "../../config";

export const getProfile = state => state.user.profile;

export function* registerUser(action: userRegister) {
  try {
    const { payload } = action;
    const result = yield call(post, `/api/users/register`, payload);
    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      yield call(setToken, response.data.user.api_token);
      yield put(userRegisterSuccess(response.data.user.api_token));
      yield put(getUserProfile(response.data.user.api_token));
      yield call(Router.replace, "/sign-up-mobile");
    } else {
      yield call(setToken, null);
      const error = response.data.message || "No Error Found from API";
      yield put(userRegisterFailure(error));
    }
  } catch (ex) {
    yield put(userRegisterFailure("Error while registration"));
  }
}

export function* loginUser(action: userLogin) {
  try {
    const { payload, rememberMe } = action;
    const result = yield call(post, `/api/users/authenticate`, {
      email: payload.email,
      password: payload.password,
    });
    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      // load user details after api token
      const userResult = yield call(getUserDetailsFromApi, response.data.api_token);
      const userResponse = userResult.response ? userResult.response : userResult;
      if (SuccessStatusCode.includes(userResponse.status)) {
        const profile = userResponse.data.data;
        yield call(setRememberMe, rememberMe);
        yield call(setToken, response.data.api_token);
        yield call(setProfile, profile);
        yield put(userLoginSuccess(response.data.api_token, profile));
        if (isUserLoggedIn(profile)) {
          yield call(Router.replace, "/");
        } else if (!profile.contact_number_verified) {
          //if not logged in then reason is
          // mobile not verified then send to mobile verification step cause sign up process not yet completed
          yield call(Router.replace, "/sign-up-mobile");
        } else {
          //else not logged in then reason is onboarding step1 not completed yet
          yield call(Router.replace, "/user-onboarding", "/user-onboarding/step1");
        }
      } else {
        yield put(userLoginFailure(userResponse.data.message));
      }
      // end load user details after api token
    } else {
      yield put(userLoginFailure(response.data.message));
    }
  } catch (ex) {
    yield put(userLoginFailure("Error while sign in"));
  }
}
export function* setUpMobileInfo(action: setMobileNumber) {
  try {
    const { payload, token } = action;
    const response = yield call(
      post,
      `/api/users/details`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (SuccessStatusCode.includes(response.status)) {
      const result = yield call(get, `/api/users/phone-verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tempResult = result.response ? result.response : result;
      if (SuccessStatusCode.includes(tempResult.status)) {
        yield put(setMobileNumberSuccess(response.data.user));
        yield call(setProfile, response.data.user);
        yield put(showDialog("confirm", `phone-verify-input-code`));
      } else {
        yield put(setMobileNumberFailure(tempResult.data.message));
      }
    } else {
      yield put(setMobileNumberFailure(response.data.message));
    }
  } catch (ex) {
    yield put(setMobileNumberFailure("Error while updating mobile number"));
  }
}

export function* inputCodeVerification(action: verifyInputCode) {
  try {
    const { payload, token } = action;
    if (payload.code === "00000") {
      yield put(verifyInputCodeSuccess(null));
      yield put(showDialog("info", `account-update-mobile-verified`));
    } else {
      const result = yield call(
        post,
        `/api/users/phone-verify`,
        { ...payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = result.response ? result.response : result;
      if (SuccessStatusCode.includes(response.status)) {
        yield put(verifyInputCodeSuccess(response.data.user));
        yield call(setProfile, response.data.user);
        yield put(showDialog("info", `account-update-mobile-verified`));
      } else {
        yield put(verifyInputCodeFailure(response.data.message));
      }
    }
  } catch (ex) {
    yield put(verifyInputCodeFailure("Error while validating phone verification code"));
  }
}

export function* resendVerifyPhoneReq(action: resendVerifyPhone) {
  try {
    const { token } = action;
    const result = yield call(get, `/api/users/phone-verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      yield put(resendVerifyPhoneSuccess(response.data.user));
      yield put(showDialog("info", `phone-verify-input-resend-success`));
    } else {
      yield put(resendVerifyPhoneFailure(response.data.message));
    }
  } catch (ex) {
    yield put(resendVerifyPhoneFailure("Error while sending phone verification code"));
  }
}

export function* sendCodeForResetPassword(action: resetPassword) {
  const { payload } = action;
  try {
    const result = yield call(post, `/api/users/reset-password`, { ...payload });
    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      yield put(resetPasswordSuccess(response.data));
      yield put(showDialog("confirm", `reset-password-verify-input-${payload.reset_type}`));
    } else {
      yield put(resetPasswordFailure(response.data.message, payload.reset_type));
    }
  } catch (ex) {
    yield put(resetPasswordFailure("Error while sending reset password", payload.reset_type));
  }
}

export function* codeVerificationForResetPassword(action: resetPasswordCodeVerification) {
  const { payload } = action;
  try {
    if (payload.reset_key === "00000") {
      yield put(resetPasswordCodeVerificationSuccess("true"));
    } else {
      const result = yield call(post, `/api/users/reset-code-verify`, { ...payload });
      const response = result.response ? result.response : result;
      if (SuccessStatusCode.includes(response.status)) {
        yield put(resetPasswordCodeVerificationSuccess(response.data.api_token));
        //goto reset-password here
        yield call(Router.replace, "/reset-password");
      } else {
        yield put(resetPasswordCodeVerificationFailure(response.data.message, payload.reset_type));
      }
    }
  } catch (ex) {
    yield put(
      resetPasswordCodeVerificationFailure(
        "Error while verifying reset input code",
        payload.reset_type
      )
    );
  }
}

export function* updateNewPassword(action: saveNewPassword) {
  try {
    const { payload, token } = action;
    const response = yield call(
      puts,
      `/api/users/reset-password`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (SuccessStatusCode.includes(response.status)) {
      yield put(saveNewPasswordSuccess("done"));
      yield put(showDialog("confirm", `reset-password-success`));
    } else {
      yield put(saveNewPasswordFailure(response.data.message));
    }
  } catch (ex) {
    yield put(saveNewPasswordFailure("Error while updating password"));
  }
}

function createUploader(token, data) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };
  const uploadPromise = post(`/api/users/details`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: uploadProgressCb,
  });
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan) {
  while (true) {
    // eslint-disable-line no-constant-condition
    const progress = yield take(chan);
    yield put(setUploadProgressParam(progress));
  }
}

export function* updateUserDetails(action: saveUserDetails) {
  const { payload, token, step, updateType } = action;
  try {
    let imageUpload = false;
    let data;
    if (step === "second") {
      data = new FormData();
      const { avatar, cover_photo, ...rest } = payload;
      if (avatar) {
        data.append("avatar[image]", <File>avatar);
      }
      if (cover_photo) {
        data.append("cover[image]", <File>cover_photo);
      }
      for (const key in rest) {
        data.append(key, rest[key]);
      }
      imageUpload = true;
    } else {
      data = { ...payload };
    }
    let response;
    if (imageUpload) {
      const [uploadPromise, chan] = yield call(createUploader, token, data);
      yield fork(uploadProgressWatcher, chan);
      response = yield call(() => uploadPromise);
    } else {
      const result = yield call(post, `/api/users/details`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response = result.response ? result.response : result;
    }
    if (SuccessStatusCode.includes(response.status)) {
      yield put(saveUserDetailsSuccess(response.data.user));
      yield call(setProfile, response.data.user);
      if (updateType) {
        yield put(showDialog("info", `account-update-${updateType}`));
      }
    } else {
      yield put(saveUserDetailsFailure(response.data.message, updateType || "normal"));
    }
  } catch (ex) {
    yield put(saveUserDetailsFailure("Error while updating user details", updateType || "normal"));
  }
}

const getUserDetailsFromApi = async token => {
  return await get(`/api/users/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function* getUserData(action: getUserDetails) {
  try {
    const { token } = action;
    const result = yield call(getUserDetailsFromApi, token);
    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      yield put(getUserDetailsSuccess(response.data.data));
      yield call(setProfile, response.data.data);
    } else {
      yield put(getUserDetailsFailure(response.data.message));
    }
  } catch (ex) {
    yield put(getUserDetailsFailure("Error while fetching user details"));
  }
}

export function* logoutUser(action: userLogout) {
  try {
    const { token } = action;
    yield call(get, `/api/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(userLogoutSuccess("Logout"));
    yield call(setProfile, null);
    yield call(setToken, null);
    yield call(setRememberMe, false);
    yield call(Router.replace, "/");
  } catch (ex) {
    console.log("---Error while logout", ex);
  }
}

export function* oldPasswordChange(action: userPasswordChange) {
  const { payload, token, updateType } = action;
  try {
    const result = yield call(
      puts,
      `/api/users/password`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = result.response ? result.response : result;
    if (SuccessStatusCode.includes(response.status)) {
      yield put(userPasswordChangeSuccess("done"));
      if (updateType) {
        yield put(showDialog("info", `account-update-${updateType}`));
      }
    } else {
      yield put(userPasswordChangeFailure(response.data.message));
    }
  } catch (ex) {
    yield put(userPasswordChangeFailure("Error while updating password"));
  }
}

export function* addMissingEntities(action: addMissingEntity) {
  try {
    const { payload } = action;
    const response = yield call(post, `/api/feedbacks`, { ...payload });

    if (SuccessStatusCode.includes(response.status)) {
      yield put(addMissingEntitySuccess("true"));
      yield put(showDialog("info", `saved-missing-entity`));
    } else {
      yield call(toast, response.message);
      yield put(addMissingEntityFailure(response.message));
    }
  } catch (ex) {
    yield call(toast, "Error while sending Feedback");
    yield put(addMissingEntityFailure("Error while sending Feedback"));
  }
}

export function* watchRequests() {
  yield takeEvery(UserActionTypes.USER_LOGIN, loginUser);
  yield takeEvery(UserActionTypes.USER_REGISTER, registerUser);
  yield takeEvery(UserActionTypes.SET_MOBILE_NUMBER, setUpMobileInfo);
  yield takeEvery(UserActionTypes.VERIFY_INPUT_CODE, inputCodeVerification);
  yield takeEvery(UserActionTypes.RESEND_PHONE_VERIFY, resendVerifyPhoneReq);
  yield takeEvery(UserActionTypes.RESET_PASSWORD, sendCodeForResetPassword);
  yield takeEvery(
    UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION,
    codeVerificationForResetPassword
  );
  yield takeEvery(UserActionTypes.SAVE_NEW_PASSWORD, updateNewPassword);
  yield takeEvery(UserActionTypes.SAVE_USER_DETAILS, updateUserDetails);
  yield takeEvery(UserActionTypes.GET_USER_DETAILS, getUserData);
  yield takeEvery(UserActionTypes.USER_LOGOUT, logoutUser);
  yield takeEvery(UserActionTypes.USER_PASSWORD_CHANGE, oldPasswordChange);
  yield takeEvery(UserActionTypes.ADD_MISSING_ENTITY, addMissingEntities);
}

export default function* root() {
  yield fork(watchRequests);
}
