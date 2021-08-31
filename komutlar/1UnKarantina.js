const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  
 
  if(!message.member.roles.get("782125370202783794") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

  var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  var Karantina = message.guild.roles.get("781977373465116742")
  var kayıtsız = message.guild.roles.get("781958129130799124")
var kayıtsız2 = message.guild.roles.get("781958129130799124")
if(!user) return message.reply ("Lütfen bir kullanıcı etiketleyiniz").then(m => m.delete(50000));
    //let reason = args.slice(1).join(" ")
      //if(!reason) return message.channel.send("Lütfen Bir İsim Yazınız.").then(m => m.delete(9000));
        if(!Karantina) return message.channel.send ("Cezalı Rolü Yok").then(m => m.delete(500000));
    let sChannel = message.guild.channels.get("785303320351997952")



  if(!user.roles.has(Karantina.id)){
    
        message.channel.send ("<a:tik:782257989271814175> Kullanıcı Zaten Karantinada değil!").then(m => m.delete(50000000));

  }
  else {

    await (user.removeRole(Karantina.id))
   await (user.addRole(kayıtsız.id))    
    await (user.addRole(kayıtsız2.id))
   message.react('✅')
    if(!sChannel) return message.channel.send ("Karantina Kanalı yok!").then(m => m.delete(5000));
    let embed = new Discord.RichEmbed()
    .setColor(Karantina.color)
    .setDescription(`
<a:tik:782257989271814175> ${user} Cezası Alındı . 
<a:tik:782257989271814175> Komutu Kullanan Yetkili : **${message.author.tag}**
`)
    .setFooter(`**Adalet Mülkün Temelidir.**`)
 
    sChannel.send(embed)

  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unkarantina',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
