import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  PermissionFlagsBits,
} from 'discord.js';
import MessageCommand from '../../templates/MessageCommand.js';

export default new MessageCommand({
  name: 'member-agreement',
  description: 'Send a message to channel for get agreement from members are new',
  async execute(message): Promise<void> {
    if (!(message.member?.permissions.has(PermissionFlagsBits.Administrator) && message.member))
      return;

    const channel = message.channel;

    await message.delete();

    const agreeEmbed = new EmbedBuilder()
      .setColor(Colors.Aqua)
      .setTitle('ボタンを押してサーバーへ飛び込もう！')
      .setDescription('上のルールは呼んだ？');

    const agreeButton = new ButtonBuilder()
      .setCustomId('agreement')
      .setStyle(ButtonStyle.Success)
      .setLabel('サーバーへ飛び込む！')
      .setEmoji('<:Star_1:960764973267685406>');

    const agreeRow = new ActionRowBuilder<ButtonBuilder>().setComponents(agreeButton);

    await channel.send({ embeds: [agreeEmbed], components: [agreeRow] });
  },
});
