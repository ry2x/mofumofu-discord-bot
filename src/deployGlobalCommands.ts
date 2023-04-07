/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import logger from './logger.js';
import type ApplicationCommand from './templates/ApplicationCommand.js';
const { TOKEN, CLIENT_ID } = process.env;

export default async function deployGlobalCommands() {
  logger.info('----starting global commands deployment----');

  const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  const commandFiles: string[] = readdirSync('./commands').filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
  );

  for (const file of commandFiles) {
    const command: ApplicationCommand = (await import(`./commands/${file}`))
      .default as ApplicationCommand;
    const commandData = command.data.toJSON();
    commands.push(commandData);
  }

  logger.info('---Pushed application commands---');

  const rest = new REST({ version: '10' }).setToken(TOKEN as string);

  try {
    logger.info('---Starting refreshing application (/) commands.---');

    await rest.put(Routes.applicationCommands(CLIENT_ID as string), {
      body: commands,
    });
    logger.info('---Successfully reloaded application (/) commands.---');
  } catch (error) {
    console.error(error);
  }
}
