const { MessageEmbed } = require('discord.js');
const links = require('../models/links');
module.exports = {

    description: 'Sana ait linkleri listeler',

    run: async (client, interaction) => {
        let a = await links.find({ sahip: interaction.member.id })
        let b = a.map((v) => v.link).join("\n")
        const embed = new MessageEmbed().setAuthor(interaction.member.user.tag, interaction.member.user.avatarURL({dynamic:true})).setDescription(b ? b : 'Link Bulunamadı');
        interaction.reply({embeds:[embed], ephemeral:true})
    } 
};
