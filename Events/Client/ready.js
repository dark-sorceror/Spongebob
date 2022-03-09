const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        client.user.setActivity(`Subscribe to Mxtthew_YT`, {type: "PLAYING"})
        console.log('Ready');

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true
        }).then(() => {
            console.log("The client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        })
    }
}