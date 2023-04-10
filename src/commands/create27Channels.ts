import {
  CacheType,
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { flowers } from '../constant/flowers.js';
import ApplicationCommand from '../templates/ApplicationCommand.js';
import type { flower } from '../types.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('channel-flower-create')
    .setDescription('create channels named vary flowers')
    .setDefaultMemberPermissions('permissions'),
  async execute(interaction): Promise<void> {
    await createChannel(interaction);
  },
});

async function createChannel(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
  const guild = interaction.guild;
  if (!guild) return;

  const names: flower[] = flowers;

  for (const flowerName of names) {
    await guild.roles.create({ name: flowerName.localized_name }).then(async (role) => {
      await guild.channels
        .create({
          name: flowerName.localized_name,
          type: ChannelType.GuildCategory,
          permissionOverwrites: [
            {
              id: guild.roles.everyone,
              deny: ['ViewChannel'],
            },
            {
              id: role.id,
              allow: ['ViewChannel', 'Connect'],
            },
          ],
        })
        .then(async (category) => {
          await guild.channels.create({
            name: flowerName.localized_name,
            type: ChannelType.GuildText,
            parent: category.id,
          });
          await guild.channels.create({
            name: flowerName.localized_name,
            type: ChannelType.GuildVoice,
            parent: category.id,
          });
        });
    });
  }
}
