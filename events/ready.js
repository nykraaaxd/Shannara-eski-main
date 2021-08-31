const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();
var prefix = ayarlar.prefix;
const request = require("request");
const db = require("quick.db")
const ms = require('parse-ms');
process.setMaxListeners(0);

var prefix = ayarlar.prefix;

module.exports =async client => {
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Oyun ismi ayarlandı!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Şu an ` +
      client.channels.size +
      ` adet kanala, ` +
      client.guilds.size +
      ` adet sunucuya ve ` +
      client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() +
      ` kullanıcıya hizmet veriliyor!`
  );
   //  let kanal =await client.guilds.get("634437923500195853").channels.get("634438761295511575")
   // .fetchMessage('661657608914075669')
//  console.log(kanal)
   /* setInterval(function() {
       
       let a =ms(1577826003170-Date.now())
     //let kanal =await client.guilds.get("634437923500195853").channels.get("634438761295511575")
        //.fetchMessage('661657608914075669')
       if(a.days!==0){
         let kanal =await client.guilds.get("634437923500195853").channels.get("634438761295511575")
        .fetchMessage('661657608914075669').edit(`Yeni Yılımız Kutlu Olsun <a:57:660881895374061570>`)
         
       }
      else if(a.hours!==0){
        let kanal =await client.guilds.get("634437923500195853").channels.get("634438761295511575")
        .fetchMessage('661657608914075669').edit(`${a.hours} Saat ${a.minutes} Dakika ${a.seconds} Saniye`)
       }
         else if(a.minutes!==0){
        let kanal =await client.guilds.get("634437923500195853").channels.get("634438761295511575")
       .fetchMessage('661657608914075669').edit(`${a.minutes} Dakika ${a.seconds} Saniye`)
       }
         else if(a.seconds!==0){
        let kanal =await client.guilds.get("634437923500195853").channels.get("634438761295511575")
         .fetchMessage('661657608914075669').edit(`${a.seconds} Saniye`)
       }
       console.log(a)
       },999)*/
  let statuses = [`YOUİSS`];

  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: "Watching" });
  }, 5000);
  client.user.setStatus("online");
let sunucu = client.guilds.get("SUNUCUİD")
  setInterval(async function() {
      let mutesesyazı = client.guilds
  .get("SUNUCUİD")
  .members.filter(
    m =>
      m._roles.indexOf("İNDEXOF ROLİD") !== -1 ||
      m._roles.indexOf("İNDEXOF ROLİD") !== -1
  );
let muterole = client.guilds.get("SUNUCUİD").roles.get("MUTEROLU-SES");

let muteroleyazı =client.guilds.get("SUNUCUİD").roles.get("MUTE-ROLU-CHAT");

mutesesyazı.forEach(async function(muteli) {
  let muteses = await db.fetch(`muteses_${muteli.id}`);

  let muteyazı = await db.fetch(`muteyazı_${muteli.id}`);

  let muteyazısüre = await db.fetch(`muteyazısüre_${muteli.id}`);

  let mutesessüre = await db.fetch(`mutesessüre_${muteli.id}`);

  if (muteses) {
    var süre = Date.now() - muteses;

    if (süre >= mutesessüre) {
      db.delete(`muteses_${muteli.id}`);
      db.delete(`mutesessüre_${muteli.id}`);

      if (muteli.roles.get(muterole.id)) {
         
        await muteli.removeRoles([muterole.id]).catch(m=>console.log("ses alınamadı"))
        setTimeout(async() => { 
        let sChannel = client.channels.get("MUTELOGİD");
        if (!sChannel) return;
        let embed = new Discord.RichEmbed()
          .setColor(muterole.color)
          .setDescription(
            `${muteli.user} adlı Kullanıcının **Ses Mute** süresi doldu <a:loading:634471445358968842>`
          )
          .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
          .setTimestamp();

        sChannel.send(embed);
          },1000)
      }
    }
  }

  if (muteyazı) {
    var süre = Date.now() - muteyazı;

    if (süre >= muteyazısüre) {
      db.delete(`muteyazı_${muteli.id}`);
      db.delete(`muteyazısüre_${muteli.id}`);

      if (muteli.roles.get(muteroleyazı.id)) {
            
        await muteli.removeRoles([muteroleyazı.id]).catch(m=>console.log("yazı alınamadı"))
               setTimeout(async() => {   
let sChannel = client.channels.get("KANALİD");
        if (!sChannel) return;

        let embed = new Discord.RichEmbed()
          .setColor(muteroleyazı.color)
          .setDescription(
            `${muteli.user} adlı Kullanıcının **Mute** süresi doldu <a:loading:634471445358968842>`
          )
          .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
          .setTimestamp();

        sChannel.send(embed);
                 },1000)
      }
    }
  }
});
  }, 60000);
};
