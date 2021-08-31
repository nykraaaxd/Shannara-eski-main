const Discord = require('discord.js');
const moment = require("moment")

exports.run = async (client, message, args) => {
  let guild = message.guild;
  let emojis = [];
  guild.emojis.forEach(emoji => {
  emojis.push(`${emoji}`);
  });
  emojis.length === 0 ? emojis = "Bulunamadı" : emojis = emojis.join(", ");

  let roles = [];
  guild.roles.forEach(role => {
    roles.push(`${role}`);
  });
  roles = roles.join(", ");
  
    const embeddd = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .addField('Sunucu', `• **Ad:** ${message.guild.name} \n• **ID:** ${message.guild.id} \n• **Bölge:** ${message.guild.region.toUpperCase()} \n• **Oluşturulma Tarihi:** ${moment(message.guild.createdAt).format('DD/MM/YYYY | HH:mm:ss')} \n• **Güvenlik Seviyesi:** ${message.guild.verificationLevel}`, true)
    .addField('Sahibi', `• **Ad:** ${message.guild.owner} \n• **ID:** ${message.guild.owner.user.id} \n• **Discord Kayıt Tarihi:** ${moment(message.guild.owner.user.createdAt).format('DD/MM/YYYY | HH:mm:ss')}`, true)
    .addField('Kullanıcılar', `👥 **Kullanıcılar:** ${message.guild.memberCount} \n**Botlar:** ${message.guild.members.filter(a => a.user.bot).size} \n**Toplam Aktif:** ${message.guild.members.filter(b => b.presence.status !== "offline").size}\n**Çevrimiçi:** ${message.guild.members.filter(a => a.user.presence.status === "online").size} \n**Rahatsız Etmeyin:** ${message.guild.members.filter(a => a.user.presence.status === "dnd").size} \n**Boşta:** ${message.guild.members.filter(a => a.user.presence.status === "idle").size} \n**Çevrimdışı/Görünmez:** ${message.guild.members.filter(a => a.user.presence.status === "offline").size}`, true)
    .addField('Kanallar', `**Toplam:** ${message.guild.channels.size} \n**Kategori:** ${message.guild.channels.filter(a => a.type === "category").size} \n📜 **Yazı:** ${message.guild.channels.filter(a => a.type === "text").size} \n🔊 **Ses:** ${message.guild.channels.filter(a => a.type === "voice").size}`, true)
    .addField(`Roller (${message.guild.roles.size})`, message.guild.roles.size > 15 ? `Çok fazla bulunduğu için sıralanamadı!` : roles, true)
    .addField(`Emojiler (${message.guild.emojis.size})`, message.guild.emojis.size > 15 ? `Çok fazla bulunduğu için sıralanamadı!` : emojis, true)
    message.channel.send(embeddd)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['serverinfo', 'server-info', 'sb', 'guildinfo'],
  permLevel: 0,
};

exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu bilgilerini listeler.',
  usage: 'sunucubilgi',
  kategori: 'kullanıcı'
};
