const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

// const { CURRENCY_API } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kantor')
        .setDescription('Exchanges currency')
        .addStringOption(option => {
            return option.setName('waluta-bazowa')
                .setDescription('Type base currency')
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('waluta-docelowa')
                .setDescription('Type target currency')
                .setRequired(true)
        })
        .addNumberOption( option => {
            return option.setName('wartosc-waluty-bazowej')
                .setDescription('Type base currency value')
                .setRequired(true)
        }),
    async execute(interaction) {
        const baseCurrInput = interaction.options.data[0].value;
        const targetCurrInput = interaction.options.data[1].value;
        const value = interaction.options.data[2].value;
        fetch(`https://freecurrencyapi.net/api/v2/latest?${process.env.CURRENCY_API}&base_currency=${baseCurrInput}`).then(r => r.json()) //process.env.CURRENCY_API
        const { data } = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.CURRENCY_API}&base_currency=${baseCurrInput}`).then(r => r.json()) //process.env.CURRENCY_API
        const targetCurr = data[targetCurrInput.toUpperCase()]
        // console.log(interaction.options.data)
        // console.log(targetCurr)
        // console.log(baseCurrInput.toUpperCase())
        // console.log(targetCurrInput.toUpperCase())
        // console.log(data.length)

        let exchanged = value * targetCurr;

        const exchangeEmbed = new MessageEmbed()
            .setColor('#FFB100')
            .setTitle(`Sprawdź kurs wybranych walut!`)
            .setDescription(`Lista dostępnych walut: https://freecurrencyapi.net/`)
            .setThumbnail(`${interaction.client.user.avatarURL()}`)
            .addFields(
                {name: `Wybrana waluta bazowa   `, value: `${baseCurrInput.toUpperCase()}`, inline: true},
                {name: ` Wybrana waluta docelowa   `, value: `${targetCurrInput.toUpperCase()}`, inline: true},
                {name: `Przeliczone wartości:`, value: `**${value}** ${baseCurrInput.toUpperCase()}  ➡  **${exchanged.toPrecision(4)}** ${targetCurrInput.toUpperCase()}`},
                { name: '\u200B', value: '\u200B' }
            )
            .setTimestamp()
            .setFooter(`Requested by: ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)

        interaction.reply({embeds: [exchangeEmbed]})
//Waluta bazowa: ${baseCurrInput.toUpperCase()}\nWaluta docelowa: ${targetCurrInput.toUpperCase()}\nWartość waluty bazowej: ${value}\nWartość przeliczona: ${exchanged}
    },
};