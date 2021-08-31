const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

const fs = require('fs');
const db = require("quick.db")
const prefix = ayarlar.prefix;
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (bot , message, args) => {
  //kapnıp açtığında hafızası siliniyorsa db den yapılcak
  
  let reason = args.slice(0).join(' ') 
     let rol = message.mentions.roles.first()

  if(reason.toLowerCase().includes(".com") || reason.toLowerCase().includes("youtube.com") || reason.toLowerCase().includes("discord.gg")|| reason.includes("http") || reason.includes(rol) || reason.includes("@here") || reason.includes("@everyone")) return  [message.delete(10),message.reply("Afk nedenine **link** veya **rol** giremezsin").then(msg => msg.delete(9000))]
  if(!reason) reason= "Şu an afkyım, en kısa sürede geri döneceğim.";
      setTimeout(function(){

  db.set(`afk_${message.author.id}, ${message.guild.id}`, reason)
  
  db.set(`afk-zaman_${message.author.id}, ${message.guild.id}`, Date.now())
      },500)
  message.reply(`**${reason}** nedeniyle afk oldunuz.`).then(msg => msg.delete(9000))
  if(!message.member.nickname) return message.member.setNickname("[AFK] " + message.member.user.username)
  message.member.setNickname("[AFK] " + message.member.nickname).catch(err => console.log(err));
    
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'afk',
  description: 'Kullanıcıyı sunucudan yasaklar.',
  usage: '&afk'
};
