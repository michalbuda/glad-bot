

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(messageCreate) {
        const botChannel = messageCreate.client.channels.cache.get('678977614215512105')
        const mainChannel = messageCreate.client.channels.cache.get('678963631320465418')
        const someUser = await messageCreate.client.users.fetch('837290296340381726')

        if (messageCreate.author.bot) return

        if (messageCreate.author.id === someUser.id && messageCreate.channelId !== mainChannel.id){
            botChannel.send(`${someUser} Zły kanał ❗ Wysłałeś wiadomość na kanele ${messageCreate.channel}`)
        }

    }
}