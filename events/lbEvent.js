const { MessageEmbed } = require('discord.js')
const mysql = require('mysql')
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
    name: "ready",
    once: true,
    execute(client){

        const sendLb = () => {

            const hoursLeft = () => {
                let day = new Date();
                return (-day + day.setHours(21, 59, 59, 0));//(22, 59, 59, 0)
            }

            const sendM = () => {

                const getEmote = (emoteId) => {
                    return client.emojis.cache.get(emoteId)
                }

                const getGuild = (guildId) => {
                    return client.guilds.cache.get(guildId)
                }

                pool.getConnection((err, connection) => {
                    if (err) throw err;

                    connection.query(`select * from heroku_f71d48d761a257a.messages ORDER BY msgCount DESC`, (error, res) => {

                        const percentage = (position) => {
                            return ((res[position].msgCount/res[0].msgCount)*100).toPrecision(3)
                        };
                        let emoji
                        if(res[0].msgCount <= 1500) {
                            emoji = getEmote('934512251031916574')
                        } else if (res[0].msgCount > 1500 && res[0].msgCount < 4000){
                            emoji = getEmote('934519911282258032')
                        } else if (res[0].msgCount >= 4000){
                            emoji = getEmote('934521182236057610')
                        }

                        res = JSON.parse(JSON.stringify(res))
                        const lbEmbedEvent = new MessageEmbed()
                            .setColor('#FFB100')
                            .setTitle(`${getGuild('678963461446828052').name} - ranking wysłanych wiadomości`)
                            .setDescription(`Dzisiaj wysłano: **${res[0].msgCount}** wiadomości ${emoji}`)
                            .setThumbnail('https://cdn.discordapp.com/attachments/934461660960276570/934462046714617906/3x.gif')//https://cdn.7tv.app/emote/60b391c23c9b35aea9d2ad42/4x https://media.discordapp.net/attachments/929574114405011458/934446722682339358/ezgif.com-gif-maker.gif
                            .addFields(
                                { name: 'Pięciu wspaniałych: ', value: `${getEmote('934534030290993152')} 1. **${res[1].nickname}** - ${res[1].msgCount} wiadomości (${percentage(1)}%)\n
                                ${getEmote('934541661881655367')} 2. **${res[2].nickname}** - ${res[2].msgCount} wiadomości (${percentage(2)}%)\n
                                ${getEmote('934540798366711848')} 3. **${res[3].nickname}** - ${res[3].msgCount} wiadomości (${percentage(3)}%)\n
                                ${getEmote('871042445993992212')} 4. **${res[4].nickname}** - ${res[4].msgCount} wiadomości (${percentage(4)}%)\n
                                ${getEmote('934532803213811722')} 5. **${res[5].nickname}** - ${res[5].msgCount} wiadomości (${percentage(5)}%)\n
                                Pełna lista dostępna tutaj: https://gladbot.netlify.app/` },
                                { name: '\u200B', value: '\u200B' })
                            .setTimestamp()
                            .setFooter(`Powered by ${client.user.username}`, `${client.user.avatarURL()}`);

                        const channelBot = client.channels.cache.get('678977614215512105');
                        // const channelTest = client.channels.cache.get('878388789108695150');
                        channelBot.send({embeds: [lbEmbedEvent]});
                        connection.release()
                        if (error) throw error;
                    })

                })

                console.log('lb sent')
            }

            const resetMsg = () => {
                pool.getConnection((err, connection) => {
                    if (err) throw err;

                    connection.query(`UPDATE heroku_f71d48d761a257a.messages SET msgCount = 0;`, error => {
                        if (error) throw error;
                        connection.release()
                    })

                })
            }

            setTimeout( () => {
                sendM();
                setTimeout(() => {
                    resetMsg()
                }, 1000)

                let dayToMs = 24*60*60*1000;
                setInterval( () => {
                    sendM();
                    setTimeout(() => {
                        resetMsg()
                    }, 1000)
                }, dayToMs )
            },  hoursLeft());

        }

        sendLb()
    }
}