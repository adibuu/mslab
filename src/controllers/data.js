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

exports.getData = async (req, res, next) => {
  try {
    const data = await Data.find(
      {},
      {
        _id: 0,
        ml: 1,
        surname: 1,
      }
    );

    return res.status(200).send(data);
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};

exports.calculateLks = async (req, res, next) => {
  try {
    const date = req.body.date;
    const ml = req.body.ml;

    const data = await Data.find({
      ml: ml,
      $or: [
        {
          date: {
            $lt: date,
          },
        },
        {
          date: date,
        },
      ],
    })
      .sort("-date")
      .limit(6)
      .exec();

    const sumLKS = data?.reduce((acc, data) => {
      return acc + data.lks;
    }, 0);

    const avarage = sumLKS / 6;

    return res.status(200).send({ avarage });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};

exports.calculateOld = async (req, res, next) => {
  try {
    const date = req.body.date;
    const ml = req.body.ml;

    const data = await Data.find({
      ml: ml,
      $or: [
        {
          date: {
            $lt: date,
          },
        },
        {
          date: date,
        },
      ],
    })
      .sort("-date")
      .limit(4)
      .exec();

    const sumOld = data?.reduce((acc, data) => {
      return acc + data.old;
    }, 0);

    const avarage = sumOld / 4;

    return res.status(200).send({ avarage });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};
