import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import ApplicationCommand from '../templates/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('flower-command')
    .setDescription('Using for flowers channel and role')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('create')
        .setDescription('Create flower channels and roles')
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('delete')
        .setDescription('Delete flower channels and roles')
    ),
  hasSubCommands: true,
});
