const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(!message.member.roles.get("yetkikli rol id") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

  
  var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  var Beatboxer  = message.guild.roles.get("verilcek rol permi id ARKADAŞLAR DİĞERLERİ AYNI ŞEKİL OLDUĞU İÇİN TEKTEK YAZMICAM AYNISINI TEKRARLARSINIZ - YOUİSS")
  
if(!user) return message.reply ("Lütfen bir kullanıcı etiketleyiniz").then(m => m.delete(5000));

  
        if(!Beatboxer) return message.channel.send ("Beatboxer Rolü Yok").then(m => m.delete(5000));

   if (!yazı[message.author.id]) yazı[message.author.id] = {
        kisi:message.author.id,
     banlar:{
       sayı:0,
       bantarihi:0
     },
     kayıtlar:{
        erkek: 0,
        kız: 0,
        sahte:0,
     },
      cezalar:{
        sesmutesi:0,
        chatmute:0,
        karantina:0,
      },
      yetenekler:{
        beatboxer:0,
        vip:0,
        vokal:0,
        yazar:0,
        yazılım:0,
        youteber:0,
        ins:0,
        ressam:0,
        voceactor:0,
        dj:0,
        sevgilimvar:0,
        meltal:0,
      },
        isim:0,
      };
  
  
  
  if(!user.roles.has(Beatboxer.id)){
  
    await (user.addRole(Beatboxer.id))
    await yazı[message.author.id].yetenekler.beatboxer++;
  
   message.react('✅')
    let embed = new Discord.RichEmbed()
    .setColor(Beatboxer.color)
    .setDescription(`${user.user} Kullanıcısına <@&${Beatboxer.id}> Rolü Verildi.`)
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed).then(message =>message.delete(10000))



  }
  else {
    
    await (user.removeRole(Beatboxer.id));
       await yazı[message.author.id].yetenekler.beatboxer--;
 

    
    message.react('✅')
     let embed0= new Discord.RichEmbed()
    .setColor(Beatboxer.color)
    .setDescription(`${user.user} Kullanıcısına <@&${Beatboxer.id}> Rolü Alındı.`)
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed0).then(message =>message.delete(10000))

    
  }
     fs.writeFile("./database.json", JSON.stringify(yazı), (x) => {
        if (x) console.error(x)
      });
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bb',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
