import axios, {post, get} from "axios";
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
const CHECK_LOGIN_TOKEN = `${API_BASE}/api/auth/user-check-loginkey`;

const POST_CONFIG = {
  transformRequest: [
    (params) => qs.stringify(params)
  ],
};

const signUp = ({name, email, pwd, oauthAccessToken = '', userDetails = ''}, {callback, purpose}) => {
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      name,
      email,
      pwd,
      oauthAccessToken,
      userDetails,
    }),
    url: SIGNUP_URL,
    params: {
      callback,
      purpose,
    },
  });
};

const signUpConfirm = async ({name, token}) => {
  return await post(SIGNUP_CONFIRM_URL, {
    name,
    token,
  }, POST_CONFIG);
};

const logIn = ({name, pwd, oauthAccessToken = ''}, {callback, purpose}) => {
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      name,
      pwd,
      oauthAccessToken,
      callback,
      purpose,
    }),
    url: LOGIN_URL,
    params: {
      callback,
      purpose,
    },
  });
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
    params: { name: name },
  });
};

const checkToken = async ({name, token}) => {
  return await get(CHECK_LOGIN_TOKEN, {
    params: { name, privateKey: token },
  });
};

export default {
  checkName,
  checkToken,
  signUp,
  signUpConfirm,
  logIn,
  logOut,
  resetPwd,
  resetPwdConfirm,
  oauthConfirm,
}
