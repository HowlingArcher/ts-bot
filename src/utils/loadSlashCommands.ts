import fs from "fs";
import path from "path";
import { SlashCommand } from "../types/SlashCommand";

export function loadSlashCommands(): SlashCommand[] {
	const commands: SlashCommand[] = [];

	const commandsPath = path.join(__dirname, "..", "commands");
	const categories = fs.readdirSync(commandsPath);

	for (const category of categories) {
		const commandFiles = fs
			.readdirSync(path.join(commandsPath, category))
			.filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
		
		for (const file of commandFiles) {
			const { command } = require(path.join(commandsPath, category, file));
			if (command?.data && command?.execute) {
				commands.push(command);
			}
		}
	}
	return commands;
}
