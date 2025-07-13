import { Client, Message } from "discord.js";
import { loadCommands } from "../utils/loadCommands";

const commands = loadCommands();

export function setupMessageHandler(client: Client) {
	client.on("messageCreate", (message: Message) => {
		if (message.author.bot || !message.content.startsWith("!")) return;

		const args = message.content.slice(1).trim().split(/ +/);
		const commandName = args.shift()?.toLowerCase();

		const command = commandName ? commands.get(commandName) : undefined;

		if (command) {
			command.execute(message, args);
		} else {
			console.log("Unknown command: "+ message);
		}
	});
}
