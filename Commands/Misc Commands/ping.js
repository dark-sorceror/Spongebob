const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Pong!",
    async execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`Bot Latency: **${client.ws.ping}ms**\nAPI Latency: **${Date.now() - interaction.createdTimestamp} ms**`)
        .setFooter({text: "I make burgers at my own pace 😠"})
        .setAuthor({name: "Pong!", iconURL: interaction.user.avatarURL({dynamic:true,size:512})})
        
        interaction.reply({ embeds: [Response]})
    },
};