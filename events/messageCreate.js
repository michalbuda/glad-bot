// const mysql = require('mysql')
// // const {HOST, USER, PASSWORD, DATABASE} = require('../config.json');
//
// const pool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// })
//
//
// module.exports = {
//     name: 'messageCreate',
//     once: false,
//     execute(messageCreate) {
//         console.log(`${messageCreate.author.tag} sent: ${messageCreate.content}`);
//         pool.getConnection((err, connection) => {
//             if (err) throw err;
//             connection.query(`UPDATE messages SET msgCount = msgCount + 1 WHERE user_id = ${messageCreate.author.id}`, (error) => {
//             connection.release();
//             if (error) throw error;
//             })
//         })
//         pool.query(`UPDATE messages SET msgCount = msgCount + 1 WHERE user_id = ${messageCreate.author.id}`)
//     }
// }