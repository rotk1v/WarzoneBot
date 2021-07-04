module.exports = (old, fresh, p, f) => {
  if (p) {
    if (!old || !fresh) return "";
    if (old < fresh && fresh - old > parseFloat("0.0009")) {
      return `[+${(fresh - old).toFixed(3)}%]`;
    }
    if (old > fresh && fresh - old > parseFloat("0.0009")) {
      console.log(fresh - old);
      return `[${(fresh - old).toFixed(3)}%]`;
    }
    if (old == fresh) return "";
    return "";
  }
  if (f) {
    if (old == undefined || fresh == undefined) return "";
    if (old < fresh && fresh - old > parseFloat("0.0009"))
      return `[+${(fresh - old).toFixed(3)}]`;
    if (old > fresh && fresh - old > parseFloat("0.0009"))
      return `[${(fresh - old).toFixed(3)}]`;
    if (old == fresh) return "";
    return "";
  }
  if (old == undefined || fresh == undefined) return "";
  if (old < fresh && fresh - old > parseFloat("0.0009"))
    return `[+${fresh - old}]`;
  if (old > fresh && fresh - old > parseFloat("0.0009"))
    return `[${fresh - old}]`;
  if (old == fresh) return "";
  return "";
};
