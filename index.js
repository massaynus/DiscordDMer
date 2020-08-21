const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    try {
        if (msg.content.startsWith('$dm') && msg.guild) {
            //msg.author.createDM().then(channel => channel.send(msg.content)).catch(e => console.log(e));

            msg.guild.fetch()
                .then(guild => {
                    guild.members.fetch().then(members => {
                        members.forEach(member => {
                            if (!member.user.bot) {
                                //console.log(member.user.username);
                                member.user.createDM()
                                    .then(channel => {
                                        channel.startTyping();
                                        channel.send(msg.content.replace('$dm', ''));
                                        msg.reply('sent message to ' + member.user.username);
                                        channel.stopTyping();
                                    })
                                    .catch(e => console.log("coudln't DM " + member.user.username));
                            }
                        })
                    }).catch(e => console.log(e))
                }).catch(e => console.log(e));

        } else if (msg.content === 'ping') {
            msg.reply('Pong!');
        }
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);