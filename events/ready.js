module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setPresence({ activities: [{ name: '😳' }], status: 'online' })
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}