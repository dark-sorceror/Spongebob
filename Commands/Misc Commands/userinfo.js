const { MessageEmbed, ContextMenuInteraction, GuildMember } = require('discord.js')
const { SlashCommandBuilder, time } = require('@discordjs/builders');

const DISCORD_EPOCH = 1420070400000;

function convertSnowflakeToDate(snowflake) {
    return new Date(snowflake / 4194304 + DISCORD_EPOCH);
}

module.exports = {
	name: 'userinfo',
	description: 'Display info about a user',
    options: [
        {
            name: "target",
            description: "Target a user to view their userinfo",
            type: "USER",
            required: false
        }
    ],
    async execute(interaction, client) {
        const target = await interaction.options.getUser('target')
        const Response = new MessageEmbed()
        if (target === null) {
            Response.setColor("AQUA")
            .setTitle(`${interaction.user.username}'s info.`)
            .setDescription(`This account belongs to ${interaction.user}`)
            .setAuthor({name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.avatarURL({dynamic:true,size:512})})
            .setThumbnail(interaction.user.avatarURL({dynamic:true, size:512}))
            .addField("Created at", `<t:${parseInt(interaction.user.createdTimestamp/1000)}:D>\n(<t:${parseInt(interaction.user.createdTimestamp/1000)}:R>)`, true)
            .addField("Joined at", `<t:${parseInt(interaction.member.joinedTimestamp/1000)}:D>\n(<t:${parseInt(interaction.member.joinedTimestamp/1000)}:R>)`, true)
            .addField("Status", `${interaction.user.presence}`, true)
            .addField("Roles", `${interaction.member.roles.cache.size}`, true)
            .addField("Highest Role", `${interaction.member.roles.highest}`, true)
            .setFooter({text:`ID: ${interaction.user.id}`})
        } else {
            const { user, guild } = target;
            Response.setColor("AQUA")
            .setTitle(`${user.tag}'s info.`)
            .setDescription(`This account belongs to ${target.user}`)
            .setAuthor({name: `${target.username}`, iconURL: target.avatarURL({dynamic:true,size:512})})
            .setThumbnail(target.avatarURL({dynamic:true, size:512}))
            .addField("Created at", `<t:${parseInt(target.createdTimestamp/1000)}:D>\n(<t:${parseInt(target.createdTimestamp/1000)}:R>)`, true)
            .addField("Joined at", `<t:${parseInt(target.joinedTimestamp/1000)}:D>\n(<t:${parseInt(target.joinedTimestamp/1000)}:R>)`, true)
            .addField("Status", `undefined`, true)
            .addField("Roles", `undefined`, true)
            .addField("Highest Role", `undefined`, true)
            .setFooter({text:`ID: ${target.id}`})
        }
        await interaction.reply({embeds:[Response], ephemeral:true})
    }
}