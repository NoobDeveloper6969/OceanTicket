const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");
const fs = require("fs");
const cases = require("../cases.json");

module.exports.run = async (bot, message, args) => {

    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have BAN_MEMBERS!");

    let caseID = cases[0].caseID;
    let nought = 4-(caseID.toString().length);
    let nought1 = "0".repeat(nought);

    let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bannedUser) return message.channel.send(`:x: **Usage**: -${cmdname.ban} (@user) (reason)`)
    let bannedReason = args.join(" ").slice(22);
    if (!bannedReason) return message.channel.send(`:x: **Usage**: -${cmdname.ban} (@user) (reason)`)
    let punishmentchannel = message.guild.channels.find(pc => pc.name === config.punishLogName)
    if (!punishmentchannel) return message.channel.send("Channel could not be found!")
    
    let avatar2 = message.author.avatarURL;
    let banned = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`User has been banned!`)
    .addField("Banned user", bannedUser, true)
    .addField("Case ID", `${nought1}${caseID}`, true)
    .addField("Reason", bannedReason)
    .setFooter(`Performed by: ${message.author.tag}`, avatar2)
    message.guild.member(bannedUser).ban(bannedReason);
    punishmentchannel.send(banned);

    cases[0].caseID++;
    fs.writeFile("./cases.json", JSON.stringify(cases), (err) => {
        if(err) console.log(err)
    })

}
module.exports.help = {
    name: cmdname.ban
}