import MessageCommand from '../../templates/MessageCommand.js';

export default new MessageCommand({
  name: 'ping', // command name
  description: 'Ping!', // command description
  async execute(message) {
    // code to run on command execution
    // for example:
    await message.channel.send('Pong.');
  },
});
