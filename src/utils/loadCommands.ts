import path from "path";
import fs from "fs";
import { Command } from "../types/Command";

export function loadCommands(): Map<String, Command> {
	const commands = new Map<string, Command>();
	
	const commandsPath = path.join(__dirname, "..", "commands");
	const categories = fs.readdirSync(commandsPath);

	for (const category of categories) {
		const categoryPath = path.join(commandsPath, category);
		const files =fs.readdirSync(categoryPath).filter((f) => f.endsWith(".ts") || f.endsWith(".js"));

		for (const file of files) {
			const { [path.parse(file).name]: command } = require(path.join(categoryPath, file));
			if (command && command.name) {
				commands.set(command.name, command);
			}
		}
	}
	return commands
}
