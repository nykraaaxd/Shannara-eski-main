const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
      message.react('682837190514049035')

   var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]) || message.author);
  
  let KayıtEden = await db.fetch(`KayıtEden_${user.id}`)
 
    let KayıtSayısı = await db.fetch(`KayıtSayısı_${user.id}`)
   
      let KayıtEdilen = await db.fetch(`KayıtEdilen_${user.id}`)

        let SahteKayıt = await db.fetch(`SahteKayıt_${user.id}`)
   
          let LeaveKayıt = await db.fetch(`Leave_${user.id}`)
          
  if(!KayıtSayısı) KayıtSayısı = 0
  
    if(!SahteKayıt) SahteKayıt = 0
        
     if(!LeaveKayıt) LeaveKayıt = 0
  
            let Toplam = KayıtSayısı + (SahteKayıt)
                 
    let embed = new Discord.RichEmbed()
    .setColor('BLACK')
    .setAuthor('Davet Bilgi', `${client.user.displayAvatarURL}`)
    .setDescription(`${user} Net Toplam **${Toplam}** Davet (**${KayıtSayısı}** Toplam, **${SahteKayıt}** Sahte Leave ${LeaveKayıt})`)
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
  name: 'rank',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
