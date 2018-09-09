const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',()=>{
	console.log('i am ready!');
});

client.on('message',message=>{
	if(message.content === '!ping'){
		message.channel.send('pong!');
	} if(message.content === '!goodbot'){
		message.channel.send('thank u');
	} if(message.content === '!help'){
		message.channel.send(`You can refer to ${introductions} for more info!`);
	}
});

//client.login(token);
client.login(process.env.BOT_TOKEN);

client.on("guildMemberAdd", member =>{
	const channel = member.guild.channels.find('name','general');
	const help = member.guild.channels.find('name','help');
	if(!channel) return;
	channel.send(`Welcome to the server, ${member}! Refer to ${help} for more details!`);
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
