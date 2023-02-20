const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions,
	GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildScheduledEvents,
	GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	if (!interaction.channel.viewable) {
		interaction.reply({ content: 'Cannot send in this channel, please use a bot enabled channel.', ephemeral: true });
		return;
	}

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);