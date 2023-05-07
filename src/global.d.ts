/* eslint-disable no-var */
import { Client, Collection } from 'discord.js';
import ApplicationCommand from '../templates/ApplicationCommand';
import MessageCommand from '../templates/MessageCommand';
import ButtonCommand from './templates/ButtonCommands.ts';

interface DiscordClient extends Client {
  commands: Collection<string, ApplicationCommand>;
  msgCommands: Collection<string, MessageCommand>;
  contextCommands: Collection<string, ContextCommand>;
  buttonCommands: Collection<string, ButtonCommand>;
}

declare global {
  var client: DiscordClient;

  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export {};
