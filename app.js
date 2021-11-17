const {Client, Intents, Collection} = require("discord.js");
const client = new Client({intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGES]});
const fs = require("fs");
const db = require("mongoose");
const fetch = require("node-fetch");
const synchronizeSlashCommands = require('discord-sync-commands');
db.connect("mongodb+srv://videobot:videobot@cluster0.x24lr.mongodb.net/gweepvideotest").then(() => {
    console.log("Mongoya Bağlanıldı");
}).catch(console.log("Mongoose hata"));
const {token} = require("./config.json");
client.commands = new Collection();
fs.readdir("./komutlar/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./komutlar/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, {
            name: commandName,
            ...props
        });
        console.log(`👌 Komut Yüklendi: ${commandName}`);
    });
    synchronizeSlashCommands(client, client.commands.map((c) => ({
        name: c.name,
        description: c.description,
        options: c.options,
        type: 'CHAT_INPUT'
    })), {
        debug: true
    });
});


client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return void interaction.reply({
        content: `\`${interaction.commandName}\` isminde komut bulunamadı.`,
        ephemeral: true
    });
   
    command.run(client, interaction);
});
client.on('ready', () => {
    console.log(`
    ${client.user.tag} ismi ile giriş yapıldı,
    ${client.channels.cache.size} adet kanala,
    ${client.guilds.cache.size} adet sunucuya,
    ${client.users.cache.size} adet kullanıcıya hizmet veriyor.`);
});
client.on('ready', () => {
    const r = require("./models/links.js")
    setInterval(() => {
        r.find({}, (err, res) => {
            res.forEach(b => {
              
                try {
                    fetch(b.link);
                    console.log(`Uptime Edildi: [${b.link} + ${b.sahip}]`);
                    } catch {console.log(`hatalı link: [${b.link} + ${b.sahip}]`);}
            })
        })
    }, 5000)
})


client.login(token);