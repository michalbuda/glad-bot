const {createPool, createConnection} = require('mysql')

const con = createConnection({
    host: 'localhost',
    user: 'harambowski',
    password: 'jebacdisa',
    database: 'node_test'
})

module.exports = {
    name: 'message',
    once: false,
    execute(message) {
        // console.log(`${message.author.tag} sent: ${message.content}`);
        con.query(`UPDATE messages SET msgCount = msgCount + 1 WHERE user_id = ${message.author.id}`)

    }
}