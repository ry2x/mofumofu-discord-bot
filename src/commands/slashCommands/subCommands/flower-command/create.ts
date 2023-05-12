import {
  CacheType,
  ChannelType,
  EmbedBuilder,
  type ChatInputCommandInteraction,
  Colors,
  PermissionFlagsBits,
} from 'discord.js';
import { flowers } from '../../../../constant/flowers.js';
import SubCommand from '../../../../templates/SubCommand.js';
import type { flower } from '../../../../types.js';

export default new SubCommand({
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await createChannel(interaction);
  },
});

function exitedEmbed(exitedItem: string) {
  return new EmbedBuilder()
    .setColor(Colors.Red)
    .setTitle('Flower ' + exitedItem + ' are already exists!')
    .setDescription('Retry after deleting all flower ' + exitedItem + ' !');
}

async function createChannel(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
  const guild = interaction.guild;
  if (!guild) return;

  const firstEmbed = new EmbedBuilder()
    .setColor(Colors.Blue)
    .setTitle('I will create flower channels and roles for this server!')
    .setDescription('Starting process...');
  const message = await interaction.reply({ embeds: [firstEmbed], fetchReply: true });

  const names: flower[] = flowers;

  const checkName = names[0]
    ? names[0].name.charAt(0).toUpperCase() + ':' + names[0].name + '-' + names[0].localized_name
    : '';

  const channels = guild.channels.cache.filter((channel) => channel.name == checkName);
  if (channels.size >= 1) {
    await message.edit({ embeds: [exitedEmbed('channels')] });
    return;
  }

  const roles = guild.roles.cache.filter((role) => role.name == checkName);
  if (roles.size >= 1) {
    await message.edit({ embeds: [exitedEmbed('roles')] });
    return;
  }

  for (const name of names) {
    const categoryName =
      name.name.charAt(0).toUpperCase() + ':' + name.name + '-' + name.localized_name;
    const baseName = name.name + '-' + name.localized_name;
    const channelName = baseName;
    const vcName = baseName + 'vc';

    const flowerEmbed = new EmbedBuilder()
      .setColor(Colors.Aqua)
      .setTitle('Flower channels and roles are been creating now ....')
      .setDescription('What flower now : ' + name.localized_name);
    await message.edit({ embeds: [flowerEmbed] });

    await guild.roles.create({ name: categoryName }).then(async (role) => {
      await guild.channels
        .create({
          name: categoryName,
          type: ChannelType.GuildCategory,
          permissionOverwrites: [
            {
              id: guild.roles.everyone,
              deny: [PermissionFlagsBits.ViewChannel],
            },
            {
              id: role.id,
              allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.ViewChannel],
            },
          ],
        })
        .then(async (category) => {
          await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            parent: category.id,
          });
          await guild.channels.create({
            name: vcName,
            type: ChannelType.GuildVoice,
            parent: category.id,
          });
        });
    });
  }
  const endEmbed = new EmbedBuilder()
    .setColor(Colors.Gold)
    .setTitle('Finish the processes!')
    .setDescription('All flower roles and channels are successfully created!');
  await message.edit({ embeds: [endEmbed] });
}
