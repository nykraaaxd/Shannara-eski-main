const Discord = require('discord.js');
const ms = require('ms');
exports.run = async(client, message, args) => {
	let victim = message.mentions.users.first() || (args.length > 0 ? client.users.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
	let embed = new Discord.RichEmbed()
	.setFooter(message.author.username + " tarafından kullanıldı.", message.author.avatarURL)
	.setDescription(`[Resim Adresi](${victim.avatarURL})`)
	.setImage(victim.avatarURL)
	message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['avtr'],
  permLevel: 0
};

exports.help = { 
  name: 'avatar', 
  description: 'Avatar gösteriyor falan',
  usage: 'avatar @üye/id/isim',
  kategori: 'kullanıcı'
};
