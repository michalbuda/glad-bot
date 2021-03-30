const fs = require('fs');
const Discord = require('discord.js');
const {TOKEN} = require('./config.json');

const PREFIX = '_';

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}


client.once('ready', () => {
    console.log(`Logged as ${client.user.tag}`);
})

client.on('message', message => {

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    try{
        command.execute(message, args);
    } catch(error){
        console.error(error);
        message.reply(`error - can't execute that command!`);
    }
})

client.login(TOKEN);