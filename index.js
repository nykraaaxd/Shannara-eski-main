const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const db = require('quick.db');
const ms = require('parse-ms')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


////////////////////////

client.elevation = message => {
  if(!message.guild) {
    return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


//////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
  if(message.content ===".tag"||message.content ==="tag"||message.content ==="!tag"){
    message.channel.send(`**TAGINI GİR**`)
  }
})

client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
         if (message.content === '.join' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
           if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.join()
            
                message.reply("Bot odaya giriş yaptı.").then(m => m.delete(9000));

      }
           if (message.content === '.join' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
      if (message.content === '.leave' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.leave()
        
                message.reply("Bot odadan çıkış yaptı.").then(m => m.delete(9000));

      }
             if (message.content === '.leave' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
  
  })
  ///////////////////////OTOTAG-------------------------------------
client.on("userUpdate", function(oldUser, newUser){

  let kanal =client.channels.get('KANALİD')
     if(oldUser.username !== newUser.username) {
       const  takmaad =  client.guilds.get("SUNUCUİD").members.get(newUser.id).displayName

          
        if(!newUser.username.includes("𝓥")&& client.guilds.get("SUNUCUİD").members.get(newUser.id).roles.has("TAGLI ROLÜ")) {
           if(!client.guilds.get("SUNUCUİD").members.get(newUser.id).removeRole("TAGLI ROLÜ")) return newUser.guild.owner.send("ototag rolü olmadığı için rol alınamadı")
             client.guilds.get("SUNUCUİD").members.get(newUser.id).removeRole("TAGLI ROLÜ")

            let değişeceksembol1 = takmaad.replace(/𝓥/g, "𝓥");
              client.guilds.get("SUNUCUİD").members.get(newUser.id).setNickname(değişeceksembol1)   
               if(!kanal) return newUser.guild.owner.send("ototag bilgi kanalı olmadığı için rol alındı ama kanala yazı yazılamadı")
          
            let embed1 = new Discord.RichEmbed()
            .setColor("#000002")
            .setDescription(`**${newUser}, tagı çıkardığı için Bot tarafından <@&TAGLI ROLÜİD> rolü alındı!**`)
            .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
            .setTimestamp()
            kanal.send(embed1)
                
       
        } 
         if(newUser.username.includes("TAGINIZ")&& !client.guilds.get("SUNUCUİD").members.get(newUser.id).roles.has("TAGLI ROLÜ")) {

           if(client.guilds.get("SUNUCUİD").members.get(newUser.id).roles.has("TAGLI ROLÜ")) return;
           
                      if(client.guilds.get("SUNUCUİD").members.get(newUser.id).roles.has("TAGLI ROLÜ")) return;

             if(!client.guilds.get("SUNUCUİD").members.get(newUser.id).addRole("TAGLI ROLÜ"))   return newUser.guild.owner.send("ototag rolü olmadığı için rol verilemedi")
              client.guilds.get("SUNUCUİD").members.get(newUser.id).addRole("TAGLI ROLÜ")
                let değişeceksembol2 = takmaad.replace(/𝓥/g, "TAGINIZ");
                 client.guilds.get("SUNUCUİD").members.get(newUser.id).setNickname(değişeceksembol2)    
                   if(!kanal) return newUser.guild.owner.send("ototag bilgi kanalı olmadığı için rol verirdi ama kanala yazı yazılamadı")
           
            let embed1 = new Discord.RichEmbed()
            .setColor("#000002")
            .setDescription(`**${newUser}, tagı aldığı için Bot tarafından <@&TAGLI ROLÜ> rolü verildi!**`)
                
              .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
             .setTimestamp()
            kanal.send(embed1) 
         }
        }
      })
