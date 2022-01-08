const { MessageEmbed } = require('discord.js')
const mysql = require('mysql')
// const {HOST, USER, PASSWORD, DATABASE} = require("../config.json");

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

module.exports = {
    name: "ready",
    once: true,
    execute(client){

        const sendLb = () => {

            const hoursLeft = () => {
                let day = new Date();
                return (-day + day.setHours(1, 29, 59, 0));
            }

            const sendM = () => {

                // pool.query(`select * from node_test.messages ORDER BY msgCount DESC`, (err, res) => {
                //
                //     const lbEmbedEvent = new MessageEmbed()
                //         .setColor('#fcba03')
                //         .setTitle('Leaderboard dev test')
                //         .setDescription(`Ranking marnowania czasu na discordzie`)
                //         .setThumbnail('https://cdn.7tv.app/emote/60b391c23c9b35aea9d2ad42/4x')
                //         .addFields(
                //             { name: 'Pięciu wspanialych: ', value: `1. ${res[0].nickname} ma ${res[0].msgCount} wiadomości \n
                //     2. ${res[1].nickname} ma ${res[1].msgCount} wiadomości \n
                //     3. ${res[2].nickname} ma ${res[2].msgCount} wiadomości \n
                //     4. ${res[3].nickname} ma ${res[3].msgCount} wiadomości \n
                //     5. ${res[4].nickname} ma ${res[4].msgCount} wiadomości \n` }
                //         );
                //     // const channelBot = client.channels.cache.get('678977614215512105');
                //     const channelTest = client.channels.cache.get('878388789108695150');
                //     channelTest.send({embeds: [lbEmbedEvent]});
                //
                // })

                pool.getConnection((err, connection) => {
                    if (err) throw err;

                    connection.query(`select * from heroku_f71d48d761a257a.messages ORDER BY msgCount DESC`, (error, res) => {

                        res = JSON.parse(JSON.stringify(res))
                        const lbEmbedEvent = new MessageEmbed()
                                .setColor('#fcba03')
                                .setTitle('Leaderboard dev test')
                                .setDescription(`Ranking marnowania czasu na discordzie`)
                                .setThumbnail('https://cdn.7tv.app/emote/60b391c23c9b35aea9d2ad42/4x')
                                .addFields(
                                    { name: 'Pięciu wspanialych: ', value: `1. ${res[0].nickname} ma ${res[0].msgCount} wiadomości \n
                            2. ${res[1].nickname} ma ${res[1].msgCount} wiadomości \n
                            3. ${res[2].nickname} ma ${res[2].msgCount} wiadomości \n
                            4. ${res[3].nickname} ma ${res[3].msgCount} wiadomości \n
                            5. ${res[4].nickname} ma ${res[4].msgCount} wiadomości \n` }
                                );

                        // const channelBot = client.channels.cache.get('678977614215512105');
                        const channelTest = client.channels.cache.get('878388789108695150');
                        channelTest.send({embeds: [lbEmbedEvent]});
                        connection.release()
                        if (error) throw error;
                    })

                })

                console.log('lb sent')
            }

            setTimeout( () => {
                sendM();
                let dayToMs = 24*60*60*1000;
                setInterval( () => {
                    sendM();
                }, dayToMs )
            },  hoursLeft());

        }

        sendLb()
    }
}