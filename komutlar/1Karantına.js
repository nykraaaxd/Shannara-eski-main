const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
const ms = require("ms");
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
   let kisirolleri =[]
 
  if(!message.member.roles.get("yetkilirolid" , "ekstra") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

  var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  var Karantina = message.guild.roles.get("cezalı rol id- JAİL")
if(!user) return message.reply ("Lütfen bir kullanıcı etiketleyiniz").then(m => m.delete(5000));
    //let reason = args.slice(1).join(" ")
      //if(!reason) return message.channel.send("Lütfen Bir İsim Yazınız.").then(m => m.delete(9000));
var muteTime = args[1];
    
    if(!muteTime) return message.channel.send("Süreyi Girmelisin!").then(m => m.delete(5000));
    let reason = args.slice(2).join(" ")
    
    if(!reason) return message.channel.send("Lütfen Bir Sebep Belirtin.").then(m => m.delete(5000));
  
  
     if(user.hasPermission("ADMINISTRATOR")) return message.reply("Yöneticileri Karantinaya Atamazsın!!").then(m => m.delete(5000));

        if(!Karantina) return message.channel.send ("Kanal İD").then(m => m.delete(5000));
    let sChannel = message.guild.channels.get("KANALİD")


       if(user.voiceChannel){
  user.setVoiceChannel(null).catch(e => console.log("bağlantı kesme yetkim yok"))
  }
  
  if(!user.roles.has(Karantina.id)){
    kisirolleri= user._roles
  /*  message.guild.members.get(user.id).roles.forEach(r => {
message.guild.members.get(user.id).removeRole(r)
      
      
})*/
    
    let roles = message.guild.members.get(user.id).roles.array()
   await message.guild.members.get(user.id).removeRoles(roles)
     
    db.set(`Karantinaroller_${user.id}`,"Karantina")  
  
    await (user.addRole(Karantina.id))
    
     db.add(`KarantinaSayısı_${message.author.id}`,1)  
   message.react('✅')
    setTimeout(async function(){

      
      if(!user.roles.get(Karantina.id)) return
      
      await message.guild.members.get(user.id).addRoles(kisirolleri)
      
      
      
       user.removeRole(Karantina.id);
    
      //let kisirolleri =  await db.fetch(`Karantinaroller_${user.id}`)
      
       
      
       db.delete(`Karantinaroller_${user.id}`)  
      
    let embed = new Discord.RichEmbed()
    .setColor(Karantina.color)
    .setDescription(`${user} adlı Kullanıcının **Karantine** süresi doldu <a:loading:634471445358968842>`)
   .setFooter(`${client.user.tag}` , `${client.user.displayAvatarURL}`)
  .setTimestamp()  


    if(!sChannel) return
    sChannel.send(embed)
       
    },  ms(muteTime));
    let süre =muteTime
.replace(/y/g, " Yıl")
.replace(/d/g, " Gün")
.replace(/h/g, " Saat")
.replace(/m/g, " Dakika")
.replace(/s/g, " Saniye")
    
    if(!sChannel) return message.channel.send ("Karantina Kanalı yok!").then(m => m.delete(5000));
    let embed = new Discord.RichEmbed()
    .setColor(Karantina.color)
    .setDescription(`
<a:bravy:639857369672712192> ${user} Adlı Hapishaneye Atıldı. 
<a:bravy:639857369672712192> Karantinaya Atan Yetkili : **${message.author.tag}**
<a:bravy:639857369672712192> Karantina Süresi : **${süre}**
<a:bravy:639857369672712192> Sebebi : **${reason}**
`)
    .setFooter(`**Adalet Mülkün Temelidir.**`)

    sChannel.send(embed)
    let embed3 = new Discord.RichEmbed()
  .setDescription(`**ADALET**`)
  .setImage('https://cdn.discordapp.com/attachments/784473367621271583/785480336687235112/lanmanyam.gif')
         .setFooter(`**Adalet Mülkün Temelidir.**`)
    message.channel.send(embed3).then(m => m.delete(10000));

  }
  else {
 
    message.channel.send ("Kullanıcı Zatan Karantinada").then(m => m.delete(5000));


  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'karantina',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
