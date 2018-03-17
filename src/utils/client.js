const CLIENT = {
  SEPARATOR: '.',
  GROUPS: {
    NETWORK: {
      LABEL: 'Network',
      COMMANDS: {
        EMULATE_NETWORK_CONDITIONS: 'emulateNetworkConditions'
      }
    },
    EMULATION: {
      LABEL: 'Emulation',
      COMMANDS: {
        // Note that the case used for CPU in the command name is sensitive
        SET_CPU_THROTTLING_RATE: 'setCPUThrottlingRate'
      }
    }
  }
};

const buildCommand = (group, command) => {
  const pieces = [];

  if (CLIENT.GROUPS[group] && CLIENT.GROUPS[group].LABEL) {
    pieces.push(CLIENT.GROUPS[group].LABEL);
  }

  // eslint-disable-next-line max-len
  if (CLIENT.GROUPS[group] && CLIENT.GROUPS[group].COMMANDS && CLIENT.GROUPS[group].COMMANDS[command]) {
    pieces.push(CLIENT.GROUPS[group].COMMANDS[command]);
  }

  return pieces.join(CLIENT.SEPARATOR);
};

const send = async (page, command, options) => {
  try {
    await page._client.send(command, options);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  buildCommand,
  send
};
