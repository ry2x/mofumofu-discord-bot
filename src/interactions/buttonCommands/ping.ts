import {
  Colors,
  type ButtonInteraction,
  type CacheType,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ActionRowBuilder,
} from 'discord.js';
import ButtonCommand from '../../templates/ButtonCommands.js';

export default new ButtonCommand({
  data: {
    name: 'button-ping',
  },
  async execute(interaction): Promise<void> {
    await pong(interaction);
  },
});

async function pong(interaction: ButtonInteraction<CacheType>) {
  await interaction.deferUpdate();

  const pingEmbed = new EmbedBuilder()
    .setTitle('You say Ping!')
    .setColor(Colors.Green)
    .setDescription(`My ping is ${client.ws.ping.toString()} ms now!`);

  const pingButton = new ButtonBuilder()
    .setCustomId('button-ping')
    .setStyle(ButtonStyle.Primary)
    .setLabel('Ping!')
    .setEmoji('<:what:1003823519999721552>')
    .setDisabled(true);

  const pingRow = new ActionRowBuilder<ButtonBuilder>().setComponents(pingButton);

  await interaction.update({ embeds: [pingEmbed], components: [pingRow] });
}
