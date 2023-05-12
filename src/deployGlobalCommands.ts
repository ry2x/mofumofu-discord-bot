/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import logger from './logger.js';
import type ApplicationCommand from './templates/ApplicationCommand.js';
import type ContextCommand from './templates/ContextCommands.js';
const { TOKEN, CLIENT_ID } = process.env;

export default async function deployGlobalCommands() {
  logger.info('*Start creating global commands');

  const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  const commandFiles: string[] = readdirSync('./commands/slashCommands').filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
  );

  for (const file of commandFiles) {
    const command: ApplicationCommand = (await import(`./commands/slashCommands/${file}`))
      .default as ApplicationCommand;
    const commandData = command.data.toJSON();
    commands.push(commandData);
  }

  const contextCommandFiles: string[] = readdirSync('./commands/contextCommands').filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
  );
  for (const file of contextCommandFiles) {
    const command: ContextCommand = (await import(`./commands/contextCommands/${file}`))
      .default as ContextCommand;
    const commandData = command.data.toJSON();
    commands.push(commandData);
  }

  logger.info('**Created global commands');

  const rest = new REST({ version: '10' }).setToken(TOKEN as string);

  try {
    logger.info('*Start refreshing slash (/) commands');

    await rest.put(Routes.applicationCommands(CLIENT_ID as string), {
      body: commands,
    });
    logger.info('**Finish refreshing slash (/) commands');
  } catch (error) {
    logger.error(error);
  }
}
