const fs = require('fs');   
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const client = new Discord.Client();
const db = require("quick.db")
const prefix = ayarlar.prefix;
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (bot , message, args) => {

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok ❌").then(msg => msg.delete(9000))

   const tagged = message.mentions.members.first()
   
    let member = tagged || args[0]
    
    const bans = await message.guild.fetchBans(true)
    
    const banlımember = bans.find(m => `${m.user.username}#${m.user.discriminator}` === member || m.user.id === member)
   
    let sebep = args.slice(1).join(' ');

    let kanal = bot.channels.get("785303244476907520")

    if(!banlımember) return message.reply("Lütfen Banı Açılcak Bir Kullanıcıyı Belirtin.").then(msg => msg.delete(9000))
   
    if(!sebep) sebep = "bir sebep belirtilmedi"

  
   if(banlımember === undefined) {
        return message.channel.send("Bekirtilen kullanıcı mevcut değil veya yasaklı değil.").then(msg => msg.delete(9000))
      }
    
    try{
       message.guild.unban(banlımember.user)
      message.react('✅')
      let embed = new Discord.RichEmbed()
      .setColor('#ffffff')
    .setDescription("<@"+member +"> Kullanıcısının **Yasağı** Kaldırılmıştır.")
     .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    if(!kanal || kanal === null) return
    kanal.send(embed)
  
    }catch(err){   
      console.log(err.message)
    }
}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'kullanıcı yasağını kaldırır.',
  usage: '&unban'
};