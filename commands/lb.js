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

// const printRes = (res, l) => {
//     for(let i=0; i<l; i++){
//         console.log(`${res[i].nickname} ma ${res[i].msgCount} wiadomości`)
//     }
// }


module.exports = {
    data: new SlashCommandBuilder()
        .setName('lb')
        .setDescription('Sends leaderboard'),
    async execute(interaction){

        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(`select * from heroku_f71d48d761a257a.messages ORDER BY msgCount DESC`, (error, res) => {

                res = JSON.parse(JSON.stringify(res))
                const lbEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Leaderboard')
                    .setDescription(`Ranking marnowania czasu na discordzie`)
                    .setThumbnail('https://cdn.7tv.app/emote/60b391c23c9b35aea9d2ad42/4x')
                    .addFields(
                        { name: 'Pięciu wspanialych: ', value: `1. ${res[0].nickname} ma ${res[0].msgCount} wiadomości \n
                    2. ${res[1].nickname} ma ${res[1].msgCount} wiadomości \n
                    3. ${res[2].nickname} ma ${res[2].msgCount} wiadomości \n
                    4. ${res[3].nickname} ma ${res[3].msgCount} wiadomości \n
                    5. ${res[4].nickname} ma ${res[4].msgCount} wiadomości \n` }
                    );
                interaction.reply({embeds: [lbEmbed]});
                connection.release()
                if (error) throw error;
            })

        })

    }

};