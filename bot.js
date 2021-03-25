const fs = require('fs');
const Discord = require('discord.js');
const {TOKEN} = require('./config.json');

const client = new Discord.Client();


client.once('ready', () => {
    console.log(`Logged as ${client.user.tag}`);
})


client.login(TOKEN);