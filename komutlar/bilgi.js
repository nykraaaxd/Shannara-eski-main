const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(!message.member.roles.get("781964435878182924") &&!message.member.roles.get("781957940307165244") &&!message.member.roles.get("781977820725248002") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!").then(m => m.delete(5000));

   var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]) || message.author);
 if(user._roles.indexOf("782175658486267916")===-1 && user._roles.indexOf("782175658486267916")===-1 && user._roles.indexOf("781977373465116742")===-1) return message.channel.send("**Etiketlenen Kullanıcının Bilgileri Bulunamadı!**").then(m => m.delete(10000));

  let SesMutesi = await db.fetch(`MuteSesSayısı_${user.id}`)
 
    let Mute = await db.fetch(`MuteSayısı_${user.id}`)
   
      let Karantina = await db.fetch(`KarantinaSayısı_${user.id}`)

          
  if(!SesMutesi) SesMutesi = 0
  
    if(!Mute) Mute = 0
  
      if(!Karantina) Karantina = 0
    //  if(!LeaveKayıt) LeaveKayıt = 0

                 
    let embed = new Discord.RichEmbed()
    .setColor('#00e6d3')
    .setAuthor('Vortex Yetkili Bilgi', `${user.user.displayAvatarURL}`)
    .setDescription(`**Ses Mutesi : \`${SesMutesi}\`
Chat Mutesi : \`${Mute}\`
Karantina : \`${Karantina}\`**
`)
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
    .setTimestamp()
  message.channel.send(embed)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
