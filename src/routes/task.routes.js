const { Router } = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controllers");

// Creamos el router
const router = Router();

// Creamos las rutas
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:taskId", getTaskById);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

// Exportamos el router
module.exports = router;