///////////////////// AFK SİSTEMİ/////////////////////////////
client.on("message",async message => {
 if(message.channel.type === "dm" || message.author.bot) return
   if(message.content === "!link"||message.content === ".link"||message.content === "link") {
     message.channel.send("LİNKİNİZ- BİRİSİ LİNK YAZINCA LİNK ATAR")
   }
})
client.on("message",async message => {
   if (message.author.bot || message.channel.type === "dm") return;
 
  //return message.channel.send(`**${user_tag}** Şu anda afk.\nNedeni:${key.reason}`)
  //return message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
    var afklar =await db.fetch(`afk_${message.author.id}, ${message.guild.id}`)
    
  if(afklar){
    
    db.delete(`afk_${message.author.id}, ${message.guild.id}`)
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`)
    
    message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = message.member.nickname.replace("[AFK]", "")
    message.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   

 console.log(err.message)
  }
  }
  var kullanıcı = message.mentions.users.first()
  if(!kullanıcı) return
   let zaman =  await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`)
  
   
    var süre = ms(Date.now() - zaman)
    
    
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`)
  if(await db.fetch(`afk_${message.mentions.users.first().id}, ${message.guild.id}`)){
  if(süre.days !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.days}** Gün **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  
  if(süre.hours !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  if(süre.minutes !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
   if(süre.seconds !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **Bir Kaç Saniye** Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  }

})
/*client.on("guildMemberRemove",async function(member){
   
  
    let KayıtEdilen = await db.fetch(`KayıtEden2_${member.id}`)

    if(KayıtEdilen){
      for(var i = 0; i<KayıtEdilen.length;i=i+1){
    
    
    db.add(`Leave_${KayıtEdilen}`,-1)

    console.log(KayıtEdilen)
    
         }
      
      
    }
  
});*/
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
   var Attachment = (message.attachments)
  if (Attachment){
     if(Attachment.array()[0]!==undefined) return
       
     
  }
  
  let sChannel2 = message.guild.channels.get("781968760017125376")
    if(!sChannel2) return
  const embed = new Discord.RichEmbed()
  .setColor("#000000")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("**Kullanıcı Tag**", message.author.tag, true)
  .addField("**Kanal Adı**", message.channel.name, true)
  .addField("**Silinen Mesaj**", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
 
});
///////////////////////////////////// MESAJ UPDATE///////////////////////////////////////////////
client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.get("mesaj-log-id")
  if (oldMessage.content == newMessage.content) return;
  if(!sChannel3) return
  let embed = new Discord.RichEmbed()
  .setColor("#ffffff")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("**Kullanıcı**", newMessage.author)
  .addField("**Kanal Adı**", newMessage.channel.name)
  .addField("**Eski Mesaj**", "```" +oldMessage.content+"```" , true)
  .addField("**Yeni Mesaj**", "```" +newMessage.content+"```" , true)
  
  .setThumbnail(newMessage.author.avatarURL)
    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
});
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  

  let sChannel3 = message.guild.channels.get("mesaj-log-id")
    if(!sChannel3) return

 var Attachment = (message.attachments)
  if (Attachment){
   if(Attachment.array()[0]!==undefined){

       let embed = new Discord.RichEmbed()
  .setColor("#210481")
  .setAuthor(`Foto Log `, message.author.avatarURL)
  .addField("**Kullanıcı**", message.author.tag,true)
  .addField("**Kanal Adı**", message.channel.name,true)
  .setImage(Attachment.array()[0].proxyURL)

    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
   // sChannel3.send(message.author ,new Discord.Attachment(Attachment.array()[0].proxyURL))
   // sChannel3.send("----------------------------------------------------")
   }
  }
});
//// SA-AS/////////
client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() ==="sa"||message.content.toLowerCase() ==="sea"||message.content.toLowerCase() ==="selamün aleyküm"||message.content.toLowerCase() ==="selamun aleykum"){
    message.reply("**Aleyküm Selam Dostum Hoşgeldin** ")
  }
})
client.login(process.env.BOT_TOKEN);


///////////////////////////////////////////////////////////////////////////////////////////////////
////////// SOL SİLME KORUMASI///////////////
client.on('roleDelete', async (role) => {
   
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    const yetkili = await role.guild.members.get(entry.executor.id);
    const eskihali = role.permissions;
          console.log(eskihali)
   if (yetkili.id === "ÇEKİLCEK ROLİD")return;
   if (yetkili.id === "ÇEKİLCEK ROLİD")return;
   if (yetkili.id === "ÇEKİLCEK ROLİD")return;
             let embed = new Discord.RichEmbed()
             .setColor("BLACK")
             .setDescription(`<@${yetkili.id}> İsimli Kişi ${role.id} ID'li Rolü Sildi Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine \`Cezalı\` Rolünü Verdim. <a:tik:784435738967539712>`)
             .setTimestamp()
             let roles = role.guild.members.get(yetkili.id).roles.array()
                    try {
                         role.guild.members.get(yetkili.id).removeRoles(roles)
                                                                             
                         }
              catch(err) {
                          console.log(err)
                         } 
    setTimeout(function(){
                         role.guild.members.get(yetkili.id).addRole("CEZALIROLİD")
                         role.guild.owner.send(embed)
                         }, 1500);

                  });

