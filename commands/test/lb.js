const Discord = require("discord.js")
const {createPool} = require('mysql')
const { MessageEmbed } = require('discord.js')

const pool = createPool({
    host: 'localhost',
    user: 'harambowski',
    password: 'jebacdisa',

})

// const printRes = (res, l) => {
//     for(let i=0; i<l; i++){
//         console.log(`${res[i].nickname} ma ${res[i].msgCount} wiadomości`)
//     }
// }



module.exports = {
    name: 'lb',
    descripton: 'Shows message leaderboard',
    execute(message) {

        pool.query(`select * from node_test.messages ORDER BY msgCount DESC`, (err, res) => {

            const lbEmbed = new Discord.MessageEmbed()
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
            message.channel.send(lbEmbed);
            // console.log(res[0].nickname)
            // message.channel.send(`${res[0].nickname} ma ${res[0].msgCount} wiadomości`)
            // if(err) console.error(err)
            // else {
            //     // console.log(`length = ${arrLength}`)
            //     message.channel.send({embeds: [lbEmbed]});
            // }
        })

    },
};