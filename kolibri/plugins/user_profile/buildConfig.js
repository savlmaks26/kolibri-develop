module.exports = [
  {
    bundle_id: 'app',
    webpack_config: {
      entry: './assets/src/app.js',
    },
  },
  {
    bundle_id: 'user_profile_side_nav',
    webpack_config: {
      entry: './assets/src/views/UserProfileSideNavEntry.js',
    },
  },
];
