const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have BAN_MEMBERS!");

    let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mutedUser) return message.channel.send(`:x: **Usage**: -${cmdname.mute} (@user) (reason)`)
    let mutedRole = message.guild.roles.find(mr => mr.name === config.mutedRoleName)
    if (!mutedRole) return message.channel.send("Muted role could not be found!")

    if (!mutedUser.roles.has(mutedRole.id)) return message.channel.send(":x: This user is not muted!");

    mutedUser.removeRole(mutedRole.id);
    message.channel.send(mutedUser + " has been unmuted!");


}
module.exports.help = {
    name: cmdname.unmute
}