const fs = require('fs');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		fs.appendFile('interactions.log', `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.\n`, function (err) {
			if (err) throw err;
		   }); 
	},
};