const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();
    
    let SupportRole = message.guild.roles.find(sr => sr.name === config.ticketRoleName)
    if(!SupportRole) return message.channel.send(config.ticketRoleName + " could not be found! Please ensure it exists!");

    if (!message.channel.name.startsWith("ticket")) return message.channel.send(":x: This command can only be used in a ticket channel!");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You must have \"MANAGE_MESSAGES\" to use this command!");

    if(!args[0]) return message.channel.send(`:x: **Usage:** -${cmdname.setTopic} (topic)`)

    let topic = args.join("");

    message.channel.setTopic(topic);

    let complete = new Discord.RichEmbed()
    .setColor(config.color)
    .setTitle("Completed!")
    .setDescription(`Channel topic has been set to: ${topic}`)
    message.channel.send(complete);

}
module.exports.help = {
    name: cmdname.setTopic
}