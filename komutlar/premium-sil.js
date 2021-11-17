
const premium = require("../models/premium.js")
module.exports = {

    description: 'Premium Kullanıcı işlemleri',
    options: [
        {
            name: 'üye',
            description: 'Premium sil',
            type: 'USER',
            required: true
           
        },
    ],
    run: async (client, interaction) => {
        const üye = interaction.options.getMember('üye');
        const c = await premium.findOne({ user: üye.id })
        if (c) {
            await premium.deleteOne({ user: üye.id });
            return interaction.reply({ content: `${üye} isimli kullanıcının premium üyeliği iptal edildi`})
        } else {
            return interaction.reply({ content: "Bu kullanıcı zaten Premium değil"})
        }
    } 
};
