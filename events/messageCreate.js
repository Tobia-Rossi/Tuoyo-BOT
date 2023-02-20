const fs = require('fs');

module.exports = {
	name: 'messageCreate',
	execute(message) {
		// Checks if it is in a channel it can read
		if (!message.channel.viewable) return;

		// TEMP Log message
		console.log(`${message.author.username} has said: "${message.cleanContent}" in #${message.channel.name}`);

		// No reply to itself
		if (message.author.username.search(/Tuoyo BOT/) !== -1) return;

		// Here you can check for commands
		
		}
	},
};
