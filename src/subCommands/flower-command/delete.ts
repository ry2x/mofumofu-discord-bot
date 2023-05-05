import {
  EmbedBuilder,
  type CacheType,
  type ChatInputCommandInteraction,
  Colors,
  ColorResolvable,
  Collection,
  Role,
  GuildBasedChannel,
} from 'discord.js';
import { flowers } from '../../constant/flowers.js';
import SubCommand from '../../templates/SubCommand.js';
import type { flower } from '../../types.js';

export default new SubCommand({
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await deleteChannel(interaction);
  },
});

function embedMaker(kind: 'role' | 'channel' | 'category', color: ColorResolvable, name: string) {
  return new EmbedBuilder()
    .setColor(color)
    .setTitle(`Deleting ${kind}s ...`)
    .setDescription(`${kind}: ${name} : is been deleting now...`);
}

async function deleteChannel(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
  const guild = interaction.guild;
  if (!guild) return;

  const firstEmbed = new EmbedBuilder()
    .setColor(Colors.Red)
    .setTitle('I will delete flower channels and roles from this server!')
    .setDescription('Starting process...');
  const message = await interaction.reply({ embeds: [firstEmbed], fetchReply: true });

  const names: flower[] = flowers;

  const collectionRole: Collection<string, Role> = new Collection<string, Role>();
  const collectionChannel: Collection<string, GuildBasedChannel> = new Collection<
    string,
    GuildBasedChannel
  >();
  const collectionCategory: Collection<string, GuildBasedChannel> = new Collection<
    string,
    GuildBasedChannel
  >();

  for (const name of names) {
    const categoryName =
      name.name.charAt(0).toUpperCase() + ':' + name.name + '-' + name.localized_name;

    const categories = guild.channels.cache.filter((channel) => channel.name == categoryName);

    categories.forEach((value: GuildBasedChannel, key: string) => {
      collectionCategory.set(key, value);

      guild.channels.cache
        .filter((channel) => channel.parentId == value.id)
        .forEach((value: GuildBasedChannel, key: string) => collectionChannel.set(key, value));
    });

    guild.roles.cache
      .filter((role) => role.name == categoryName)
      .forEach((value: Role, key: string) => collectionRole.set(key, value));
  }

  if (collectionRole.size > 0) {
    for (const role of collectionRole) {
      await message.edit({ embeds: [embedMaker('role', Colors.Aqua, role[1].name)] });
      await guild.roles.delete(role[0]);
    }
  }

  if (collectionChannel.size > 0) {
    for (const channel of collectionChannel) {
      await message.edit({ embeds: [embedMaker('channel', Colors.Green, channel[1].name)] });
      await guild.channels.delete(channel[0]);
    }
  }

  if (collectionCategory.size > 0) {
    for (const category of collectionCategory) {
      await message.edit({ embeds: [embedMaker('category', Colors.Purple, category[1].name)] });
      await guild.channels.delete(category[0]);
    }
  }

  const endEmbed = new EmbedBuilder()
    .setColor(Colors.Gold)
    .setTitle('Finish the processes!')
    .setDescription('All flower roles and channels are successfully deleted!');
  await message.edit({ embeds: [endEmbed] });
}
