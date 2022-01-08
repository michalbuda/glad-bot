const {createPool, createConnection} = require('mysql')
const Discord = require("discord.js");

const con = createConnection({
    host: 'localhost',
    user: 'harambowski',
    password: 'jebacdisa',
    database: 'node_test'
})

// const pool = createPool({
//     host: 'localhost',
//     user: 'harambowski',
//     password: 'jebacdisa',
//
// })

module.exports = {
    name: 'ready',
    once: true,
    execute(message) {

        // const addTable = () => {
        //
        //     const hoursLeft = () => {
        //         let day = new Date();
        //         return (-day + day.setHours(1, 6, 1, 0));
        //     }
        //
        //     let dateString = Date.now().toString().slice(0, 8);
        //     let tableName = 'msg_'+dateString;
        //
        //     const createTable = () => {
        //         con.query(`CREATE TABLE ${tableName} (
        //         ID INT AUTO_INCREMENT PRIMARY KEY,
        //         nickname VARCHAR(255), msgCount BIGINT(255), user_id BIGINT(64))`);
        //
        //     }
        //
        //     const insertDefault = () => {
        //         con.query(`INSERT INTO ${tableName} (ID, nickname, msgCount, user_id) VALUES (NULL, 'test-obj', 1111, 832441018393034775)`)
        //     }
        //
        //     setTimeout( () => {
        //         createTable();
        //         insertDefault();
        //         let dayToMs = 24*60*60*1000;
        //         setInterval( () => {
        //             createTable();
        //         }, dayToMs )
        //     },  hoursLeft());
        //
        //     // DISCORD EMBED MESSAGE
        //     // con.query(`select * from node_test.messages ORDER BY msgCount DESC`, (err, res) => {
        //     //
        //     //     const lbEmbed = new Discord.MessageEmbed()
        //     //         .setColor('#0099ff')
        //     //         .setTitle('Leaderboard')
        //     //         .setDescription(`Ranking marnowania czasu na discordzie`)
        //     //         .setThumbnail('https://cdn.7tv.app/emote/60b391c23c9b35aea9d2ad42/4x')
        //     //         .addFields(
        //     //             { name: 'Pięciu wspanialych: ', value: `1. ${res[0].nickname} ma ${res[0].msgCount} wiadomości \n
        //     //         2. ${res[1].nickname} ma ${res[1].msgCount} wiadomości \n
        //     //         3. ${res[2].nickname} ma ${res[2].msgCount} wiadomości \n
        //     //         4. ${res[3].nickname} ma ${res[3].msgCount} wiadomości \n
        //     //         5. ${res[4].nickname} ma ${res[4].msgCount} wiadomości \n` }
        //     //         );
        //     //     message.channel.send(lbEmbed);
        //     //
        //     // })
        //
        //
        //
        // }
        //
        // addTable();
    }
}