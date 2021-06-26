module.exports = (platform) => {
  if (platform != "battle" && platform != "acti" && platform != "steam") {
    return "konsoll";
  } else {
    return "PC";
  }
};
