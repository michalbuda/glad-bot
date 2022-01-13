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

        // const channelLogs = client.channels.cache.get('930622679264944138');
        // channelLogs.send(`**${messageCreate.author.tag}** sent: *"${messageCreate.content}"* at ${messageCreate.createdAt}`)
        // console.log(`${messageCreate.author.tag} sent: ${messageCreate.content} at ${messageCreate.createdAt}`);

        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(`UPDATE messages SET msgCount = msgCount + 1 WHERE user_id = ${messageCreate.author.id}`, (error) => {
            connection.release();
            if (error) throw error;
            })
        })
        // pool.getConnection((err, connection) => {
        //     if (err) throw err;
        //     connection.query(`UPDATE messagesall SET messagesDaily = messagesDaily + 1`, (error) => {
        //         connection.release();
        //         if (error) throw error;
        //     })
        // })

        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(`UPDATE messages SET msgCount = msgCount + 1 WHERE user_id = 0`, (error) => {
                connection.release();
                if (error) throw error;
            })
        })
        // pool.query(`UPDATE messages SET msgCount = msgCount + 1 WHERE user_id = ${messageCreate.author.id}`)
    }
}