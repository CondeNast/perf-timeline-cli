module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-underscore-dangle': ['off'],
    'comma-dangle': ['error', 'never']
  },
  env: {
    jest: true,
  }
};
