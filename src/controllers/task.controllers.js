// Importamos el modelo
const Task = require("../model/Task");

// Creamos el controlador para crear una tarea
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });
  const taskSaved = await newTask.save();
  res.status(201).json(taskSaved);
};

// Creamos el controlador para obtener todas las tareas
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Creamos el controlador para obtener una tarea por id
const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.taskId);
  res.status(200).json(task);
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
  res.status(200).json(updatedTask);
};

// Creamos el controlador para eliminar una tarea
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await Task.findByIdAndDelete(taskId);
  res.status(204).send();
};

// Exportamos los controladores
module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
