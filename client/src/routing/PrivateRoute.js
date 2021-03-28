import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from '../redux/auth/auth.selectors';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
