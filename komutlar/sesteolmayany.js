const Discord = require("discord.js")
exports.run = async (client, message, args) => {
let bot = client;
let msg = message;
if (!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return;
if(message.channel.id !== "783366964742848533")return message.channel.send(new Discord.RichEmbed() .setDescription(`<#783366964742848533> Burada yapabilirsin :x:`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("PURPLE")).then(m => m.delete(5000));
client.guilds.get("311184407115333643").roles.get("782129688100864000").members.forEach(async (x) => {
if (!x.voiceChannel){
client.channels.get("783366964742848533").send(`Herhangi Bir Sesli Kanallarında Olmayan Yetkililer: ${x}`).catch(console.error);
} else {
return;
}
}).catch(console.error);
}
exports.conf = {
permLevel: 0,
guildOnly: false,
enabled: true,
aliases: []
}
exports.help = {
name: "ss"
}