const { SlashCommandBuilder } = require('@discordjs/builders');
const {createClient} = require("pexels");
// const {PEXELS} = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('img')
        .setDescription('Displays image of your choice')
        .addStringOption(option => {
            return option.setName('content')
                .setDescription('Type which image to search for')
                .setRequired(true)
        }),
    execute: async function (interaction) {
        const pexels = createClient(process.env.PEXELS);
        const query = interaction.options.data[0].value;
        const random = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        // console.log(`${interaction.user.tag} used interaction: ${interaction}`)
        const img = await pexels.photos.search({query, per_page: 80}).then(result => result.photos[random(0, 80)]);
        // console.log(interaction.options.data)
        if (img === undefined) {
            interaction.reply('Image not found 😥');
        } else {
            if (query === 'rat' || query === 'RAT' || query === 'Rat'){
                interaction.reply('https://media.discordapp.net/attachments/929574114405011458/929574126597865472/images.png')
            } else {
                interaction.reply(`${img.src.large}`)
            }

        }

    }

};