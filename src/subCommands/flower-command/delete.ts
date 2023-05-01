import { EmbedBuilder, type CacheType, type ChatInputCommandInteraction, Colors } from 'discord.js';
import { flowers } from '../../constant/flowers.js';
import SubCommand from '../../templates/SubCommand.js';
import type { flower } from '../../types.js';

export default new SubCommand({
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await deleteChannel(interaction);
  },
});

const firstEmbed = new EmbedBuilder()
  .setColor(Colors.Red)
  .setTitle('I will delete the channels and roles from this server!')
  .setDescription('Starting process...');

async function deleteChannel(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
  const guild = interaction.guild;
  if (!guild) return;

  const message = await interaction.reply({ embeds: [firstEmbed], fetchReply: true });

  const names: flower[] = flowers;

  for (const name of names) {
    const categoryName =
      name.name.charAt(0).toUpperCase() + ':' + name.name + '-' + name.localized_name;

    const categories = guild.channels.cache.filter((channel) => channel.name == categoryName);

    const roles = guild.roles.cache.filter((role) => role.name == categoryName);
    if (roles.size > 0) {
      for (const role of roles) {
        const roleEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle('Deleting Roles...')
          .setDescription(':' + role[1].name + ' : is deleting now...');
        await message.edit({ embeds: [roleEmbed] });

        await guild.roles.delete(role[0]);
      }
    }

    for (const category of categories) {
      const children = guild.channels.cache.filter((channel) => channel.parentId == category[1].id);
      if (children.size > 0) {
        for (const child of children) {
          const channelEmbed = new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle('Deleting Channels...')
            .setDescription(':' + child[1].name + ' : is deleting now...');
          await message.edit({ embeds: [channelEmbed] });

          await guild.channels.delete(child[0]);
        }
      }
    }

    if (categories) {
      for (const channel of categories) {
        const channelEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle('Deleting categories...')
          .setDescription(':' + channel[1].name + ' : is deleting now...');
        await message.edit({ embeds: [channelEmbed] });

        await guild.channels.delete(channel[0]);
      }
    }
  }

  const endEmbed = new EmbedBuilder()
    .setColor(Colors.Gold)
    .setTitle('Finish the processes!')
    .setDescription('All flower roles and channels are successfully deleted!');
  await message.edit({ embeds: [endEmbed] });
}
