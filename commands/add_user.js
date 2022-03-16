const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let username = message.author.username;
    if(!user) return message.channel.send(`:x: **Usage:** -${cmdname.addToTicket} @name#0000`)

    let added = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle("User added!")
    .setDescription(`${user} has been added to the ticket by ${username}!`);

    if (!message.channel.name.startsWith("ticket")) return message.channel.send(":x: This command can only be used in a ticket channel!");

    message.channel.overwritePermissions(user, {
        READ_MESSAGES: true,
        SEND_MESSAGES: true
    })

    message.channel.send(added);

}
module.exports.help = {
    name: cmdname.addToTicket
}