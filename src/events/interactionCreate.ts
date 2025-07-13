import { Client, Interaction, MessageFlags } from "discord.js";
import { loadSlashCommands } from "../utils/loadSlashCommands";

const commands = loadSlashCommands();

export function setupInteractionHandler(client: Client) {
	client.on("interactionCreate", async (interaction: Interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = commands.find((cmd) => cmd.data.name === interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({ content: "There was an error executing this command.", flags: MessageFlags.Ephemeral });
		}
	});
}
