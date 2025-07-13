import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { loadSlashCommands } from "./loadSlashCommands";

dotenv.config();

const commands = loadSlashCommands().map((cmd) => cmd.data.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);

export async function registerSlashCommands() {
	try {
		console.log("Regestering slash commands...");

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID!),

			{ body: commands }
		);

		console.log("Slash commands registered!");
	} catch (err) {
		console.error("Failed to register commands:", err);
	}
}
