module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(messageCreate) {
        const botChannel = messageCreate.client.channels.cache.get('678977614215512105')
        const mainChannel = messageCreate.client.channels.cache.get('678963631320465418')
        const anotherChannel = messageCreate.client.channels.cache.get('1014246128323153990')
        const someUser = await messageCreate.client.users.fetch('837290296340381726')

        if (messageCreate.author.bot) return

        if (messageCreate.author.id === someUser.id && messageCreate.channelId !== mainChannel.id && messageCreate.channelId !== anotherChannel.id){
            botChannel.send(`${someUser} Zły kanał ❗ Wysłałeś wiadomość na kanele ${messageCreate.channel}`)
        }

    }
}