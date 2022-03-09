const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "roles",
    description: "Displays reaction roles",
    async execute(interaction, client) {
        const crow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('c:945390958294491156')
            .setLabel('🍫')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945391514597589052')
            .setLabel('🌊')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945391702288511007')
            .setLabel('☀️')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945392207563739196')
            .setLabel('🍭')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945392805746995290')
            .setLabel('😈')
            .setStyle('SECONDARY')
        )
        const crow2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('c:945393938733334558')
            .setLabel('🖤')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945394242975584316')
            .setLabel('☁️')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945394455320625172')
            .setLabel('🍊')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945394526443409448')
            .setLabel('🍏')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('c:945394534567792691')
            .setLabel('🍒')
            .setStyle('SECONDARY')
        )
        const crow3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('c:945394760837898312')
            .setLabel('🐳')
            .setStyle('SECONDARY')
        )

        const rrow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('r:945386509689815060')
            .setLabel('Announcement Ping')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('r:945386571908149269')
            .setLabel('Giveaway Ping')
            .setStyle('SECONDARY')
        )

        const cembed = new MessageEmbed()
        .setTitle("Color Roles")
        .setColor("#2F3136")

        const rembed = new MessageEmbed()
        .setTitle("Ping Roles")
        .setColor("#2F3136")

        await interaction.reply({content: "Done!"})
        await interaction.channel.send({embeds: [rembed], components: [rrow]})
        await interaction.channel.send({embeds: [cembed], components: [crow, crow2, crow3]})

    }
}