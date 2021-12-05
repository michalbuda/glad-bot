const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const {TOKEN} = require('./config.json');

// const PREFIX = '_';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

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
// client.commands = new Discord.Collection();

// require('discord-buttons')(client);

// const commandFolders = fs.readdirSync('./commands');
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// for (const folder of commandFolders) {
//     const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
//     for (const file of commandFiles) {
//         const command = require(`./commands/${folder}/${file}`);
//         client.commands.set(command.name, command);
//     }
// }

// for (const file of eventFiles) {
// 	const event = require(`./events/${file}`);
// 	if (event.once) {
// 		client.once(event.name, (...args) => event.execute(...args, client));
// 	} else {
// 		client.on(event.name, (...args) => event.execute(...args, client));
// 	}
// }


// client.on('message', message => {
//
//     // if(!message.content.startsWith(PREFIX) || message.author.bot) return;
//     //
//     // const args = message.content.slice(PREFIX.length).trim().split(/ +/);
//     // const commandName = args.shift().toLowerCase();
//     //
//     // if (!client.commands.has(commandName)) return;
//     //
//     // const command = client.commands.get(commandName);
//     //
//     // if (command.args && !args.length) {
//     //     return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
//     // }
//     //
//     // try{
//     //     command.execute(message, args);
//     // } catch(error){
//     //     console.error(error);
//     //     message.reply(`error - can't execute that command!`);
//     // }
// })

client.login(TOKEN);