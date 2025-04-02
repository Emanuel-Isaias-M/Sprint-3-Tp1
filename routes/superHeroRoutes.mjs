import express from "express";
import {
  obtenerTodosLosSuperheroesController,
  insertNewSuperheroController,
  updateSuperheroController,
  deleteSuperheroeByIdController,
  deleteSuperheroeByNameController,
} from '../controllers/superheroesController.mjs';

const router = express.Router();


router.get("/heroes", obtenerTodosLosSuperheroesController);


router.post("/heroes", insertNewSuperheroController);
router.put("/heroes/id/:id", updateSuperheroController);
router.delete("/heroes/id/:id", deleteSuperheroeByIdController);
router.delete("/heroes/name/:nombre", deleteSuperheroeByNameController)

export default router;
