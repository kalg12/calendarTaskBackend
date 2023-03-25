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
});

module.exports = model("Task", TaskSchema);
