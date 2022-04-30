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
    name: 'messageCreate',
    once: false,
    execute(messageCreate) {
        if (messageCreate.author.bot) return

        const channelLogs = messageCreate.client.channels.cache.get('969720165539414098');
        // channelLogs.send(`${messageCreate.author.tag} sent ${messageCreate.content}`)
        // const timestamp = messageCreate.createdAt.toString();
        const h = messageCreate.createdAt.getHours()+2
        const min = messageCreate.createdAt.getMinutes()
        const s = messageCreate.createdAt.getSeconds()
        const y = messageCreate.createdAt.getFullYear()
        const mth = messageCreate.createdAt.getMonth()
        const d = messageCreate.createdAt.getDate()
        channelLogs.send(`**${messageCreate.author.tag}** wysłał/a: *"${messageCreate.content}"* o godz. ${h}:${min}:${s} dnia ${d}-${mth}-${y}`)
        // channelLogs.send(`*"${messageCreate.content}"* wysłane przez **${messageCreate.author.tag}** o ${messageCreate.createdAt}`)
        // console.log(`${messageCreate.author.tag} sent: ${messageCreate.content} at ${messageCreate.createdAt}`);

        // pool.getConnection((err, connection) => {
        //     if (err) throw err;
        //     connection.query(`UPDATE messagesdev SET msgCount = msgCount + 1 WHERE user_id = ${messageCreate.author.id}`, (error) => {
        //     connection.release();
        //     if (error) throw error;
        //     })
        // })


        // pool.getConnection((err, connection) => {
        //     if (err) throw err;
        //     connection.query(`UPDATE messagesdev SET msgCount = msgCount + 1 WHERE user_id = 0`, (error) => {
        //         connection.release();
        //         if (error) throw error;
        //     })
        // })
    }
}