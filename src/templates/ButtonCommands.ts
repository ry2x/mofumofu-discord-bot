import type { ButtonInteraction } from 'discord.js';

export default class ButtonCommands {
  data: {
    name: string;
  };
  execute: (interaction: ButtonInteraction) => Promise<void> | void;

  constructor(options: {
    data: {
      name: string;
    };
    execute?: (interaction: ButtonInteraction) => Promise<void> | void;
  }) {
    if (options.execute) {
      this.execute = options.execute;
    } else {
      throw new Error('No execute function provided');
    }

    this.data = options.data;
  }
}
