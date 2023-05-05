/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction } from 'discord.js';

/**
 * Represents an Context Command
 */
export default class ContextCommand {
  data: ContextMenuCommandBuilder;
  execute: (interaction: ContextMenuCommandInteraction) => Promise<void> | void;

  /**
   * @param {{
   *    data: ContextMenuCommandBuilder;
   *    execute?: (interaction: ContextMenuCommandInteraction) => Promise<void> | void;
   *  }}
   */
  constructor(options: {
    data: ContextMenuCommandBuilder;
    execute?: (interaction: ContextMenuCommandInteraction) => Promise<void> | void;
  }) {
    if (options.execute) {
      this.execute = options.execute;
    } else {
      throw new Error('No execute function provided');
    }

    this.data = options.data;
  }
}
