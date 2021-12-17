const {createPool, createConnection} = require('mysql')

const con = createConnection({
    host: 'localhost',
    user: 'harambowski',
    password: 'jebacdisa',
    database: 'node_test'
})

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(messageCreate) {
        console.log(`${messageCreate.author.tag} sent: ${messageCreate.content}`);
        con.query(`UPDATE messages SET msgCount = msgCount + 1 WHERE user_id = ${messageCreate.author.id}`)
    }
}