const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const { setTimeout } = require("node:timers")
const giveawayModel = require("../../Structures/Schemas/giveawayDB");

module.exports = {
    name: "gcancel",
    description: "Cancel a giveaway in this server and delete it.",
    options: [
        {
            name: "message_id",
            description: "The message ID of the giveaway you want to cancel",
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
            //pass in the confirmation buttons
            interaction.reply({ content: "Successfully cancelled the giveaway!", ephemeral: true })
        });
    }
}