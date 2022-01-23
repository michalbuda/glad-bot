const fs = require('fs');
const {Client, Collection, Intents, MessageEmbed} = require('discord.js');

// const PREFIX = '_';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.data.name, command)
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles){
    const event = require(`./events/${file}`)
    if (event.once){
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if(!command) return

    try{
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        const errorEmbed = new MessageEmbed()
            .setColor('#d91d0f')
            .setTitle(`O nie! Wystąpił błąd 🤬`)
            .setImage('https://media.discordapp.net/attachments/934461660960276570/934595159927189504/noddersall.gif')
            .setTimestamp()
            .setFooter(`Error: ${error.message} \n ID: ${interaction.id} `)
        await interaction.reply( {embeds: [errorEmbed], ephemeral: false} ) //'Oh no! An error has occured 😓'
    }
})


client.login(process.env.TOKEN);