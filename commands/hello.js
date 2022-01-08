const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Says hello'),
    async execute(interaction, client){
        // console.log(`${interaction.user.tag} used interaction: ${interaction}`)
        interaction.reply('🖕')
        setTimeout(() => {
            interaction.editReply('😘')
        }, 3000)

    }

};