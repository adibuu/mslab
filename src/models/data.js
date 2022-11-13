const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  ml: {
    type: Number,
    required: [true, "Pole jest wymagane"],
  },
  pktSkp: {
    type: String,
  },
  dost: {
    type: String,
  },
  surname: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, "Pole jest wymagane"],
  },
  fat: {
    type: String,
  },
  protein: {
    type: String,
  },
  lactose: {
    type: String,
  },
  smb: {
    type: String,
  },
  lks: {
    type: Number,
    required: [true, "Pole jest wymagane"],
  },
  old: {
    type: Number,
    required: [true, "Pole jest wymagane"],
  },
  pzam: {
    type: String,
  },
  water: {
    type: String,
  },
  sh: {
    type: String,
  },
  pzam: {
    type: String,
  },
  urea: {
    type: String,
  },
  code: {
    type: String,
  },
  route: {
    type: String,
  },
  course: {
    type: String,
  },
  datapob: {
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
