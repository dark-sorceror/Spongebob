const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const { setTimeout } = require("node:timers")
const giveawayModel = require("../../Structures/Schemas/giveawayDB");

module.exports = {
    name: "drop",
    description: "Start a drop giveaway.",
    options: [
        {
            name: "winners",
            description: "Select the amount of winners for this giveaway.",
            type: "INTEGER",
            required: true
        },
        {
            name: "prize",
            description: "Provide the name of the prize",
            type: "STRING",
            required: true
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const gchannel = options.getChannel("channel") || interaction.channel;
        const duration = options.getString("duration");
        const winnerCount = options.getInteger("winners");
        const prize = options.getString("prize");

        if (gchannel == interaction.channel) {
            await interaction.reply({ content: `✅ Successfully started a giveaway`, ephemeral: true })
        } else {
            await interaction.reply({ content: `✅ Successfully started a giveaway in ${gchannel}`, ephemeral: true })
        }
        client.giveawaysManager.start(gchannel, {
            prize: prize,
            winnerCount: winnerCount,
            hostedBy: interaction.user,
            isDrop: true,
        });
    }
}
