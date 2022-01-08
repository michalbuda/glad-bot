module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        const rarePope = () => {

            const hoursLeft = () => {
                let day = new Date();
                return (-day + day.setHours(1, 20, 1, 0));
            }

            const sendM = () => {

                // const channelBot = client.channels.cache.get('678977614215512105');
                const channelTest = client.channels.cache.get('878388789108695150');
                // channelBot.send('https://cdn.discordapp.com/emojis/695011124135067648.gif?v=1');
                channelTest.send('https://cdn.discordapp.com/emojis/695011124135067648.gif?v=1');
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