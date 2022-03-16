const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    if(!args[0]) return message.channel.send(`:x: **Usage:** -${cmdname.suggest} (suggestion)`)

    let avatar = message.author.avatarURL;
    let suggestion = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`New suggestion!`)
    .setDescription(args.join(" "))
    .setTimestamp()
    .setFooter(`Sugestion by ${message.author.tag}`, avatar);
  
    let sChannel = message.guild.channels.find(sc => sc.name === config.suggestionChannel)
    if(!sChannel) return message.channel.send("Can't find suggestions channel!");
  
    sChannel.send(suggestion).then(async (messages) => {
      await messages.react("✅")
      await messages.react("❌")
    })

}
module.exports.help = {
    name: cmdname.suggest
}