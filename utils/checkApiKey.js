const crypto = require("node:crypto");

const API_KEY = process.env.API_KEY;
function checkApiKey(apiKey) {
  if (!apiKey || typeof apiKey !== "string") return;
  const hash = crypto.createHash("sha512");
  if (
    crypto.timingSafeEqual(
      hash.copy().update(apiKey).digest(),
      hash.copy().update(API_KEY).digest()
    )
  ) {
    // Authorize access
    return true;
  }
  return false;
}

module.exports = checkApiKey;
