const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');

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
        await interaction.reply( {content: 'Oh no! An error has occured. 😓', ephemeral: true} )
    }
})


client.login(process.env.TOKEN);