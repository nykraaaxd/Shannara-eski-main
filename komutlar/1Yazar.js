const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(!message.member.roles.get("785282424040194088") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

  
  var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  var Yazar  = message.guild.roles.get("781958058473422879")
  
if(!user) return message.reply ("Lütfen bir kullanıcı etiketleyiniz").then(m => m.delete(5000));

  
        if(!Yazar) return message.channel.send ("Yazar Rolü Yok").then(m => m.delete(5000));


  if(!user.roles.has(Yazar.id)){
  
    await (user.addRole(Yazar.id))
    
  
   message.react('✅')
    let embed = new Discord.RichEmbed()
    .setColor(Yazar.color)
    .setDescription(`${user.user} Kullanıcısına <@&${Yazar.id}> Rolü Verildi.`)
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed).then(message =>message.delete(10000))



  }
  else {
    
    await (user.removeRole(Yazar.id));
    
 

    
    message.react('✅')
     let embed0= new Discord.RichEmbed()
    .setColor(Yazar.color)
    .setDescription(`${user.user} Kullanıcısına <@&${Yazar.id}> Rolü Alındı.`)
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed0).then(message =>message.delete(10000))

    
  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["şair"],
  permLevel: 0
};

exports.help = {
  name: 'yazar',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
