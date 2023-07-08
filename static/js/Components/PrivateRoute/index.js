import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
  redirectPath,
  auth,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={({ location, ...props }) => {
      return auth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: location },
          }}
        />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  auth: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default PrivateRoute;
