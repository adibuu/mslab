const { ValidationError } = require("adminjs");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../../models/user");

const after = async (response) => {
  if (response.record && response.record.errors)
    response.record.errors.password = response.record.errors.encryptedPassword;

  return response;
};

const before = async (request) => {
  if (request.payload.password) {
    if (!validator.isStrongPassword(request.payload.password)) {
      throw new ValidationError({
        password: {
          message:
            "Hasło musi zawierać co najmniej osiem znaków, co najmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.",
        },
      });
    }

    const loginExists = await User.findOne({ login: request.payload.login });

    if (loginExists) {
      throw new ValidationError({
        login: {
          message: "Ten login jest już zajęty!",
        },
      });
    }

    request.payload = {
      ...request.payload,
      encryptedPassword: await bcrypt.hash(request.payload.password, 12),
      password: undefined,
    };
  }

  return request;
};

module.exports = { after, before };
