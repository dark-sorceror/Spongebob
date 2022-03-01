const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("⛔ An error occured while running this command.")
                ]
            }) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        } else if (interaction.isButton()) {
            if (!interaction.guild) return;

            await interaction.member.fetch();
            const id = interaction.customId;
            if (id.startsWith('c') || id.startsWith('r')) {
                let member;
                const fetchMem = await interaction.guild.members.fetch(interaction.member.id, false);
                if (fetchMem) member = interaction.guild.members.cache.get(interaction.member.id);
                await member.fetch(true);
                const role = id.split(':')[1];
                if (interaction.member.roles.cache.has(role)) {
                    interaction.member.roles.remove(role);
                    interaction.reply({ content: `Removed <@&${role}> for you`, ephemeral: true });
                }
                else {
                    interaction.member.roles.add(role);
                    interaction.reply({ content: `Added <@&${role}> for you`, ephemeral: true });
                }
            }

        }
    }
}