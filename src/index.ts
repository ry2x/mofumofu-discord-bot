/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config';

import { readdirSync } from 'fs';
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import deployGlobalCommands from './deployGlobalCommands.js';
import logger from './logger.js';
import type ApplicationCommand from './templates/ApplicationCommand.js';
import type ButtonCommand from './templates/ButtonCommands.js';
import type ContextCommand from './templates/ContextCommands.js';
import type Event from './templates/Event.js';
import type MessageCommand from './templates/MessageCommand.js';

const { TOKEN } = process.env;

logger.info('*Start deployment');

await deployGlobalCommands();

logger.info('**Finish deployment');

// Discord client object
logger.info('*Creating discord client');

global.client = Object.assign(
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
  }),
  {
    commands: new Collection<string, ApplicationCommand>(),
    msgCommands: new Collection<string, MessageCommand>(),
    contextCommands: new Collection<string, ContextCommand>(),
    buttonCommands: new Collection<string, ButtonCommand>(),
  }
);

// Set each command in the commands folder as a command in the client.commands collection
logger.info('*Set commands to client');

const commandFiles: string[] = readdirSync('./commands/slashCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);
for (const file of commandFiles) {
  const command: ApplicationCommand = (await import(`./commands/slashCommands/${file}`))
    .default as ApplicationCommand;
  client.commands.set(command.data.name, command);
}

const contextCommandFiles: string[] = readdirSync('./commands/contextCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);
for (const file of contextCommandFiles) {
  const command: ContextCommand = (await import(`./commands/contextCommands/${file}`))
    .default as ContextCommand;
  client.contextCommands.set(command.data.name, command);
}

const buttonCommandFiles: string[] = readdirSync('./commands/buttonCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);
for (const file of buttonCommandFiles) {
  const command: ButtonCommand = (await import(`./commands/buttonCommands/${file}`))
    .default as ButtonCommand;
  client.buttonCommands.set(command.data.name, command);
}

const msgCommandFiles: string[] = readdirSync('./messageCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);
for (const file of msgCommandFiles) {
  const command: MessageCommand = (await import(`./messageCommands/${file}`))
    .default as MessageCommand;
  client.msgCommands.set(command.name, command);
}

logger.info('**Finish setting commands');

// Event handling
logger.info('*Creating events');
const eventFiles: string[] = readdirSync('./events').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);

for (const file of eventFiles) {
  const event: Event = (await import(`./events/${file}`)).default as Event;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

logger.info('**Finish creating events');
logger.info('**Finish creating discord client');

await client.login(TOKEN);
logger.info(':Bot logged in!:');
