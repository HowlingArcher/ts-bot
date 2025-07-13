import { SlashCommandBuilder, MessageFlags } from "discord.js";
import { SlashCommand } from "../../types/SlashCommand";

export const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong!"),

	async execute(interaction) {
		await interaction.reply({ content: "Pong!", flags: MessageFlags.Ephemeral });
	},
};
