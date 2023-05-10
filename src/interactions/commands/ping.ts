import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import ApplicationCommand from '../../templates/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies pong!'),
  async execute(interaction): Promise<void> {
    await ping(interaction);
  },
});

async function ping(interaction: ChatInputCommandInteraction<CacheType>) {
  const pingEmbed = new EmbedBuilder()
    .setTitle('You say Ping!')
    .setColor(Colors.Green)
    .setDescription('I say Pong!');

  const pingButton = new ButtonBuilder()
    .setCustomId('button-ping')
    .setStyle(ButtonStyle.Primary)
    .setLabel('Ping!')
    .setEmoji('<:what:1003823519999721552>');

  const pingRow = new ActionRowBuilder<ButtonBuilder>().setComponents(pingButton);

  await interaction.reply({ embeds: [pingEmbed], components: [pingRow] });
}
