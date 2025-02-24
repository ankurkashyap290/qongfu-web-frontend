import { UserAction, UserActionTypes, User } from "./../actionTypes";
import { isUserLoggedIn } from "../../utils";

export interface UserState {
  loading: boolean;
  profile: User | null;
  token: string | null;
  error: any;
  mobileNumberVerified: boolean;
  verifiedInputCode: boolean;
  resetPasswordCodeSent: boolean;
  resetPasswordCodeVerified: string;
  newPasswordSaved: boolean;
  step: string | null;
  resetPasswordType: string | null;
  resetPasswordValue: string | null;
  userPasswordUpdated: boolean;
  activeSettingsTab: string;
  userOnboardingStep: string;
  uploadProgressParam: number;
  isLoggedIn: boolean;
}
const initialState: UserState = {
  loading: false,
  profile: null,
  token: null,
  error: {},
  mobileNumberVerified: false,
  verifiedInputCode: false,
  resetPasswordCodeSent: false,
  resetPasswordCodeVerified: "",
  newPasswordSaved: false,
  step: null,
  resetPasswordType: null,
  resetPasswordValue: null,
  userPasswordUpdated: false,
  activeSettingsTab: "account-info",
  userOnboardingStep: "",
  uploadProgressParam: 0,
  isLoggedIn: false,
};

export function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes.USER_REGISTER:
      return { ...state, loading: true, error: { ...state.error, ["sign-up"]: null }, token: null };
    case UserActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.response,
      };
    case UserActionTypes.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...state.error, ["sign-up"]: action.payload.error },
      };
    case UserActionTypes.USER_LOGIN:
      return { ...state, loading: true, error: { ...state.error, ["sign-in"]: null } };
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.response,
        profile: action.payload.profile,
      };
    case UserActionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...state.error, ["sign-in"]: action.payload.error },
      };
    case UserActionTypes.SET_MOBILE_NUMBER:
      return {
        ...state,
        loading: true,
        error: { ...state.error, ["update-mobile"]: null, ["verify-mobile"]: null },
      };
    case UserActionTypes.SET_MOBILE_NUMBER_SUCCESS:
      const tempLoggedIn = isUserLoggedIn(action.payload.response);
      return {
        ...state,
        loading: false,
        mobileNumberVerified: true,
        profile: { ...action.payload.response },
        isLoggedIn: tempLoggedIn,
      };
    case UserActionTypes.SET_MOBILE_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...state.error, ["update-mobile"]: action.payload.error },
      };
    case UserActionTypes.VERIFY_INPUT_CODE:
      return { ...state, loading: true, error: { ...state.error, ["verify-mobile"]: null } };
    case UserActionTypes.VERIFY_INPUT_CODE_SUCCESS:
      const tempProfile = action.payload.response;
      if (tempProfile === null) {
        return {
          ...state,
          loading: false,
          verifiedInputCode: true,
        };
      } else {
        const temp = isUserLoggedIn(tempProfile);
        return {
          ...state,
          loading: false,
          verifiedInputCode: true,
          profile: action.payload.response,
          isLoggedIn: temp,
        };
      }

    case UserActionTypes.VERIFY_INPUT_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...state.error, ["verify-mobile"]: action.payload.error },
      };
    case UserActionTypes.RESEND_PHONE_VERIFY:
      return { ...state, loading: true, error: { ...state.error, ["verify-mobile"]: null } };
    case UserActionTypes.RESEND_PHONE_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload.response,
        isLoggedIn: isUserLoggedIn(action.payload.response),
      };
    case UserActionTypes.RESEND_PHONE_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...state.error, ["verify-mobile"]: action.payload.error },
      };
    case UserActionTypes.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        error: { ...state.error, [`forgot-reset-${action.payload.reset_type}`]: null },
      };
    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordCodeSent: true,
      };
    case UserActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`forgot-reset-${action.payload.resetType}`]: action.payload.error,
        },
      };
    case UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION:
      return {
        ...state,
        loading: true,
        error: { ...state.error, [`verify-reset-${action.payload.reset_type}`]: null },
      };
    case UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordCodeVerified: action.payload.response,
      };
    case UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`verify-reset-${action.payload.resetType}`]: action.payload.error,
        },
      };
    case UserActionTypes.SAVE_NEW_PASSWORD:
      return { ...state, loading: true, error: { ...state.error, [`reset-new-password`]: null } };
    case UserActionTypes.SAVE_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPasswordSaved: true,
      };
    case UserActionTypes.SAVE_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...state.error, [`reset-new-password`]: action.payload.error },
      };
    case UserActionTypes.SAVE_USER_DETAILS:
      return {
        ...state,
        loading: true,
        step: action.step || null,
        error: { ...state.error, [`update-details-${action.updateType}`]: null },
      };
    case UserActionTypes.SAVE_USER_DETAILS_SUCCESS:
      const tempLogIn = isUserLoggedIn(action.payload.response);
      return {
        ...state,
        loading: false,
        profile: { ...action.payload.response },
        isLoggedIn: tempLogIn,
      };
    case UserActionTypes.SAVE_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`update-details-${action.payload.updateType}`]: action.payload.error,
        },
      };
    case UserActionTypes.GET_USER_DETAILS:
      return { ...state, loading: true };
    case UserActionTypes.GET_USER_DETAILS_SUCCESS:
      const loggedIn = isUserLoggedIn(action.payload.response);
      return {
        ...state,
        loading: false,
        profile: { ...action.payload.response },
        isLoggedIn: loggedIn,
      };
    case UserActionTypes.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case UserActionTypes.SET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload.profile,
      };
    case UserActionTypes.USER_LOGOUT:
      return { ...state, loading: true };
    case UserActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        token: null,
        profile: null,
      };
    case UserActionTypes.USER_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UserActionTypes.USER_PASSWORD_CHANGE:
      return { ...state, loading: true, error: { ...state.error, ["update-password"]: null } };
    case UserActionTypes.USER_PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        userPasswordUpdated: true,
      };
    case UserActionTypes.USER_PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...state.error, ["update-password"]: action.payload.error },
      };
    case UserActionTypes.SET_ACTIVE_SETTINGS_TAB:
      return {
        ...state,
        activeSettingsTab: action.activeSettingsTab,
      };
    case UserActionTypes.ADD_MISSING_ENTITY:
      return { ...state, loading: true };
    case UserActionTypes.ADD_MISSING_ENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UserActionTypes.ADD_MISSING_ENTITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UserActionTypes.SET_USER_ONBOARDING_STEP:
      return {
        ...state,
        userOnboardingStep: action.userOnboardingStep,
      };
    case UserActionTypes.SET_UPLOAD_PROGRESS_PARAM:
      return {
        ...state,
        uploadProgressParam: action.progress,
      };
    default:
      return state;
  }
}
