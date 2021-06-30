const Discord = require('discord.js')
const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'btn',
    description: 'Sends button',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Do you like it?')
            .setColor('#00ff00')
            .setImage('https://cdn.discordapp.com/emojis/852626772478787594.png?v=1')
        
        let button = new MessageButton()
            .setStyle('green')
            .setLabel('YUP')
            .setID('test_button')

        message.channel.send('', {
            component: button,
            embed: embed
        })
    }
}