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

const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

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

client.on(
  "message",
  /* async */ (msg) => {
    if (msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let [tag, platform, tag2, platform2] = args;
    tagAPI = tag.replace("#", "%23");
    tag2API = tag2.replace("#", "%23");

    let displayPlat = "PC";
    if (platform != "battle" && platform != "acti" && platform != "steam") {
      displayPlat = "konsoll";
    }
    let displayPlat2 = "PC";
    if (platform2 != "battle" && platform2 != "acti" && platform2 != "steam") {
      displayPlat2 = "konsoll";
    }

    if (command === "stats") {
      await axios
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
                response.data.message ||
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

    if (command == "compare") {
      let player1 = await axios
        .request(createRequest(tagAPI, platform))
        .then((response) => {
          return response.data.br;
        })
        .catch((error) => {
          console.log(error);
        });

      await wait(1000);

      let player2 = await axios
        .request(createRequest(tag2API, platform2))
        .then((response) => {
          return response.data.br;
        })
        .catch((error) => {
          console.log(error);
        });

      const statEmbed = {
        color: colors[Math.floor(Math.random() * colors.length)],
        title: tag + ", " + displayPlat + " | " + tag2 + ", " + displayPlat2,
        description: "Warzone stats for kule gutter",
        footer: {
          text: "!stats TAG PLATFORM \nPLATFORM: battle, psn, xbl, acti",
        },
        fields: [
          {
            name: "Tid spilt",
            value:
              (player1?.timePlayed / 3600).toFixed(1) +
              " timer" +
              " | " +
              (player2?.timePlayed / 3600).toFixed(1) +
              "timer",
          },
          {
            name: "Matcher",
            value: player1?.gamesPlayed + " | " + player2?.gamesPlayed,
            inline: true,
          },
          {
            name: "Wins",
            value: player1?.wins + " | " + player2?.wins,
            inline: true,
          },
          {
            name: "W/L",
            value:
              ((player1?.wins / player1?.gamesPlayed) * 100).toFixed(3) +
              "%" +
              " | " +
              ((player2?.wins / player2?.gamesPlayed) * 100).toFixed(3) +
              "%",
            inline: true,
          },
          {
            name: "Topp 5",
            value: player1?.topFive + " | " + player2?.topFive,
            inline: true,
          },
          {
            name: "Topp 10",
            value: player1?.topTen + " | " + player2?.topTen,
            inline: true,
          },
          {
            name: "Topp 25",
            value: player1?.topTwentyFive + " | " + player2?.topTwentyFive,
            inline: true,
          },
          {
            name: "Kills",
            value: player1?.kills + " | " + player2?.kills,
            inline: true,
          },
          {
            name: "Deaths",
            value: player1?.deaths + " | " + player2?.deaths,
            inline: true,
          },
          {
            name: "K/D",
            value:
              player1?.kdRatio.toFixed(3) + " | " + player2?.kdRatio.toFixed(3),
            inline: true,
          },
        ],
      };
      player1 && player2
        ? msg.channel.send({ embed: statEmbed })
        : msg.channel.send(
            "Profilen er enten ikke synlig eller så er taggen feil"
          );
    }
  }
);

client.login(process.env.TOKEN);
