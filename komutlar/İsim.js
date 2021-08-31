const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
var prefix = ayarlar.prefix;
//∞ POINE Is Back sunucusundan **Küfür** nedeniyle ban yedin.
exports.run = async (client, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;

  if(!message.member.roles.get("785282424040194088")&&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

    let rAd = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rAd) return message.channel.send("Lütfen Bir Kişiyi Etiketliyerek Kullanın").then(m => m.delete(5000));
    let reason = args.slice(1).join(" | ")
    if(!reason) return message.channel.send("Lütfen Bir İsim Yazınız.").then(m => m.delete(5000));

    if(rAd.user.username.includes("")){
      await rAd.setNickname(" " + reason);(e => console.log(e.message))
    }
    else if(!rAd.user.username.includes("")){
      await rAd.setNickname(" " + reason);(e => console.log(e.message))
    }
 setTimeout(() => {
   let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
   .setTitle('• işlem Başarılı Kullanıcının İsmi Güncellendi')
   .setThumbnail(rAd.user.avatarURL)
    .setDescription(`**
Değiştirilen Kullanıcı : ${rAd}
Düzenlenmiş Kullanıcı Adı : \`${rAd.displayName}\`
**`)
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed)
   },1000)

    
  
  //.then(m => m.react('✅')).catch(console.error);
  //.then(m => m.react('❌')).catch(console.error);
 

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isim"],
  permLevel: 0
};

exports.help = {
  name: 'nick',
  description: 'isim değitirir.',
  usage: 'a!isim'
};
 