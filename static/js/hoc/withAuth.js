import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from '../Services/Api';

const withAuth = (WrappedComponent) => {
  class ComposedComponent extends Component {
    api = new API();

    authUrl = 'auth/token/refresh/';

    state = {
      isBlocked: false,
    };

    requestInterceptor = this.api.interceptors.request.use((req) => {
      const { auth } = this.props;

      req.headers.Authorization = `JWT ${auth?.accessToken || null}`;

      return req;
    });

    responseInterceptor = this.api.interceptors.response.use(
      (res) => {
        const { status, config } = res;
        const { url } = config;

        if(url ==='auth/token/verify/' && status === 200 && this.state.isBlocked) this.setState({ isBlocked: false });

        return res;
      },
      (err) => {
        const { refreshToken, auth, logout } = this.props;
        const { status } = err.response;

        const { url } = err.config;

        // если первый запрос на refresh token не прошел (выдал 401 или 403) выходим из приложения
        if (this.authUrl === url && this.state.isBlocked) {
          this.setState({ isBlocked: false });
          logout();
        }

        /*if (status === 401 || status === 403 || err.response?.data?.message?.detail === 'You have been logged out since you just signed into Dropship from another location.') {
          refreshTokenFailure({errors: err.response?.data?.message?.detail});
          logout();
        }*/

        // если запросы заблокированы, то отменяем все последующие запросы на refresh;
        if (this.state.isBlocked) return Promise.reject(err);

        // блокируем запросы после первой ошибки
        this.setState({ isBlocked: true });

        if (status === 401 || status === 403) {
          if (auth?.refreshToken) return refreshToken(auth.refreshToken);
          logout();
        }

        if (status >= 500) {
          return Promise.reject(err);
        }

        return Promise.reject(err);
      },
    );

    componentWillUnmount() {
      this.api.interceptors.request.eject(this.requestInterceptor);
      this.api.interceptors.response.eject(this.responseInterceptor);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ComposedComponent.propTypes = {
    refreshToken: PropTypes.func,
    logout: PropTypes.func,
    auth: PropTypes.shape({
      accessToken: PropTypes.string,
      refreshToken: PropTypes.string,
    }),
  };

  return ComposedComponent;
};

export default withAuth;