client.on("roleDelete", async (role) => {

  const embedmemberadd23 = new Discord.RichEmbed()
  .setTitle(`-  #` + `${role.name} Adlı Rol Silindiği İçin Yetki Rolleri Çekildi. <a:tik:784435738967539712>`, ``)
  .addField(`Hangi Yetkiye Sahip Roller Çekilir?`, `(Yönetici, Rolleri Yönet, Denetim Kaydını Görüntüle, Kanalları Yönet, Sunucuyu Yönet) Yetkilerine Sahip Roller Çekildi. <a:tik:784435738967539712>`)
.setImage("https://cdn.discordapp.com/attachments/668814285761150988/669477310411440148/Ragnar.gif")
role.guild.owner.send(embedmemberadd23)
  
  role.guild.members.forEach(member => {
    member.removeRole("ÇEKİLCEK ROLİD") 
    member.removeRole("ÇEKİLCEK ROLİD") 
    member.removeRole("ÇEKİLCEK ROLİD") 
    
  });
});
//////////////////////////// YÖNETİCİ VERME KORUMASIII////////////// YOUİS YAPARXD
client.on("roleUpdate", async function(oldRole, newRole) {
  
   const bilgilendir = await newRole.guild.fetchAuditLogs({type: "ROLE_UPLATE"}).then(hatırla => hatırla.entries.first())
    let yapanad= bilgilendir.executor;
  let idler= bilgilendir.executor.id;
  if(idler === "615661042437062814") return
  if(oldRole.hasPermission("ADMINISTRATOR")) return
  
   setTimeout(() => {

     if(newRole.hasPermission("ADMINISTRATOR")){
   newRole.setPermissions((newRole.permissions-8))    
 }
     
 if(newRole.hasPermission("ADMINISTRATOR")){
  
     if(!client.guilds.get(newRole.guild.id).channels.has("KANALİD")) return newRole.guild.owner.send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}** <a:tik:784435738967539712>`)

  client.channels.get("KANALİD").send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}** <a:tik:784435738967539712>`)
 }
      }, 1000)
  })
/////////////////////ROL SİLME KORUMASI DEVAMI DOKUNMA///////////////
client.on('roleDelete', async function(role) {
  const fetch = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(log => log.entries.first())
  let yapanad = fetch.executor;
  let isim = role.name;
  let renk = role.color;
  let ayrı = role.hoist;
  let sıra = role.position;
  let yetkiler = role.permissions;
  let etiketlenebilir = role.mentionable;
  role.guild.createRole({
    name:isim,
    color:renk,
    hoist:ayrı,
    position:sıra,
    permissions:yetkiler,
    mentionable:etiketlenebilir
  })
  let teqnoembed = new Discord.RichEmbed()
    .setTitle("Warning")
    .setColor("RED")
    .setFooter("Vortex Guard")
    .setDescription(`\`${role.guild.name}\` Adlı Sunucunuzda ${isim} Adına Sahip Rol, ${yapanad} Adlı Kişi Tarafından Silindi. Ve Ben Tekrardan Oluşturdum! <a:tik:784435738967539712>`)
  role.guild.owner.send(teqnoembed)
});

/////////////////////////////KANAL SİLME KORUMASI//////////////////////////////////////////////////////////

client.on('channelDelete', async (channel) => {
 
 const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
 const yetkili = await channel.guild.members.get(entry.executor.id);
	 if (yetkili.id === "ÇEKİLCEK ROLİD")return;
   if (yetkili.id === "ÇEKİLCEK ROLİD")return; 
   if (yetkili.id === "ÇEKİLCEK ROLİD")return; 
 let embed = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription(`<@${yetkili.id}> İsimli Kişi ${channel.id} ID'li Kanalı Sildi Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine (Cezalı) Rolünü Verdim. <a:tik:784435738967539712>`)
.setTimestamp()
 let roles = channel.guild.members.get(yetkili.id).roles.array()
 try {
channel.guild.members.get(yetkili.id).removeRoles(roles)
                                                                           
  }
 catch(err) {
 console.log(err)
 } 
 setTimeout(function(){
      channel.guild.members.get(yetkili.id).addRole("CEZALI")
      channel.guild.owner.send(embed)
               }, 1500);

                                                                               
                                                                                     
     });
