module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-underscore-dangle': 0,
    'comma-dangle': ['error', 'never']
  },
  env: {
    jest: true,
  }
};
