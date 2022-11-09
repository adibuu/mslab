const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
});
