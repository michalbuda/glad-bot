
module.exports = {
    name: "set",
    args: true,
    execute(message, args) {
        let username = args[0];
        message.client.user.setUsername(`${username}`);
    }
}