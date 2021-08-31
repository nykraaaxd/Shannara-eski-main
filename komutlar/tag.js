const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;

  if(!message.member.roles.get("785282424040194088") &&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));
    


  var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  var Crew = message.guild.roles.get("781958037845704704")
if(!user) return message.reply ("Lütfen bir kullanıcı etiketleyiniz").then(m => m.delete(5000));
   let takmaad =  client.guilds.get("311184407115333643").members.get(user.user.id).displayName
    //let reason = args.slice(1).join(" ")
      //if(!reason) return message.channel.send("Lütfen Bir İsim Yazınız.").then(m => m.delete(9000));
        if(!Crew) return message.channel.send ("Tag Rolü Yok").then(m => m.delete(5000));
  


  if(!user.roles.has(Crew.id)){
  
    
      if(user.user.username.includes("𝓥")){
        let değişeceksembol2 = takmaad.replace(/𝓥/g, "𝓥");
        await user.setNickname(değişeceksembol2);(e => console.log(e.message))
      await (user.addRole(Crew.id))
     setTimeout(() => {
   let embed = new Discord.RichEmbed()
    .setColor(Crew.color)
   .setThumbnail(user.avatarURL)
    .setDescription(`**
Tag rolü verilen kullanıcı : ${user}
Tag işleminde verilen rol : <@${Crew.id}>
Yeni Kullanıcı Adı : \`${user.displayName}\`
**`)
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed).then(m => m.delete(10000));
   },1000)

}else{
  message.channel.send("Etiketlenen Kullanıcının İsminde 𝓥 Yok!").then(m => m.delete(10000));
}

  }
  else {
 
      if(!user.user.username.includes("𝓥")){
         let değişeceksembol1 = takmaad.replace(/𝓥/g, "𝓥");
        await user.setNickname(değişeceksembol1);(e => console.log(e.message))
         await (user.removeRole(Crew.id));
     setTimeout(() => {
   let embed = new Discord.RichEmbed()
    .setColor(Crew.color)
   .setThumbnail(user.avatarURL)
    .setDescription(`**
Tag rolü alınan kullanıcı : ${user}
Tag işleminde alınan rol : <@${Crew.id}>
Yeni Kullanıcı Adı : \`${user.displayName}\`
**`)
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed).then(m => m.delete(10000));
   },1000)
      }
    else{
  message.channel.send("Etiketlenen Kullanıcının İsminde Zaten 𝓥 Var!").then(m => m.delete(10000));
}

  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
