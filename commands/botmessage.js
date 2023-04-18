const { SlashCommandBuilder, Options } = require('discord.js');

// Notes:
// Implements sending attached immages

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botmessage')
		.setDescription('Sends message in selected channel as the bot')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message the bot will send')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel in wich the bot will send the message')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('tts')
				.setDescription('Text sent as TTS?')),
	async execute(interaction) {
		if (interaction.user.id === '565123236577411073') { // try to do this with roles
			if (interaction.options.getChannel('channel').isTextBased() === true) {
				await interaction.options.getChannel('channel').send({content: interaction.options.getString('message'), 
															tts: interaction.options.getBoolean('tts')});
				await interaction.reply({content: 'Done!', ephemeral: true});
			} else {
				await interaction.reply({content: 'The channel is not a text channel!', ephemeral: true});
			}
		} else {
			await interaction.reply({content: 'You do not have the permission to do this!', ephemeral: true});
		}
	},
};
