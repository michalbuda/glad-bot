module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        const rarePope = () => {

            const hoursLeft = () => {
                let day = new Date();
                return (-day + day.setHours(21, 37, 1, 0));
            }

            const sendM = () => {

                const channelBot = client.channels.cache.get('678977614215512105');
                channelBot.send('https://cdn.discordapp.com/emojis/695011124135067648.gif?v=1');
            }

            setTimeout( () => {
                // sendM();
                let dayToMs = 24*60*60*1000;
                setInterval( () => {
                    sendM();
                }, dayToMs )
            },  hoursLeft());
           
        }

        rarePope();
    }
}