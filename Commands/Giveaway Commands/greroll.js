const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const { setTimeout } = require("node:timers")
const giveawayModel = require("../../Structures/Schemas/giveawayDB");

module.exports = {
    name: "greroll",
    description: "Reroll a giveaway in this server.",
    options: [
        {
            name: "message_id",
            description: "The message ID of the giveaway you want to reroll",
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

        const messageid = options.getString("message_id");
        client.giveawaysManager.reroll(messageid).then(() => {
            interaction.reply({content: "Successfully rerolled the giveaway!", ephemeral:true})
        });
    }
}