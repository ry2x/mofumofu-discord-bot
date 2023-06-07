import type { AutocompleteInteraction, ChatInputCommandInteraction } from 'discord.js';

/**
 * Represents a SubCommand
 */
export default class SubCommand {
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
  complete: (interaction: AutocompleteInteraction) => Promise<void> | void;

  /**
   *
   * @param {{
   *      execute: Function
   *      complete?: (interaction: AutocompleteInteraction) => Promise<void> | void;
   *      hasComplete?: boolean
   *  }} options - The options for the subcommand
   */
  constructor(options: {
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
    complete?: (interaction: AutocompleteInteraction) => Promise<void> | void;
  }) {
    this.execute = options.execute;

    this.complete =
      options.complete ??
      function () {
        return;
      };
  }
}
