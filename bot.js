//cd documents/xed/projects/xedbot
//node bot.js

const Discord = require('discord.js');
const client = new Discord.Client();
const token = "Mzg1NTExNzk4OTg1NzE5ODI4.DQCbYw.FD0HhhkcnXM6U_HuvT5gadWAKrU";

client.on('ready',()=>{
	console.log('i am ready!');
});

client.on('message',message=>{
	if(message.content === '!ping'){
		message.channel.send('pong!');
	}
});

client.login(token);

client.on("guildMemberAdd", member =>{
	const channel = member.guild.channels.find('name','general');
	const introductions = member.guild.channels.find('name','introductions');
	if(!channel) return;
	channel.send(`Welcome to the witchsquad, ${member}! Refer to ${introductions} for more details!`);
	member.addRole(member.guild.roles.find('name','member')).catch(console.error);
	member.addRole(member.guild.roles.find('name','add pronouns')).catch(console.error);
});

client.on("guildMemberUpdate", (oldMember, newMember)=>{

	if((newMember.roles.exists('name','he/him') ||
		newMember.roles.exists('name','she/her') ||
		newMember.roles.exists('name','they/them'))
		&& oldMember.roles.exists('name','add pronouns')){

		newMember.removeRole(newMember.guild.roles.find('name','add pronouns')).catch(console.error);
	}

	if(!newMember.roles.exists('name','member')){
		newMember.addRole(newMember.guild.roles.find('name','member')).catch(console.error);
	}
});








