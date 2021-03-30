module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        // `Logged as ${client.user.tag}`
        console.log(`Ready, logged as ${client.user.tag}`);
    }
}