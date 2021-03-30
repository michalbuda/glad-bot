module.exports = {
    name: 'message',
    once: false,
    execute(message) {
        console.log(`${message.author.tag} sent: ${message.content}`);
    }
}