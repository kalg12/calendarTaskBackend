const { Schema, model } = require("mongoose");
const moment = require("moment-timezone");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Añadir el título es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "Añadir la descripción es obligatorio"],
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: moment.tz("America/Mexico_City").toDate(),
  },
  eventDay: {
    type: Date,
    required: [true, "Añadir la fecha del evento es obligatorio"],
  },
});

module.exports = model("Task", TaskSchema);