/////////////////////// KANAL SİLME KORUMASI + KANAL SİLİNCE YETKİ KAPATMA 
client.on("channelDelete", async (channel) => {
  
  const embedmemberadd23 = new Discord.RichEmbed()
  .setTitle(`-  #` + `${channel.name} Adlı Kanal Silindiği İçin Yetki Rolleri Çekildi. <a:tik:784435738967539712>`, ``)
  .addField(`Hangi Yetkiye Sahip Roller Çekilir?`, `(Yönetici, Rolleri Yönet, Denetim Kaydını Görüntüle, Kanalları Yönet, Sunucuyu Yönet) Yetkilerine Sahip Roller Çekildi. <a:tik:784435738967539712>`)
.setImage("https://cdn.discordapp.com/attachments/668814285761150988/669477310411440148/Ragnar.gif")
channel.guild.owner.send(embedmemberadd23)
  
  channel.guild.members.forEach(member => {
    member.removeRole("ÇEKİLCEK ROLİD") 
    member.removeRole("ÇEKİLCEK ROLİD")
    member.removeRole("ÇEKİLCEK ROLİD")

  });
});

client.on('channelDelete', async function(channel) {
  const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(log => log.entries.first())
  let yapanad= fetch.executor;
  if(channel.type === "voice") {
    console.log(`${channel.name} Adlı Ses Kanalı Silindi.`)
    let kategoriID = channel.parentID;
    let isim = channel.name;
    let sıra = channel.position;
    let limit = channel.userLimit;
    channel.guild.owner.send(`Merhaba. **${channel.guild.name}** Adlı Sunucunuzda, ${yapanad} Adlı Kişi, \`${channel.name}\` Adlı Sesli kanalı Silindi Ve Bende O Kanalı Tekrardan Oluşturdum. <a:tik:784435738967539712>`)
    channel.clone(this.name,true,false).then(kanal => {
      let z = kanal.guild.channels.get(kanal.id)
      z.setParent(z.guild.channels.find(channel => channel.id === kategoriID))
      z.edit({position:sıra,userLimit:limit})
    })
  }
  if(channel.type === "text") {
    console.log(`${channel.name} Adlı Metin Kanalı Silindi.`)
    let açıklama = channel.topic;
    let kategoriID = channel.parentID;
    let isim = channel.name;
    let sıra = channel.position;
    let nsfw = channel.nsfw;
    channel.guild.owner.send(`Merhaba. **${channel.guild.name}** Adlı Sunucunuzda, ${yapanad} Adlı Kişi, \`${channel.name}\` Adlı Metin Kanalı Silindi Ve Bende O Kanalı Tekrardan Oluşturdum. <a:tik:784435738967539712>`)
    channel.clone(this.name,true,true).then(kanal => {
      let z = kanal.guild.channels.get(kanal.id)
      z.setParent(z.guild.channels.find(channel => channel.id === kategoriID))
      z.edit({position:sıra,topic:açıklama,nsfw:nsfw})
    })
  }
})

//////////////////////////////////ban koruması///////////////////////////////////////////////////////

client.on('guildBanAdd',  async (guild, user) => {

    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    const yetkili = await guild.members.get(entry.executor.id); 
            if (yetkili.id === "ÇEKİLCEK ROLİD")return;
            if (yetkili.id === "ÇEKİLCEK ROLİD")return;
            if (yetkili.id === "ÇEKİLCEK ROLİD")return;
  
        let embed = new Discord.RichEmbed()
       .setColor("BLACK")
       .setDescription(`<@${yetkili.id}> , <@${user.id}> Kişisini  Banladı Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine \`Cezalı\` Rolünü Verdim. <a:tik:784435738967539712>`)
       .setTimestamp()
        let roles = guild.members.get(yetkili.id).roles.array()
        try {
              guild.members.get(yetkili.id).removeRoles(roles)
           }
        catch(err) { 
                      console.log(err)
                   } 
 	  setTimeout(function(){
              guild.members.get(yetkili.id).addRole("CEZALI")
         
			 guild.owner.send(embed)
          
                         }, 1500);

                                               
                                                 });


