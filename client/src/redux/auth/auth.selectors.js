import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectError = createSelector([selectAuth], (auth) => auth.error);

export const selectUser = createSelector([selectAuth], (auth) => auth.user);

export const selectLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
);
