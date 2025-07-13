import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	PermissionFlagsBits,
	MessageFlags,
        Message,
} from "discord.js";
import { SlashCommand } from "../../types/SlashCommand";

export const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("admin")
		.setDescription("Administrative commands")
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addSubcommand((sub) => sub
			.setName("ban")
			.setDescription("Ban a member")
			.addUserOption((opt) => opt
				.setName("target")
				.setDescription("The user to ban")
				.setRequired(true)
			)
			.addStringOption((opt) => opt
				.setRequired(true)
				.setName("reason")
				.setDescription("The reason for the ban")
			)
		)
		.addSubcommand((sub) => sub
			.setName("kick")
			.setDescription("Kick a member")
			.addUserOption((opt) => opt
				.setName("target")
				.setDescription("User to kick")
				.setRequired(true)
			)
			.addStringOption((sub) => sub
				.setName("reason")
				.setDescription("Reason to kick")
				.setRequired(true)
			)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		const target = interaction.options.getUser("target", true);
		const reason = interaction.options.getString("reason") || "No reason provided";

		const member = await interaction.guild?.members.fetch(target.id).catch(() => null);
		if (!member) {
			await interaction.reply({ content: "User not found", flags: MessageFlags.Ephemeral });
			return;
		}
		
		switch (sub) {
			case "ban":
				if (!member.bannable) {
					await interaction.reply({ content: "Can't ban this user", flags: MessageFlags.Ephemeral });
					return;
				}
				await member.user.send({ content: `Banned from __**${interaction.guild?.name}**__ for *${reason}*` });
				await member.ban({ reason });
				await interaction.reply({ content: `Banned ${member.user.username} | Reason: ${reason}` });
				break;
			case "kick":
				if (!member.kickable) {
					await interaction.reply({ content: "Can't kick this user", flags: [MessageFlags.Ephemeral] });
					return;
				}
				await member.user.send({ content: `Kicked from __**${interaction.guild?.name}**__ for *${reason}*` });
				await member.kick(reason);
				await interaction.reply({ content: `Kicked ${member.user.username} | Reason: ${reason}` });
				break;
		}
	},
};
