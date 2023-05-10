import { EmbedBuilder, type ButtonInteraction, type CacheType, Colors } from 'discord.js';
import ButtonCommand from '../../templates/ButtonCommands.js';

export default new ButtonCommand({
  data: {
    name: 'agreement',
  },
  async execute(interaction): Promise<void> {
    await agree(interaction);
  },
});

async function agree(interaction: ButtonInteraction<CacheType>): Promise<void> {
  const guild = interaction.guild;

  const user = interaction.guild?.members.resolve(interaction.user);

  const role = guild?.roles.cache.find((role) => role.name === 'ユーザー様');

  if (role == null || user == null) return;

  await user.roles.add(role);

  const welcomeEmbed = new EmbedBuilder()
    .setTitle('もっふもっふなサーバーへ ようこそ！')
    .setDescription('ルールを守って楽しく使ってね！')
    .setURL('https://discord.com/channels/1067783432463188008/1067783976250519554')
    .setColor(Colors.Aqua);

  await user.send({ embeds: [welcomeEmbed] });

  await interaction.deferUpdate();
}
