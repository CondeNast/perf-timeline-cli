const send = async (page, command, options) => {
  try {
    await page._client.send(command, options);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  send
};
