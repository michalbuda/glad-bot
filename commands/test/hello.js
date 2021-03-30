module.exports = {
    name: 'hello',
    descripton: 'Says hi!',
    execute(message) {
        message.channel.send('Hi!');
    },
};