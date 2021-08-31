const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ms = require('parse-ms')
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run =async (client, message, args) => {

  message.channel.send("Botun Pingi: **"+ client.ping+"** ms").then(m => m.delete(5000));
  /*let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))

   const voiceChannel =  message.mentions.channels.first() || message.guild.channels.get(args[1])
console.log(voiceChannel)
   if(!voiceChannel) return message.channel.send("bir kanal yok").then(m => m.delete(5000));
   
  kullanıcı.setVoiceChannel(voiceChannel);*/

  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Tüm komutları gösterir.',
  usage: 'a!ping'
};
 