import {
  CacheType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { flowers } from '../constant/flowers.js';
import ApplicationCommand from '../templates/ApplicationCommand.js';
import type { flower } from '../types.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('delete-flower-create')
    .setDescription('delete channels named vary flowers')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction): Promise<void> {
    await deleteChannel(interaction);
  },
});

async function deleteChannel(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
  const guild = interaction.guild;
  if (!guild) return;
  await interaction.deferReply();

  const names: flower[] = flowers;

  for (const flowerName of names) {
    const channels = guild.channels.cache.filter(
      (channel) => channel.name == flowerName.localized_name
    );
    if (channels) {
      for (const channel of channels) {
        await guild.channels.delete(channel[1]);
      }
    }

    const roles = guild.roles.cache.filter((role) => role.name == flowerName.localized_name);
    if (roles) {
      for (const role of roles) {
        await guild.roles.delete(role[0]);
      }
    }
  }
  await interaction.followUp('end!');
}
