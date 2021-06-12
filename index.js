const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require("./config.json");
const axios = require("axios").default;
require("dotenv").config();

function createRequest(tag, platform) {
  let options = {
    method: "GET",
    url: `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${tag}/${platform}`,
    headers: {
      "x-rapidapi-key": "869af04304msha010d0606a94180p1d7f6djsne8d407c61d95",
      "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
    },
  };
  return options;
}

const colors = [
  "0A92F8",
  "1DD64A",
  "4B4C4D",
  "FA007D",
  "18EB08",
  "560AFF",
  "A71E1E",
];

client.on("ready", () => {
  console.log(`Bot: ${client.user.tag} is running!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "stats") {
    let [tag, platform] = args;
    tagAPI = tag.replace("#", "%23");

    let displayPlat = "PC";
    if (platform != "battle" && platform != "acti" && platform != "steam") {
      displayPlat = "konsoll";
    }

    axios
      .request(createRequest(tagAPI, platform))
      .then((response) => {
        const stats = response.data.br;

        const statEmbed = {
          color: colors[Math.floor(Math.random() * colors.length)],
          title: tag + ", " + displayPlat,
          description: "Warzone stats for kule gutter",
          footer: {
            text: "!stats TAG PLATFORM \nPLATFORM: battle, psn, xbl, acti",
          },
          fields: [
            {
              name: "Tid spilt",
              value:
                (stats?.timePlayed / 3600).toFixed(1) +
                " timer \n" +
                (stats?.timePlayed / 86400).toFixed(1) +
                " dager",
            },
            {
              name: "Matcher",
              value: stats?.gamesPlayed,
              inline: true,
            },
            {
              name: "Wins",
              value: stats?.wins,
              inline: true,
            },
            {
              name: "W/L",
              value:
                ((stats?.wins / stats?.gamesPlayed) * 100).toFixed(3) + "%",
              inline: true,
            },
            {
              name: "Topp 5",
              value: stats?.topFive,
              inline: true,
            },
            {
              name: "Topp 10",
              value: stats?.topTen,
              inline: true,
            },
            {
              name: "Topp 25",
              value: stats?.topTwentyFive,
              inline: true,
            },
            {
              name: "Kills",
              value: stats?.kills,
              inline: true,
            },
            {
              name: "Deaths",
              value: stats?.deaths,
              inline: true,
            },
            {
              name: "K/D",
              value: stats?.kdRatio.toFixed(3),
              inline: true,
            },
          ],
        };
        stats
          ? msg.channel.send({ embed: statEmbed })
          : msg.channel.send(
              "Profilen er enten ikke synlig eller så er taggen feil"
            );
      })
      .catch((error) => {
        console.log(error);
      });

    // msg.channel.send(
    //   `${msg.author.username} is playing on ${displayPlat}. Gamertag: ${tag}`
    // );
  }
});

client.login(process.env.TOKEN);
