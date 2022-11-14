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

exports.calculateLks = async (req, res, next) => {
  try {
    const { ml, date } = req.body;

    const data = await Data.find({
      ml: req.body.ml,
      $or: [
        {
          date: {
            $lt: req.body.date,
          },
        },
        {
          date: req.body.date,
        },
      ],
    })
      .sort("-date")
      .limit(6)
      .exec();

    return res.status(200).send(data);
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};

exports.calculateOld = async (req, res, next) => {
  try {
    const { ml, date } = req.body;

    return res.status(200).send();
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};
