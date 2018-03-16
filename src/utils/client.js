const send = async (page, command, options) => {
  try {
    await page._client.send(command, options); // eslint-disable-line no-underscore-dangle
  } catch (error) {
    throw error;
  }
};

module.exports = {
  send,
};
