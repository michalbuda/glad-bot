const { PEXELS } = require('../../config.json');
const { createClient } = require('pexels') 
const fetch = require('node-fetch');

module.exports = {
    name: 'images',
    args: true,
    async execute(message, args){
        const query = args[0];
        const pexels = createClient(PEXELS);
        const random = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        
        // const img = await pexels.photos.search({ query, per_page: 12 }).then(result => result.photos[random(0, 8)].src.large);
        const img = await pexels.photos.search({ query, per_page: 80 }).then(result => result.photos[random(0, 80)]);
        if (img === undefined) {
            message.channel.send('Nie znaleziono obrazka');
        } else {
            message.channel.send(img.src.large);
        }
    }
}