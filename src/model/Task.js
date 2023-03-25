const { Schema, model } = require("mongoose");

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
    default: Date.now,
  },
  eventDay: {
    type: String,
    required: [true, "Añadir la fecha del evento es obligatorio"],
  },
  expectedAssistance: {
    type: Number,
    required: [true, "Añadir la cantidad de asistentes es obligatorio"],
  },
  startTime: {
    type: Date,
    required: [true, "Añadir la hora de inicio es obligatorio"],
  },
  endTime: {
    type: Date,
    required: [true, "Añadir la hora de fin es obligatorio"],
  },
});

module.exports = model("Task", TaskSchema);