////////KİCK -KORUMASI////////////
client.on("guildMemberRemove", async function(member) {
  let guild = member.guild;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_KICK" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
  setTimeout(async () => {
    let logs = await guild.fetchAuditLogs({ type: "MEMBER_KICK" });
    if (logs.entries.first().executor.bot) return;
    if (logs.entries.first().target.id !== member.id) return;
    guild.members
      .get(logs.entries.first().executor.id)
      .removeRoles(guild.members.get(logs.entries.first().executor.id).roles); /// TÜM ROLLERİNİ ALIR
    setTimeout(() => {
      guild.members

        .get(logs.entries.first().executor.id)
        .addRole("CEZALI"); /// VERİLECEK CEZALI ROL İD
    }, 3000);
    
    const k = guild.channels.find(c => c.id === "KANAL İD");
 k.send(`<@${yetkili.id}> <@${member.user.id}> Adlı Kişiye Sağ Tık Kick Atıldığı İçin Kickliyen Kişinin Yetkileri Alındı. <a:tik:784435738967539712>`);  }, 2000);
});

/////////////////////////////////////////////////////////////////////////////////////////////////



client.on("guildMemberAdd", async member => {
  
   
    if(member.user.bot) {
     
      member.guild.roles.forEach(async function(yetkilirol){
  if(yetkilirol.id ==="ÇEKİLCEK ROLİD")return
  if(yetkilirol.id ==="ÇEKİLCEK ROLİD")return
  if(yetkilirol.id ==="ÇEKİLCEK ROLİD")return
  if(yetkilirol.hasPermission("ADMINISTRATOR")){
       yetkilirol.setPermissions((yetkilirol.permissions-8))    
     }
      })
      let korumakanalı = client.channels.get("KANAL İD")
      if(!korumakanalı || korumakanalı === null){
        member.ban(member);
         member.guild.owner.send(`Log Kanalı Olmadığı İçin Sunucu Sahibinin Özeline Yazıyorum. | **Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Botu Banladım. \nBanlanan Bot: **${member} <a:tik:784435738967539712>`)
     }
      else{
        
      member.ban(member);
      korumakanalı.send(`**Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Botu Banladım. Ayrıca Bütün Botların Yönetici Yetkisini Kapattım , Herkesten Yönetici Yetkisi Aldım @everyone @here <@&781957943037394975>, <@&781957940307165244> \nBanlanan Bot: **${member} <a:tik:784435738967539712>`)
     }
  }
    else{
      
    }
  
  })

/////////////////////////////rol yetki kapatma///////////////////////////////////////////////////
client.on("roleDelete", async role => {
  let logKanali = ""; // LOG KANALI IDSI BURAYA
  role.guild.roles.filter(r => r.editable && (r.hasPermission("ADMINISTRATOR") || r.hasPermission("MANAGE_ROLES") || r.hasPermission("MANAGE_CHANNELS") || r.hasPermission("BAN_MEMBERS") || r.hasPermission("KICK_MEMBERS"))).forEach(async r => await r.setPermissions(36768833));
  let log = new Discord.RichEmbed().setTitle("Bir Rol Silindi").setColor("RANDOM").setDescription(`**${role.name}** rolü silindi ve sunucudaki "Yönetici" ve "Rolleri Yönet" izni olan rollerin izinleri kapatıldı!`).setTimestamp();
  client.channels.get(logKanali).send(log).catch(err => role.guild.owner.send(log));
});

////////////////////////reklam bilgi ///////////////////////////
client.on("message", async message => {
    if (message.member.hasPermission('ADMINISTRATOR')) return;
    let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
    if (!links) return;
    if (message.deletable) message.delete();
    message.channel.send(`Hey ${message.author}, sunucuda link paylaşamazsın!`)
})





//////////////////////////////////////////////////////////////////////////////////////////////////c
client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("Birkaç Saniye Önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get("782227500364857374")
   var kayıtsız = member.guild.roles.get("781958129130799124")
   member.addRole(rol)
member.user.send('Hesabınız 7 Günden Önce Açıldığı İçin Otomatik Olarak Cezalıya Atıldınız, Yetkililere Bildirerek Açtırabilirsiniz Ayrıca Unutmayın Her Şey Siz Değerli Üyelerimizin Güvenliği İçin.')
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)


    
   }
        else {

        }  
    });

client.login(ayarlar.token);



