const Discord = require('discord.js');
const db = require("quick.db")
module.exports =async (member) => {
   
var süp = member.guild.roles.get("SUPHELI ROLU")
var kayıtsız = member.guild.roles.get("KAYITSIZ ROLU")
//var kayıtsız2 = member.guild.roles.get("KAYITSIZROLU2 VARSA?")
     let sChannel = member.guild.channels.get("KANALID")
        let kanal = member.guild.channels.get("KANALID")
function  sunucuyakayıt(){
       
     
            member.setNickname("SUNUCUYA GİRİNCE DEĞİŞTİRİLİCEK İSİM")
        if(!kayıtsız) return member.guild.owner.send("kayıtsız rolü olmadığı için rol verilemedi - youisss")
        setTimeout(async() => {
          let kisirolleri =  await db.fetch(`Karantinaroller_${member.id}`)
       
          if(kisirolleri ==="cezalı rol ismi!!!"){
             member.addRole(süp.id)
            member.removeRole(kayıtsız.id)
     //         member.addRole(kayıtsız2.id)
          }else{
        member.addRole(kayıtsız.id)
     //   member.addRole(kayıtsız2.id)
          }
    },2000)
        if(!sChannel) return member.guild.owner.send("kayıt kanalı olmadığı için rol verirdi ama kanala yazı yazılamadı")
 setTimeout(() => {
/*  let embed1 = new Discord.RichEmbed()
  .setColor("#0ccfe4")
 .setDescription(`<a:11:650869379910598664> **WELCOME TO SHANNARA - DOKUNMA!1

<a:selam:634472547320332301> Hoşgeldin, ${member} Seninle ${member.guild.memberCount} Kişiyiz!
<a:tik:634472545898332220> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.
<a:kalpcikk:634472515690954767> Kayıt sorumluları seninle ilgilenecektir.
<a:yildiz:634471303281246215> Kayıt Sorumluların robot olmadığından emin olup lütfen beklemede kalın.
<a:shannara1:634471406117060621> <#634438749576495104> Kanalından Kurallar'ı okumayı ihmal etmeyin. 
<@&634438731130208257> <@&634438730706452500> <@&634438729976512532>
<a:tik:634472545898332220> Hesap Güvenli.**
`)*/
  sChannel.send(`<a:tik:787683666956517407> **WELCOME TO VORTEX --

<a:tik:787683666956517407> Hoşgeldin, ${member} Seninle ${member.guild.memberCount} Kişiyiz!
<a:tik:787683666956517407> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.
<a:tik:787683666956517407> Kayıt sorumluları seninle ilgilenecektir.
<a:tik:787683666956517407> <#781958289553883176> Kanalından Kurallar'ı okumayı ihmal etmeyin. 
<@&781957996459589652> <@&781964435878182924>
<a:tik:787683666956517407> Hesap Güvenli.**
`)
    },500)
    }

var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
     member.addRole(süp.id)
     setTimeout(() => {
     member.removeRole(kayıtsız.id)
     },2000)
     
    if(!sChannel) return member.guild.owner.send("kayıt kanalı olmadığı için rol verirdi ama kanala yazı yazılamadı")
 /* let embed1 = new Discord.RichEmbed()
  .setColor("#ff0000")
 .setDescription(`<a:11:650869379910598664> **WELCOME TO SHANNARA - DOKUNMA yoksa çalışmaz 

<a:129:650870745848872971> Hoşgeldin, ${member} Seninle ${member.guild.memberCount} Kişiyiz!
<a:129:650870745848872971> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.
<a:129:650870745848872971> Kayıt sorumluları seninle ilgilenecektir.
<a:129:650870745848872971> Kayıt Sorumluların robot olmadığından emin olup lütfen beklemede kalın.
<a:129:650870745848872971> <#634438749576495104> Kanalından Kurallar'ı okumayı ihmal etmeyin. 
<@&634438731130208257> <@&634438730706452500> <@&634438729976512532>
<a:129:650870745848872971> Yeni Açılmış Hesap Tespit edildi.**
`)*/
     if(kanal){
     kanal.send(member + " **Hesabınız Yeni Açıldığı İçin Karantinaya Atıldınız. Buradan Çıkmak İçin Bir Yetkiliye Ulaşın Teşekkürler. **<a:113:650870479422357523>")
     }
       sChannel.send(`<a:tik:787683666956517407> **WELCOME TO VORTEX

<a:tik:787683666956517407> Hoşgeldin, ${member} Seninle ${member.guild.memberCount} Kişiyiz!
<a:tik:787683666956517407> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.
<a:tik:787683666956517407> Kayıt sorumluları seninle ilgilenecektir.
<a:tik:787683666956517407> <#781958289553883176> Kanalından Kurallar'ı okumayı ihmal etmeyin. 
<@&781957996459589652> <@&781964435878182924>
<a:tik:787683666956517407> Yeni Açılmış Hesap Tespit edildi.**
`)
   }else{
        Eskiroller() // sunucuyakayıt() let Eskiroller > up
   }
}
