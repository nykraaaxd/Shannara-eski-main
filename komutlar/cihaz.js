const Discord = require("discord.js");
exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
 let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send(`Cihazını görmek istediğiniz kullanıcıyı etiketleyin!`);
let p = Object.keys(kullanıcı.presence.clientStatus).join(',')
let cihazisim = p
.replace(`mobile`,`Mobil`)
.replace(`desktop`,`Bilgisayar`)
.replace(`web`,`İnternet Tarayıcısı`)

let k = Object.values(kullanıcı.presence.clientStatus).join(',')
let durum = k
.replace(`online`,`çevrimiçi`)
.replace(`idle`,`boşta`)
.replace(`dnd`,`rahatsız etmeyin`)
.replace(`offline`,`çevrimdışı/görünmez`)

   message.channel.send(`${kullanıcı} üyesinin şuanda kullandığı cihaz: **${cihazisim}** | **${durum}**`);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "cihaz",
    description: '',
    usage: ''
};

