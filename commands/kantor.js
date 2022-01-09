const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

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
        fetch(`https://freecurrencyapi.net/api/v2/latest?${process.env.CURRENCY_API}&base_currency=${baseCurrInput}`).then(r => r.json())
        const { data } = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=bfc20480-70ea-11ec-8494-45aa1cb4fbf9&base_currency=${baseCurrInput}`).then(r => r.json())
        const targetCurr = data[targetCurrInput.toUpperCase()]
        // console.log(interaction.options.data)
        console.log(targetCurr)
        console.log(baseCurrInput.toUpperCase())
        console.log(targetCurrInput.toUpperCase())
        console.log(data.length)
        // let targetValue = data.interaction.options.data[1].value;
        // console.log(data.PLN.type)
        // console.log(data.'PLN')
        // console.log(targetCurrInput)
        let exchanged = value * targetCurr;
        interaction.reply(`Waluta bazowa: ${baseCurrInput.toUpperCase()}\nWaluta docelowa: ${targetCurrInput.toUpperCase()}\nWartość waluty bazowej: ${value}\nWartość przeliczona: ${exchanged}`)

    },
};