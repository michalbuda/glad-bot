const { PEXELS } = require('../../config.json');
const { createClient } = require('pexels') 
const fetch = require('node-fetch');

module.exports = {
    name: 'images',
    args: true,
    async execute(message, args){
        const query = args[0];
        const pexels = createClient(PEXELS);
        
        const img = await pexels.photos.search({ query, per_page: 3 }).then(result => result.photos[2].src.large);
        message.channel.send(img);
    }
}