const { MessageEmbed } = require("discord.js");
const links = require("../models/links");
module.exports = {

    description: 'Sistemde kayıtlı linkler',
   
    run: async (client, interaction) => {
        if(interaction.member.id == "586822327568695317"){
           try {
            const res = await links.find()
   
            const m = res.map((a) => a.link).join("\n")
            interaction.reply({ embeds: [new MessageEmbed().setDescription(m)] })
           } catch (err) {
               console.error(err)
           }
        }
        else{
            interaticon.reply('Bu komut sadece bot galiştiricelri kullanabilir')
        }
       
       
        
    } 
};
