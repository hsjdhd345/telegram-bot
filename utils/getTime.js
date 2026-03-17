function getTime() {
  return new Date().toLocaleTimeString("en-NG", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

module.exports = getTime;