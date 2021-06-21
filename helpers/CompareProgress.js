module.exports = (old, fresh, p, f) => {
  if (p) {
    if (old == undefined || fresh == undefined) return "";
    if (old < fresh) return `[+${(fresh - old).toFixed(3)}%]`;
    if (old > fresh) return `[${(fresh - old).toFixed(3)}%]`;
    if (old == fresh) return "";
  }
  if (f) {
    if (old == undefined || fresh == undefined) return "";
    if (old < fresh) return `[+${(fresh - old).toFixed(3)}]`;
    if (old > fresh) return `[${(fresh - old).toFixed(3)}]`;
    if (old == fresh) return "";
  }
  if (old == undefined || fresh == undefined) return "";
  if (old < fresh) return `[+${fresh - old}]`;
  if (old > fresh) return `[${fresh - old}]`;
  if (old == fresh) return "";
};
