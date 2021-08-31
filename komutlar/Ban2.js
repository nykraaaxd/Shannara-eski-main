const Discord = require('discord.js')
const db = require("quick.db")
const ms = require('parse-ms');
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (bot , message, args) => {

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok ❌").then(msg => msg.delete(9000))
    
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
   
  let sebep = args.slice(1).join(' ');
   
  let sChannel = bot.channels.get("782125219866869791")
   
  if(!kullanıcı) return message.reply("Lütfen Banlanacak Bir Kullanıcı Etiketleyiniz.").then(msg => msg.delete(9000))
   
  if(kullanıcı.hasPermission("ADMINISTRATOR")) return message.reply("Yöneticileri Banlayamazsın!").then(msg => msg.delete(9000))
    
  if(message.author.id === kullanıcı.user.id) return message.reply("Kendini Banlayamazsın!").then(msg => msg.delete(9000))
   
  if(!sebep) return message.reply("Lütfen Neden Banladığınızı Belirtiniz.").then(msg => msg.delete(9000))
   
  db.add(`BanSayısı_${message.author.id}`,1)        
   
  let sayı = await db.fetch(`BanSayısı_${message.author.id}`)
   
let banlimiti = 3

let banaralıgı = 600000

  var tarih = Date.now() 

  if(sayı === 1){
    
   db.set(`Banmatarihi_${message.author.id}`,tarih)   
    
  }

   let ilkbantarihi =  await db.fetch(`Banmatarihi_${message.author.id}`)
   
if(sayı>banlimiti && tarih-ilkbantarihi <=banaralıgı) {

var süre = ms((ilkbantarihi+banaralıgı)-tarih)

 if(süre.minutes !== 0){
   
     message.channel.send("Ban Atabilemek İçin **"+süre.minutes+" Dakika** Beklemelisin.").then(m => m.delete(5000));
   return
   }
   if(süre.seconds !== 0){
     message.channel.send("Ban Atabilemek İçin **"+süre.seconds+" Saniye** Beklemelisin.").then(m => m.delete(5000));
     return
   }
  return
}
  
  if(tarih-ilkbantarihi >=banaralıgı){
  
    db.set(`BanSayısı_${message.author.id}`,0)
 
    db.set(`Banmatarihi_${message.author.id}`,0) 
    
      let embed1 = new Discord.RichEmbed()
      .setColor('#f73737')
      .setDescription(kullanıcı.user+" Kullanıcısı "+message.guild.name+" Sunucusundan **"+sebep+"** Sebebiyle Yasaklandınız.")
   
      kullanıcı.send(embed1)

     let embed3 = new Discord.RichEmbed()
  .addField(`**Ban Bilgi**`, `**Banlayan : ** ${message.author}  (${message.author.id}) \n **Banlanan:** ${kullanıcı.user.tag}  (${kullanıcı.id})\n **Sebep :** ${sebep} `)
  .setImage('https://cdn.discordapp.com/attachments/781968799792103434/786297367787733002/lanmanyam.gif')
         .setFooter(`**Adalet Mülkün Temelidir.**`)
        setTimeout(() => {
      message.guild.member(kullanıcı).ban(`${message.author.tag} | ${sebep}`).catch(err => message.reply("Banlama Yetkim Yok.").then(m => m.delete(5000)))  
        },500)
          message.react('✅')
      

    message.channel.send(embed3).then(m => m.delete(150000000));
    
      db.add(`BanSayısı_${message.author.id}`,1)        
db.set(`Banmatarihi_${message.author.id}`,tarih)   
    
    let embed = new Discord.RichEmbed()
    .setColor('#f73737')
    .setDescription(kullanıcı.user+ " Kullanıcısı **"+sebep+"** Sebebiyle Yasaklanmıştır.")
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
    .setTimestamp()  
     if(!sChannel || sChannel === null) return
    sChannel.send(embed)
 
    return
 }
  
   let embed1 = new Discord.RichEmbed()
   .setColor('RANDOM')
  .setDescription(kullanıcı.user+" Kullanıcısı "+message.guild.name+" Sunucusundan **"+sebep+"** Sebebiyle Yasaklandınız.")
   kullanıcı.send(embed1)
  

   setTimeout(() => {
  message.guild.member(kullanıcı).ban(`${message.author.tag} | ${sebep}`).catch(err => message.reply("Banlama Yetkim Yok.").then(m => m.delete(5000)))  
   },500)
     message.react('✅')
     let embed3 = new Discord.RichEmbed()
  .addField(`**Ban Bilgi**`, `**Banlayan : ** ${message.author}  (${message.author.id}) \n **Banlanan:** ${kullanıcı.user.tag} (${kullanıcı.id})\n **Sebep :** ${sebep} `)
  .setImage('https://cdn.discordapp.com/attachments/781968799792103434/786297367787733002/lanmanyam.gif')

    message.channel.send(embed3).then(m => m.delete(15000000));        
  
   let embed = new Discord.RichEmbed()
   .setColor('#f73737')
   .setDescription(kullanıcı.user+ " Kullanıcısı **"+sebep+"** Sebebiyle Yasaklanmıştır.")
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
   if(!sChannel || sChannel === null) return
  sChannel.send(embed)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yargı',
  description: 'Kullanıcıyı sunucudan yasaklar.',
  usage: '&ban'
};