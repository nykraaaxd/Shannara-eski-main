const Discord = require('discord.js');
const db = require("quick.db")
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(!message.member.roles.get("785282424040194088") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));
    if (!message.member.voiceChannel) { return message.channel.send("Ses kanalında olman lazım."); }

  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Bir Kullanıcı Etiketlemelisin.')

  let member = message.guild.member(kullanıcı)
  if(!member.voiceChannel) return message.channel.send("Etiketlenen kullanıcı bir ses kanalında değil").then(m =>m.delete(5000))
  const voiceChannel = message.member.voiceChannel.id;
  var kullanıcıkanalı = member.voiceChannel.name
if(!voiceChannel) return
  member.setVoiceChannel(voiceChannel);
   const voiceChannel1 = message.member.voiceChannel.name;

  let embed= new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(message.author+" **Tarafından** "+kullanıcı+" **Kullanıcısı**\n\n`"+kullanıcıkanalı+"`** Sesli Kanalından **`"+voiceChannel1+"`** Sesli Kanalına Çekildi**")
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
    message.channel.send(embed)
 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}
exports.help = {
  name: 'taşı',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
}

