const Discord = require('discord.js');
const defaultButtonRolesMessages = {
	addMessage: 'I have added the {role} role to you!',
	removeMessage: 'I have removed the {role} role from you!',
};

module.exports = async (client, button) => {
	if (!button.guild) return;
	if (!client.customMessages || !client.customMessages.buttonRolesMessages) {
		client.customMessages = {
			buttonRolesMessages: defaultButtonRolesMessages,
			giveawayMessages: defaultGiveawayMessages,
		};
	}
	await button.member.fetch();
	const id = button.customId;
	if (id.startsWith('c')) {
		let member;
		const fetchMem = await button.guild.members.fetch(button.member.id, false);
		if (fetchMem) member = button.guild.members.cache.get(button.member.id);
		await member.fetch(true);
		const role = id.split(':')[1];
		if (button.member.roles.cache.has(role)) {
			button.member.roles.remove(role);
			button.reply({ content: client.customMessages.buttonRolesMessages.removeMessage.replace(/{role}/g, `<@&${role}>`), ephemeral: true });
		}
		else {
			button.member.roles.add(role);
			button.reply({ content: client.customMessages.buttonRolesMessages.addMessage.replace(/{role}/g, `<@&${role}>`), ephemeral: true });
		}
	}else if (id.startsWith('r')) {
		let member;
		const fetchMem = await button.guild.members.fetch(button.member.id, false);
		if (fetchMem) member = button.guild.members.cache.get(button.member.id);
		await member.fetch(true);
		const role = id.split(':')[1];
		if (button.member.roles.cache.has(role)) {
			button.member.roles.remove(role);
			button.reply({ content: client.customMessages.buttonRolesMessages.removeMessage.replace(/{role}/g, `<@&${role}>`), ephemeral: true });
		}
		else {
			button.member.roles.add(role);
			button.reply({ content: client.customMessages.buttonRolesMessages.addMessage.replace(/{role}/g, `<@&${role}>`), ephemeral: true });
		}
	}
};