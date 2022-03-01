const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

const DISCORD_EPOCH = 1420070400000;

function convertSnowflakeToDate(snowflake) {
    return new Date(snowflake / 4194304 + DISCORD_EPOCH);
}

module.exports = {
    name: 'serverinfo',
    description: 'Display info about this server.',
    async execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const { createdTimestamp, ownerId, description, members, memberCount, emojis, roles, region, presences, preferredLocale } = guild;
        //const { online, idle, offline, dnd, streaming, mobile } = community_report(guild)

        let timestamp = convertSnowflakeToDate(guild)

        //FORMATTING
        if (!guild.icon) { guildicon = 'https://cdn.discordapp.com/attachments/865342805107015722/871546487220359229/dd4dbc0016779df1378e7812eabaa04d.png'
        } else { guildicon = guild.icon }
        vc_regions = {
            "eu-west": "EU West " + "\U0001F1EA\U0001F1FA",
            "eu-central": "EU Central " + "\U0001F1EA\U0001F1FA",
            "europe": "Europe " + "\U0001F1EA\U0001F1FA",
            "london": "London " + "\U0001F1EC\U0001F1E7",
            "frankfurt": "Frankfurt " + "\U0001F1E9\U0001F1EA",
            "amsterdam": "Amsterdam " + "\U0001F1F3\U0001F1F1",
            "us-west": "US West " + "\U0001F1FA\U0001F1F8",
            "us-east": "US East " + "\U0001F1FA\U0001F1F8",
            "us-south": "US South " + "\U0001F1FA\U0001F1F8",
            "us-central": "US Central " + "\U0001F1FA\U0001F1F8",
            "singapore": "Singapore " + "\U0001F1F8\U0001F1EC",
            "sydney": "Sydney " + "\U0001F1E6\U0001F1FA",
            "brazil": "Brazil " + "\U0001F1E7\U0001F1F7",
            "hongkong": "Hong Kong " + "\U0001F1ED\U0001F1F0",
            "russia": "Russia " + "\U0001F1F7\U0001F1FA",
            "japan": "Japan " + "\U0001F1EF\U0001F1F5",
            "southafrica": "South Africa " + "\U0001F1FF\U0001F1E6",
            "india": "India " + "\U0001F1EE\U0001F1F3",
            "dubai": "Dubai " + "\U0001F1E6\U0001F1EA",
            "south-korea": "South Korea " + "\U0001f1f0\U0001f1f7"
        }
        /*
        bots = 0
        for (var i = 0; i < guild.members.length; i++) {
            bots += 1
        }
        */
        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setTitle("Server Information")
            if (guild.description === null) {
                embed.setDescription(`**Owner:** <@${ownerId}>\n**Region:** ${vc_regions[preferredLocale]}\n**Creation:** <t:${parseInt(timestamp.getTime() / 1000)}:D> (<t:${parseInt(timestamp.getTime() / 1000)}:R>)`)
            } else {
                embed.setDescription(`${guild.description}\n\n**Owner:** \n**Region:** ${vc_regions[preferredLocale]}\n**Creation:** <t:${parseInt(timestamp.getTime() / 1000)}:D> (<t:${parseInt(timestamp.getTime() / 1000)}:R>)`)
            }
            embed.setThumbnail(`${guild.iconURL({dynamic: true})}`)
            embed.setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL})
            embed.addFields(
                { name: "Stats", value:`**Total Members:** ${memberCount}\n**Bots:** ${members.cache.filter((m) => m.user.bot).size}\n**Emotes:** ${emojis.cache.size}\n**Roles:** ${roles.cache.size}`, inline: true},
                { name: "Server Stats", value:"**Total Messages:** 0\n**Total Commands:** 0", inline:true},
                { name: "Member Stats", value: `<:online:883116554298990605> **Online:** ${presences.cache.filter((presence) => presence.status == "online").size}\n<:idle:883116602332160000> **Idle:** ${presences.cache.filter((presence) => presence.status == "idle").size}\n<:dnd:883116589531160576> **Dnd:** ${presences.cache.filter((presence) => presence.status == "dnd").size}\n<:offline:883116572904923138> **Offline:** ${presences.cache.filter((presence) => presence.status == "offline").size}\n<:streaming:883116541531545630> **Streaming:** ${presences.cache.filter((presence) => presence.activities == "STREAMING").size}\n<:mobile:883116501178122240> **Mobile:** ${presences.cache.filter((presence) => presence.clientStatus == "mobile").size}`, inline:true}
            )
            embed.setFooter({text: `ID: ${guild.id}`})
    
        await interaction.reply({embeds:[embed]});
    },
};