const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require("./config.json");
const axios = require("axios").default;
require("dotenv").config();

const StatEmbed = require("./helpers/StatEmbed");

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

const getStatsFromDB = async (user) => {
  let br = {};
  await axios
    .get(`https://mwbotdb.herokuapp.com/player/${user}`)
    .then((response) => {
      for (var i in response.data) {
        if (response.data[i].br) {
          br = response.data[i].br;
        }
      }

      return br;
    });
  return br;
};

const updateAfterComparison = async (userID, br) => {
  await axios.put(`https://mwbotdb.herokuapp.com/player/${userID}`, {
    br,
  });
};

const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

client.on("ready", () => {
  console.log(`Bot: ${client.user.tag} is running!`);
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let [tag, platform, tag2, platform2] = args;

  let tagAPI = tag.replace("#", "%23");

  const userID = tagAPI.concat(platform);

  if (command === "stats") {
    // let stats = "";
    try {
      const old = await getStatsFromDB(userID);

      const response = await axios.request(createRequest(tagAPI, platform));
      const stats = response.data.br;

      let player1 = {
        tag: tag,
        platform: platform,
        old: old,
        data: stats,
      };

      const embedResult = StatEmbed(player1, (player2 = false));

      stats
        ? msg.channel.send({ embed: embedResult })
        : msg.channel.send(
            response.data.message ||
              "Profilen er enten ikke synlig eller så er taggen feil"
          );

      await updateAfterComparison(userID, stats);
    } catch (error) {
      console.error(error);
    }
  }

  if (command == "compare") {
    const tag2API = tag2.replace("#", "%23");
    let player1 = "";
    let player2 = "";
    let player1Embed = {};
    let player2Embed = {};

    try {
      const player1Response = await axios.request(
        createRequest(tagAPI, platform)
      );
      player1 = await player1Response.data.br;

      await wait(1500);

      const player2Response = await axios.request(
        createRequest(tag2API, platform2)
      );
      player2 = await player2Response.data.br;

      player1Embed = {
        tag: tag,
        platform: platform,
        old: null,
        data: player1,
      };
      player2Embed = {
        tag: tag2,
        platform: platform2,
        old: null,
        data: player2,
      };
    } catch (error) {
      console.error(error);
    }

    player1 && player2
      ? msg.channel.send({ embed: StatEmbed(player1Embed, player2Embed) })
      : msg.channel.send("Feil tags? Ikke endra privacy settingsa?");
  }
});

client.login(process.env.TOKEN);
