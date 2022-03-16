const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    if(!message.channel.name.startsWith("ticket")) return message.channel.send(":x: You cannot use the close command outside of a ticket channel!");
    
    let confirm = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`Are you sure?`)
    .setDescription("This action cannot be reversed! If you wish to proceed with the closure of this ticket please react with the green checkmark. If you do not wish to proceed please react with the red cross. This will timeout in 20 seconds, so be fast!")
    .setTimestamp();

    message.channel.send(confirm)
    .then ((m => {
        m.react('✅').then(() => m.react('❌'));

        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        m.awaitReactions(filter, { max: 1, time: 20000, errors: ['time']})
        .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === '✅') {
                m.channel.send("Ticket closure confirmed! The ticket will close in 10 seconds!")
                var interval = setInterval(function() {
                    message.channel.delete()
                    clearInterval(interval);
                }, 10 * 1000);
            } else {
                m.delete();
                m.channel.send(`Ticket closure cancelled! If this was a mistake please run \`-${cmdname.closeticket}\` again!`);
            }
        })
    }))

}
module.exports.help = {
    name: cmdname.closeticket
}