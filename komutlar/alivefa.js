const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`**${message.guild.members.random().user.tag}** sunucudaki Ali Vefa sensin.`)
        .setImage('https://66.media.tumblr.com/549f3b58605bf618e2808921b32d54ad/tumblr_pz5uuk53Fg1y4slboo1_250.gifv');

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'alivefa',
    description: 'Sunucudaki şanslı Ali Vefa\'yı gösterir.',
    usage: 'alivefa',
    kategori: 'kullanıcı'
};
