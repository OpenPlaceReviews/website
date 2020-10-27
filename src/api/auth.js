import {post, get} from "axios";
import qs from "qs";

const API_BASE = "";

const SIGNUP_URL = `${API_BASE}/api/auth/user-signup`;
const SIGNUP_CONFIRM_URL = `${API_BASE}/api/auth/user-signup-confirm`;
const LOGIN_URL = `${API_BASE}/api/auth/user-login`;
const LOGOUT_URL = `${API_BASE}/api/auth/user-logout`;
const RESET_PWD_URL = `${API_BASE}/api/auth/user-reset-password-email`;
const RESET_PWD_CONFIRM_URL = `${API_BASE}/api/auth/user-reset-password-confirm`;
const OAUTH_CONFIRM_URL = `${API_BASE}/api/auth/user-oauth-postauth`;
const CHECK_NAME_URL = `${API_BASE}/api/auth/user-status`;

const POST_CONFIG = {
  transformRequest: [
    (params) => qs.stringify(params)
  ],
};

const signUp = async ({name, email, pwd, oauthAccessToken = '', userDetails = ''}) => {
  return await post(SIGNUP_URL, {
    name,
    email,
    pwd,
    oauthAccessToken,
    userDetails,
  }, POST_CONFIG);
};

const signUpConfirm = async ({name, token}) => {
  return await post(SIGNUP_CONFIRM_URL, {
    name,
    token,
  }, POST_CONFIG);
};

const logIn = async ({name, pwd, oauthAccessToken = ''}) => {
  return await post(LOGIN_URL, {
    name,
    pwd,
    oauthAccessToken,
  }, POST_CONFIG);
};

const logOut = async (name) => {
  return await post(LOGOUT_URL, {
    name,
  }, POST_CONFIG);
};

const resetPwd = async ({name, email}) => {
  return await post(RESET_PWD_URL, {
    name,
    email,
  }, POST_CONFIG);
};

const resetPwdConfirm = async ({name, token, newPwd}) => {
  return await post(RESET_PWD_CONFIRM_URL, {
    name,
    token,
    newPwd,
  }, POST_CONFIG);
};

const oauthConfirm = async ({token, oauthVerifier, code}) => {
  return await post(OAUTH_CONFIRM_URL, {
    token,
    oauthVerifier,
    code,
  }, POST_CONFIG);
};

const checkName = async (name) => {
  return await get(CHECK_NAME_URL, {
    params: { name: encodeURI(name) },
  });
};

export default {
  checkName,
  signUp,
  signUpConfirm,
  logIn,
  logOut,
  resetPwd,
  resetPwdConfirm,
  oauthConfirm,
}
