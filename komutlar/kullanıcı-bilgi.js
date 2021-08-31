const Discord = require('discord.js');
const moment = require("moment")

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.get(args[0]) || message.author
  let durumm;
  let durum = user.presence.status
  
    if(durum === "online") durumm = `Çevrimiçi`
    if(durum === "offline") durumm = `Çevrimdışı/Görünmez`
    if(durum === "idle") durumm = `Boşta`
    if(durum === "dnd") durumm = `Rahatsız Etmeyin`
    
    const embeddd = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(user.avatarURL)
    .setAuthor(user.tag, user.avatarURL)
    .addField(`Kullanıcı`, `• **Kullanıcı:** ${user} \n• **ID:** ${user.id} \n• **Ad:** \`${user.tag}\` \n• **Durumu:** ${durumm} \n• **Durum Açıklama:** ${user.presence.game ? user.presence.game : "Bulunmuyor"} \n• **Bot mu?** ${user.bot ? "Evet" : "Hayır"}`, true)
    .addField(`Katılım Tarihleri`, `• **Discord:** ${moment(user.createdAt).format('DD/MM/YYYY | HH:mm:ss')} \n• **Sunucu:** ${moment(message.guild.member(user).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`, true)
    .addField(`Rolleri`, message.guild.member(user).roles.filter(b => b.name !== "@everyone").map(a => a).join(', '), true)
    message.channel.send(embeddd)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı-bilgi', 'user-info', 'kb', 'userinfo'],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcıbilgi',
  description: 'Belirttilen kullanıcının bilgilerini gösterir.',
  usage: 'kullanıcıbilgi @üye',
  kategori: 'kullanıcı'
};

