define([], function () {
  return {
    hasLoggedInUser: function() {
        // return a boolean type (that's what `!!`) indicating
        // if we has a logged in (authenticated) user
        return !!(this.profile && this.profile.get('username'));
    },
    profile: null
  }
});
