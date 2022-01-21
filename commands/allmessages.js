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
                const lbEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Leaderboard')
                    .setDescription(`Ranking marnowania czasu na discordzie`)
                    .setThumbnail('https://cdn.7tv.app/emote/60b391c23c9b35aea9d2ad42/4x')
                    .addFields(
                        { name: `W sumie wysłano: `, value: `${res[0].messagesAll} wiadomości!!!11oneone`});
                interaction.reply({embeds: [lbEmbed]});
                connection.release()
                if (error) throw error;
            })

        })

    }

};