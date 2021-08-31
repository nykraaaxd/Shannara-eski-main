const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => {

let kayityetkili = '' //KAYIT YETKİLİSİ ID
let verbuse = '' //VERİLECEK ROL ID
let verbusem = ''//VERİLECEK ROL ID
let albuse = '' //ALINACAK ROL ID

//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.<a:tik:784435738967539712>`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" | ")
  if (!member) return message.channel.send('Yalnış Kullanım v!e @etiket isim yaş <a:tik:784435738967539712>')
  if (!isim) return message.channel.send('Yalnış Kullanım v!e @etiket isim yaş <a:tik:784435738967539712>')

  //setTimeout(function(){
  //member.setNickname(`${isim}`)
// },2000)
  setTimeout(function(){
  member.addRole(verbuse)
  member.addRole(verbusem)
  },3000)
  setTimeout(function(){
  member.removeRole(albuse)
  },4000)

 const emoji = client.emojis.find(emoji => emoji.name === "tik");
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(message.mentions.users.first().avatarURL)
  .setDescription(`<a:tik:782257989271814175> **Kayıt işlemi Başarılı**
<a:tik:782257989271814175> **Kayıt edilen kullanıcı :** **${isim}**
<a:tik:782257989271814175> **Kayıt işleminde verilen rol :** **<@&${verbuse}>, <@&${verbusem}>`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
message.channel.send(embed)
};
;


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oyuncu','e'],
  permLevel: 0
}
exports.help = {
  name: 'e',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!erkek <yeni nick>'
}

