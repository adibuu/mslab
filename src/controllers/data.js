const Data = require("../models/data");

exports.addData = async (req, res, next) => {
  try {
    const data = req.body;

    for (let document of data) {
      const documentToSave = new Data(document);

      await documentToSave.save();
    }

    return res.status(200).send();
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};
