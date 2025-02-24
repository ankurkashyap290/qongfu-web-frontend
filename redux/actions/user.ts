import {
  UserActionTypes,
  UserAction,
  LoginType,
  RegisterType,
  User,
  InputCode,
  ResetPassword,
  ResetPasswordCode,
  UserPasswordChange,
  MissingEntity,
  UpdateNewPassword,
} from "../actionTypes";

export function userRegister(payload: RegisterType): UserAction {
  return {
    type: UserActionTypes.USER_REGISTER,
    payload,
  };
}
export function userRegisterSuccess(response: string): UserAction {
  return {
    type: UserActionTypes.USER_REGISTER_SUCCESS,
    payload: { response },
  };
}
export function userRegisterFailure(error: string): UserAction {
  return {
    type: UserActionTypes.USER_REGISTER_FAILURE,
    payload: { error },
  };
}
export function userLogin(payload: LoginType, rememberMe: boolean): UserAction {
  return {
    type: UserActionTypes.USER_LOGIN,
    payload,
    rememberMe,
  };
}
export function userLoginSuccess(response: string, profile: User): UserAction {
  return {
    type: UserActionTypes.USER_LOGIN_SUCCESS,
    payload: { response, profile },
  };
}
export function userLoginFailure(error: string): UserAction {
  return {
    type: UserActionTypes.USER_LOGIN_FAILURE,
    payload: { error },
  };
}
export function setMobileNumber(payload: User, token: string | null): UserAction {
  return {
    type: UserActionTypes.SET_MOBILE_NUMBER,
    payload,
    token,
  };
}
export function setMobileNumberSuccess(response: User): UserAction {
  return {
    type: UserActionTypes.SET_MOBILE_NUMBER_SUCCESS,
    payload: { response },
  };
}
export function setMobileNumberFailure(error: string): UserAction {
  return {
    type: UserActionTypes.SET_MOBILE_NUMBER_FAILURE,
    payload: { error },
  };
}
export function verifyInputCode(payload: InputCode, token: string | null): UserAction {
  return {
    type: UserActionTypes.VERIFY_INPUT_CODE,
    payload,
    token,
  };
}
export function verifyInputCodeSuccess(response: User | null): UserAction {
  return {
    type: UserActionTypes.VERIFY_INPUT_CODE_SUCCESS,
    payload: { response },
  };
}
export function verifyInputCodeFailure(error: string): UserAction {
  return {
    type: UserActionTypes.VERIFY_INPUT_CODE_FAILURE,
    payload: { error },
  };
}

export function resendVerifyPhone(token: string | null): UserAction {
  return {
    type: UserActionTypes.RESEND_PHONE_VERIFY,
    token,
  };
}
export function resendVerifyPhoneSuccess(response: User | null): UserAction {
  return {
    type: UserActionTypes.RESEND_PHONE_VERIFY_SUCCESS,
    payload: { response },
  };
}
export function resendVerifyPhoneFailure(error: string): UserAction {
  return {
    type: UserActionTypes.RESEND_PHONE_VERIFY_FAILURE,
    payload: { error },
  };
}

