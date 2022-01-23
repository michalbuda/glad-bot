const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and logs current time'),
    async execute(interaction) {
        fetch('http://worldtimeapi.org/api/timezone/Europe/Berlin').then(r => r.json()).catch(err=>console.error(err))
        const { datetime } = await fetch('http://worldtimeapi.org/api/timezone/Europe/Berlin').then(r => r.json())
        const sysTime = new Date()
        await interaction.reply(`Pong. Btw current time is: ${datetime.slice(11, -13)}.\nSystem time is: ${sysTime}`)
        // const fetchMembers = async () => {
        //     await interaction.guild.members.fetch()
        //     const fetchedMembers = () => {
        //         const users = fetchedMembers.filter(member => member.presence.status === 'online')
        //         console.log(`Online users: ${users}`)
        //     }
        //     // let memberListResolved = await response
        //     // console.log(await memberListResolved)
        // }
        // await fetchMembers()

    },
};