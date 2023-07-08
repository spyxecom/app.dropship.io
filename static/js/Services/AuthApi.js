import apisauce from 'apisauce';
import API, {encryptedData, encryptedDataOTP} from './Api';

// our 'constructor'
const create = (baseURL = process.env.REACT_APP_BASE_API_ROUTE) => {
  const accessData = { accessToken: null, refreshToken: null };
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the 'constructor'
    baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'application/json',
    },

    // 60 second timeout...
    timeout: 60000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than 'get', 'post' and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const serialize = (obj, prefix) => {
    let str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        //let k = prefix ? prefix + "." + p  : p
        let k = prefix ? prefix : p;
        let v = obj[p];
        str.push(
          v !== null && typeof v === 'object'
            ? serialize(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v),
        );
      }
    }
    return str.join('&');
  };

  const updateAccessToken = (accessToken, refreshToken) => {
    accessData.accessToken = accessToken;
    accessData.refreshToken = refreshToken;
    if (accessToken) {
      api.setHeader('Authorization', 'JWT ' + accessToken);
    } else {
      api.setHeader('Authorization', null);
    }
    API.updateAccessToken(accessToken, refreshToken);
  };

  const signIn = (email, password, otp_pass=null) => {
    return new Promise((resolve, reject) => {
      api
        .post('auth/token/', encryptedDataOTP({email, password, otp_pass}))
        .then((response) => {
          if (
            response &&
            response.ok &&
            response.data &&
            response.data.access
          ) {
            updateAccessToken(response.data.access, response.data.refresh);
            resolve({
              userInfo: response.data.user,
              access: response.data.access,
              refresh: response.data.refresh,
            });
          } else if (!response.ok && response.data) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const checkEmail = (data) => {
    return api.post(`auth/confirm-email/`, encryptedData(data));
  };

  const changeEmail = (data) => {
    return api.post(`auth/change-email/`, encryptedData(data));
  };

  const confirmEmail = (hash) => {
    const query = {
      code: hash,
      auth: true
    };
    return new Promise((resolve, reject) => {
      api
        .get('auth/confirm-email/?' + serialize(query))
        .then((response) => {
          if (
            response &&
            response.ok &&
            response.data &&
            response.data.access
          ) {
            updateAccessToken(response.data.access, response.data.refresh);
            resolve({
              userInfo: response.data.user,
              access: response.data.access,
              refresh: response.data.refresh,
            });
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const confirmEmailInit = (hash) => {
    const query = {
      code: hash,
    };
    return new Promise((resolve, reject) => {
      api
        .get('auth/confirm-email/?' + serialize(query))
        .then((response) => {
          if (
            response &&
            response.ok &&
            response.data &&
            response.data?.code_valid
          ) {
            resolve({
              codeValid: response?.data?.code_valid
            });
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const checkPassword = (email) => {
    return api.post(`auth/forgot-password/`, encryptedData({ email }));
  };

  const confirmPassword = (code) => {
    const query = {
      code,
    };
    return new Promise((resolve, reject) => {
      api
        .get('auth/forgot-password/?' + serialize(query))
        .then((response) => {
          if (
            response &&
            response.ok &&
            response.data &&
            response.data.access
          ) {
            updateAccessToken(response.data.access, response.data.refresh);
            resolve({
              userInfo: response.data.user,
              access: response.data.access,
              refresh: response.data.refresh,
            });
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const tokenRefresh = () => {
    return new Promise((resolve, reject) => {
      api
        .post('auth/token/refresh/', {
          refresh: accessData.refreshToken,
        })
        .then((response) => {
          if (
            response &&
            response.ok &&
            response.data &&
            response.data.access
          ) {
            updateAccessToken(response.data.access, response.data.refresh);
          }
          resolve({
            access: response.data.access,
            refresh: response.data.refresh,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  //create user password
  const createUserPassword = (new_password) => {
    return api.post(`/user/user/set_password/`, encryptedData({ new_password }));
  };

  const socialAuth = (access_token, socialType, user) => {
    return new Promise((resolve, reject) => {
      api
        .post(`auth/social/${socialType}/`, encryptedData({
          access_token,
          ...(user && { user: user })
        }))
        .then((response) => {
          if (response?.ok && response?.data?.access) {
            updateAccessToken(response.data.access, response.data.refresh);
            resolve({
              userInfo: response.data.user,
              access: response.data.access,
              refresh: response.data.refresh,
            });
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const socialAuthAdd = (access_token, socialType, user) => {
    return new Promise((resolve, reject) => {
      api
        .post(`user/social/${socialType}/`, encryptedData({
          access_token,
          ...(user && { user: user })
        }))
        .then((response) => {
          if (response?.ok && response?.data?.access) {
            updateAccessToken(response.data.access, response.data.refresh);
            resolve({
              userInfo: response.data.user,
              access: response.data.access,
              refresh: response.data.refresh,
            });
          } else {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const socialAuthDelete = (socialType) =>
    api.delete(`user/social/${socialType}/`);

  const logout = () => {
    const {accessToken, refreshToken } = accessData
    return api.post('auth/logout/', { refresh_token: refreshToken}, {
      headers: { "Authorization": 'JWT ' + accessToken }});
  };

  //const getWork = (id) => api.get('works/'+id)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    //resetPassword,
    signIn,
    logout,
    updateAccessToken,
    tokenRefresh,
    checkEmail,
    changeEmail,
    confirmEmail,
    confirmEmailInit,
    checkPassword,
    confirmPassword,
    createUserPassword,
    socialAuth,
    socialAuthAdd,
    socialAuthDelete,
  };
};

// let's return back our create method as the default.
export default create();