export function resetPassword(
  payload: ResetPassword,
  resetPasswordType: string | null,
  resetPasswordValue: string | null
): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD,
    payload,
    resetPasswordType,
    resetPasswordValue,
  };
}
export function resetPasswordSuccess(response: string): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_SUCCESS,
    payload: { response },
  };
}
export function resetPasswordFailure(error: string, resetType: string): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_FAILURE,
    payload: { error, resetType },
  };
}
export function resetPasswordCodeVerification(payload: ResetPasswordCode): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION,
    payload,
  };
}
export function resetPasswordCodeVerificationSuccess(response: string): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION_SUCCESS,
    payload: { response },
  };
}
export function resetPasswordCodeVerificationFailure(error: string, resetType: string): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_CODE_VERIFICATION_FAILURE,
    payload: { error, resetType },
  };
}
export function saveNewPassword(payload: UpdateNewPassword, token: string): UserAction {
  return {
    type: UserActionTypes.SAVE_NEW_PASSWORD,
    payload,
    token,
  };
}
export function saveNewPasswordSuccess(response: string): UserAction {
  return {
    type: UserActionTypes.SAVE_NEW_PASSWORD_SUCCESS,
    payload: { response },
  };
}
export function saveNewPasswordFailure(error: string): UserAction {
  return {
    type: UserActionTypes.SAVE_NEW_PASSWORD_FAILURE,
    payload: { error },
  };
}
export function saveUserDetails(
  payload: User,
  token: string | null,
  step?: string | null,
  updateType?: string | null
): UserAction {
  return {
    type: UserActionTypes.SAVE_USER_DETAILS,
    payload,
    token,
    step,
    updateType,
  };
}
export function saveUserDetailsSuccess(response: User): UserAction {
  return {
    type: UserActionTypes.SAVE_USER_DETAILS_SUCCESS,
    payload: { response },
  };
}
export function saveUserDetailsFailure(error: string, updateType: string): UserAction {
  return {
    type: UserActionTypes.SAVE_USER_DETAILS_FAILURE,
    payload: { error, updateType },
  };
}
export function getUserDetails(token: string | null): UserAction {
  return {
    type: UserActionTypes.GET_USER_DETAILS,
    token,
  };
}
export function getUserDetailsSuccess(response: User): UserAction {
  return {
    type: UserActionTypes.GET_USER_DETAILS_SUCCESS,
    payload: { response },
  };
}
export function getUserDetailsFailure(error: string): UserAction {
  return {
    type: UserActionTypes.GET_USER_DETAILS_FAILURE,
    payload: { error },
  };
}
export function setToken(token: string): UserAction {
  return {
    type: UserActionTypes.SET_TOKEN,
    payload: { token },
  };
}

export function setProfile(profile: User): UserAction {
  return {
    type: UserActionTypes.SET_PROFILE,
    payload: { profile },
  };
}
export function userLogout(token: string | null): UserAction {
  return {
    type: UserActionTypes.USER_LOGOUT,
    token,
  };
}
export function userLogoutSuccess(response: string): UserAction {
  return {
    type: UserActionTypes.USER_LOGOUT_SUCCESS,
    payload: { response },
  };
}
export function userLogoutFailure(error: string): UserAction {
  return {
    type: UserActionTypes.USER_LOGOUT_FAILURE,
    payload: { error },
  };
}
export function userPasswordChange(
  payload: UserPasswordChange,
  token: string | null,
  updateType: string | null
): UserAction {
  return {
    type: UserActionTypes.USER_PASSWORD_CHANGE,
    payload,
    token,
    updateType,
  };
}
export function userPasswordChangeSuccess(response: string): UserAction {
  return {
    type: UserActionTypes.USER_PASSWORD_CHANGE_SUCCESS,
    payload: { response },
  };
}
export function userPasswordChangeFailure(error: string): UserAction {
  return {
    type: UserActionTypes.USER_PASSWORD_CHANGE_FAILURE,
    payload: { error },
  };
}
export function setActiveSettingsTab(activeSettingsTab: string): UserAction {
  return {
    type: UserActionTypes.SET_ACTIVE_SETTINGS_TAB,
    activeSettingsTab,
  };
}
export function addMissingEntity(payload: MissingEntity): UserAction {
  return {
    type: UserActionTypes.ADD_MISSING_ENTITY,
    payload,
  };
}
export function addMissingEntitySuccess(response: string): UserAction {
  return {
    type: UserActionTypes.ADD_MISSING_ENTITY_SUCCESS,
    payload: { response },
  };
}
export function addMissingEntityFailure(error: string): UserAction {
  return {
    type: UserActionTypes.ADD_MISSING_ENTITY_FAILURE,
    payload: { error },
  };
}
export function setUserOnboardingStep(userOnboardingStep: string): UserAction {
  return {
    type: UserActionTypes.SET_USER_ONBOARDING_STEP,
    userOnboardingStep,
  };
}
export function setUploadProgressParam(progress: number): UserAction {
  return {
    type: UserActionTypes.SET_UPLOAD_PROGRESS_PARAM,
    progress,
  };
}
