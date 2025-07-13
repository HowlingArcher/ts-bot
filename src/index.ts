import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv";
import { registerSlashCommands } from './utils/registerSlashCommands';
import { setupInteractionHandler } from './events/interactionCreate';

registerSlashCommands();

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

setupInteractionHandler(client);

client.login(process.env.DISCORD_BOT_TOKEN);

