const mysql = require('mysql')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
// const {HOST, USER, PASSWORD, DATABASE} = require("../config.json");


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// const pool = mysql.createPool({
//     host: HOST,
//     user: USER,
//     password: PASSWORD,
//     database: DATABASE
// })

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allmessages')
        .setDescription('Sends a count of all messages'),
    async execute(interaction){

        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(`select * from heroku_f71d48d761a257a.messagesall`, (error, res) => {

                res = JSON.parse(JSON.stringify(res))
                let format = res[0].messagesAll
                const lbEmbed = new MessageEmbed()
                    .setColor('#FFB100')//#5ad40d
                    .setTitle(`${interaction.guild.name} - ranking wysłanych wiadomości`)
                    .setDescription(`W sumie wysłano **${format.toLocaleString()}** wiadomości!`)
                    .setThumbnail('https://cdn.discordapp.com/attachments/934461660960276570/934576288440676352/bruh.gif')
                    .setTimestamp()
                    .setFooter(`Powered by ${interaction.client.user.username}`, `${interaction.client.user.avatarURL()}`)
                interaction.reply({embeds: [lbEmbed]});
                connection.release()
                if (error) throw error;
            })

        })

    }

};