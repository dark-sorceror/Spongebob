const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767});
const { token } = require("./config.json")
const { GiveawaysManager } = require('./Giveaway/index');

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉",
        lastChance: {
            enabled: true,
            content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
            threshold: 5000,
            embedColor: '#FF0000'
        }
    }
}); 

["Events", "Commands", "Buttons"].forEach(handler => {
    require(`./Structures/Handlers/${handler}`)(client, PG, Ascii);
});

client.login(token);