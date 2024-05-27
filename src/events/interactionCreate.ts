import { BaseInteraction, Events } from 'discord.js';
import logger from '../logger.js';
import type ApplicationCommand from '../templates/ApplicationCommand.js';
import type ButtonCommand from '../templates/ButtonCommands.js';
import type ContextCommand from '../templates/ContextCommands.js';
import Event from '../templates/Event.js';
import { interactionError } from '../utils/errorEmbed.js';

export default new Event({
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction): Promise<void> {
    // Dynamic interaction handling

    if (interaction.isButton()) {
      try {
        const command: ButtonCommand = client.buttonCommands.get(
          interaction.customId,
        ) as ButtonCommand;
        await command.execute(interaction);
      } catch (error) {
        logger.error(error);
        await interaction.reply(interactionError);
      }
    }

    if (interaction.isContextMenuCommand()) {
      try {
        const command: ContextCommand = (await client.contextCommands.get(
          interaction.commandName,
        )) as ContextCommand;
        await command.execute(interaction);
      } catch (error) {
        logger.error(error);
        await interaction.reply(interactionError);
      }
    }

    if (interaction.isChatInputCommand()) {
      try {
        const command: ApplicationCommand = (await client.commands.get(
          interaction.commandName,
        )) as ApplicationCommand;
        await command.execute(interaction);
      } catch (error) {
        logger.error(error);
        await interaction.reply(interactionError);
      }
    }

    if (interaction.isAutocomplete()) {
      try {
        const command: ApplicationCommand = (await client.commands.get(
          interaction.commandName,
        )) as ApplicationCommand;
        await command.complete(interaction);
      } catch (error) {
        logger.error(error);
      }
    }

    return;
  },
});
