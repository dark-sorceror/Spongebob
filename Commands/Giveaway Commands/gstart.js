const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const { setTimeout } = require("node:timers")
const giveawayModel = require("../../Structures/Schemas/giveawayDB");

module.exports = {
    name: "gstart",
    description: "Start a giveaway.",
    options: [
        {
            name: "duration",
            description: "Provide a duration for this giveaway (1m, 1h, 1d)",
            type: "STRING",
            required: true
        },
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
        },
        {
            name: "channel",
            description: "Select a channel to send the giveaway to.",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "required",
            description: "Required roles to enter this giveaway.",
            type: "ROLE"
        },
        {
            name: 'bonusrole',
            description: 'Role which would recieve bonus entries',
            type: 'ROLE',
            required: false
        },
        {
            name: 'bonusamount',
            description: 'The amount of bonus entries the role will recieve',
            type: 'INTEGER',
            required: false
        },
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
                ephemeral: true
            });
        }
        const { options } = interaction;

        const gchannel = options.getChannel("channel") || interaction.channel;
        const duration = options.getString("duration");
        const winnerCount = options.getInteger("winners");
        const prize = options.getString("prize");
        const bonusRole = interaction.options.getRole('bonusrole')
        const bonusEntries = interaction.options.getInteger('bonusamount')
        let rolereq = interaction.options.getRole('role')
        let invite = interaction.options.getString('invite')

        if (isNaN(ms(duration))) {
            return interaction.reply({
                content: ':x: Please select a valid duration!',
                ephemeral: true
            });
        }
        if (winnerCount < 1) {
            return interaction.reply({
                content: ':x: Please select a valid winner count! greater or equal to one.',
                ephemeral: true
            })
        }

        if (bonusRole) {
            if (!bonusEntries) {
                return interaction.reply({
                    content: `:x: You must specify how many bonus entries would ${bonusRole} recieve!`,
                    ephemeral: true
                });
            }
        }

        if (gchannel == interaction.channel) {
            await interaction.reply({ content: `✅ Successfully started a giveaway`, ephemeral: true })
        } else {
            await interaction.reply({ content: `✅ Successfully started a giveaway in ${gchannel}`, ephemeral: true })
        }

        client.giveawaysManager.start(gchannel, {
            duration: ms(duration),
            prize: prize,
            winnerCount: winnerCount,
            hostedBy: interaction.user,
            bonusEntries: [
                {
                    // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
                    bonus: new Function('member', `member.roles.cache.some((r) => r.name === ${bonusRole?.name}) ? ${bonusEntries} : null`),
                    cumulative: false
                }
            ],
            extraData: {
                role: rolereq == null ? "null" : rolereq.id
            }
        });
        if (bonusRole) {
            let giveaway = new MessageEmbed()
                .setDescription(
                    `**${bonusRole}** Has **${bonusEntries}** Extra Entries in this giveaway!`
                )
                .setColor("#2F3136")
            gchannel.send({ embeds: [giveaway] });
        }
    }
}
