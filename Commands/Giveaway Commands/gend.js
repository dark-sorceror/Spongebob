const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const { setTimeout } = require("node:timers")
const giveawayModel = require("../../Structures/Schemas/giveawayDB");

module.exports = {
    name: "gend",
    description: "End a giveaway in this server.",
    options: [
        {
            name: "message_id",
            description: "The message ID of the giveaway you want to end",
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
        client.giveawaysManager.end(messageid).then(() => {
            interaction.reply({content: "Successfully ended the giveaway!", ephemeral:true})
        });
    }
}