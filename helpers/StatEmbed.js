module.exports = (player1, player2) => {
  const Compare = require("./CompareProgress");
  const Colors = require("./Colors");
  const DisplayPlatform = require("./DisplayPlatform");

  if (!player2) {
    console.log(player1.data);
    return {
      color: Colors[Math.floor(Math.random() * colors.length)],
      title: player1.tag + ", " + DisplayPlatform(player1.platform),
      description: "Warzone stats for kule gutter",
      footer: {
        text: "!stats TAG PLATFORM \nPLATFORM: battle, psn, xbl, acti",
      },
      fields: [
        {
          name: "Tid spilt",
          value:
            (player1.data.timePlayed / 3600).toFixed(1) +
            ` timer\n` +
            (player1.data.timePlayed / 86400).toFixed(1) +
            " dager",
        },
        {
          name: "Matcher",
          value:
            player1.data.gamesPlayed +
            ` ${Compare(player1.old.gamesPlayed, player1.data.gamesPlayed)}`,
          inline: true,
        },
        {
          name: "Wins",
          value:
            player1.data.wins +
            ` ${Compare(player1.old.wins, player1.data.wins)}`,
          inline: true,
        },
        {
          name: "W/L",
          value:
            ((player1.data.wins / player1.data.gamesPlayed) * 100).toFixed(3) +
            "%" +
            ` ${Compare(
              player1.old.wins / player1.old.gamesPlayed,
              player1.data.wins / player1.data.gamesPlayed,
              (p = true)
            )}`,
          inline: true,
        },
        {
          name: "Topp 5",
          value: player1.data.topFive,
          inline: true,
        },
        {
          name: "Topp 10",
          value: player1.data.topTen,
          inline: true,
        },
        {
          name: "Topp 25",
          value: player1.data.topTwentyFive,
          inline: true,
        },
        {
          name: "Kills",
          value:
            player1.data.kills +
            ` ${Compare(player1.old.kills, player1.data.kills)}`,
          inline: true,
        },
        {
          name: "Deaths",
          value: player1.data.deaths,
          inline: true,
        },
        {
          name: "K/D",
          value:
            player1.data.kdRatio.toFixed(3) +
            ` ${Compare(
              player1.old.kdRatio,
              player1.data.kdRatio,
              (p = false),
              (f = true)
            )}`,
          inline: true,
        },
        {
          name: "Kills/game",
          value: (player1.data.kills / player1.data.gamesPlayed).toFixed(3),
          inline: true,
        },
        {
          name: "Revives",
          value: player1.data.revives,
          inline: true,
        },
      ],
    };
  } else {
    console.log(player1.data);
    console.log(player2.data);
    return {
      color: Colors[Math.floor(Math.random() * colors.length)],
      title:
        player1.tag +
        ", " +
        DisplayPlatform(player1.platform) +
        " | " +
        player2.tag +
        ", " +
        DisplayPlatform(player2.platform),
      description: "Warzone stats for kule gutter",
      footer: {
        text: "!stats TAG PLATFORM\n!compare TAG1 PLATFORM1 TAG2 PLATFORM2\nPLATFORM: battle, psn, xbl, acti",
      },
      fields: [
        {
          name: "Tid spilt",
          value:
            (player1.data.timePlayed / 3600).toFixed(1) +
            " timer" +
            " | " +
            (player2.data.timePlayed / 3600).toFixed(1) +
            " timer",
        },
        {
          name: "Matcher",
          value: player1.data.gamesPlayed + " | " + player2.data.gamesPlayed,
          inline: true,
        },
        {
          name: "Wins",
          value: player1.data.wins + " | " + player2.data.wins,
          inline: true,
        },
        {
          name: "W/L",
          value:
            ((player1.data.wins / player1.data.gamesPlayed) * 100).toFixed(3) +
            "%" +
            " | " +
            ((player2.data.wins / player2.data.gamesPlayed) * 100).toFixed(3) +
            "%",
          inline: true,
        },
        {
          name: "Kills/game",
          value:
            (player1.data.kills / player1.data.gamesPlayed).toFixed(2) +
            " | " +
            (player2.data.kills / player2.data.gamesPlayed).toFixed(2),
          inline: true,
        },
        {
          name: "Topp 10",
          value: player1.data.topTen + " | " + player2.data.topTen,
          inline: true,
        },
        {
          name: "Topp 5",
          value: player1.data.topFive + " | " + player2.data.topFive,
          inline: true,
        },
        {
          name: "Kills",
          value: player1.data.kills + " | " + player2.data.kills,
          inline: true,
        },
        {
          name: "Deaths",
          value: player1.data.deaths + " | " + player2.data.deaths,
          inline: true,
        },
        {
          name: "K/D",
          value:
            player1.data.kdRatio.toFixed(3) +
            " | " +
            player2.data.kdRatio.toFixed(3),
          inline: true,
        },
      ],
    };
  }
};
