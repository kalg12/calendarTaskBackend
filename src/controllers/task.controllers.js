// Importamos el modelo
const Task = require("../model/Task");
const moment = require("moment-timezone");

// Creamos el controlador para crear una tarea
const createTask = async (req, res) => {
  const {
    title,
    description,
    eventDay,
    startTime,
    endTime,
    expectedAssistance,
  } = req.body;
  if (
    !title ||
    !description ||
    !eventDay ||
    !startTime ||
    !endTime ||
    !expectedAssistance
  ) {
    // Si no se envían todos los datos, devuelve un mensaje de error
    return res.status(400).json({ message: "All fields are required" });
  }
  const newTask = new Task({
    title,
    description,
    eventDay: moment(eventDay, "DD-MM-YYYY").tz("America/Mexico_City").format(),
    startTime: moment(startTime, "HH:mm").tz("America/Mexico_City").format(),
    endTime: moment(endTime, "HH:mm").tz("America/Mexico_City").format(),
    expectedAssistance,
  });
  const taskSaved = await newTask.save();
  // Si todo sale bien, devuelve una respuesta con estado 201 y la tarea guardada
  res.status(201).json({
    message: "Task created successfully",
    taskSaved,
  });
};

// Creamos el controlador para obtener todas las tareas
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(
    tasks.map((task) => {
      return {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        eventDay: moment(task.eventDay)
          .tz("America/Mexico_City")
          .format("DD-MM-YYYY"),
        startTime: moment(task.startTime)
          .tz("America/Mexico_City")
          .format("HH:mm"),
        endTime: moment(task.endTime).tz("America/Mexico_City").format("HH:mm"),
        createdAt: moment(task.createdAt)
          .tz("America/Mexico_City")
          .format("DD-MM-YYYY HH:mm:ss"),
        expectedAssistance: task.expectedAssistance,
      };
    })
  );
};

// Creamos el controlador para obtener una tarea por id
const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.taskId);
  res.status(200).json({
    message: "Task found successfully",
    //Damos los detalles de la tarea
    task: {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      eventDay: moment(task.eventDay)
        .tz("America/Mexico_City")
        .format("DD-MM-YYYY"),
      startTime: moment(task.startTime)
        .tz("America/Mexico_City")
        .format("HH:mm"),
      endTime: moment(task.endTime).tz("America/Mexico_City").format("HH:mm"),
      createdAt: moment(task.createdAt)
        .tz("America/Mexico_City")
        .format("DD-MM-YYYY HH:mm:ss"),
      expectedAssistance: task.expectedAssistance,
    },
  });
};

// Creamos el controlador para actualizar una tarea
const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const { taskId } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description },
    { new: true }
  );
  res.status(200).json({
    message: "Task updated successfully",
    updatedTask,
  });
};

// Creamos el controlador para eliminar una tarea
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const taskToDelete = await Task.findById(taskId);
  if (!taskToDelete) {
    // Si el ID de la tarea no existe, devuelve un mensaje de error
    return res.status(404).json({ message: "Task not found" });
  }
  await Task.findByIdAndDelete(taskId);
  // Si la tarea se eliminó correctamente, devuelve un mensaje de éxito
  res.status(204).json({
    status: 204,
    message: "Task deleted successfully",
  });
};

// Exportamos los controladores
module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
