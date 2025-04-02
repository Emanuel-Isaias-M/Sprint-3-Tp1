import {
  obtenerTodosLosSuperheroes,
  insertNewSuperheroe,
  updateSuperheroe,
  deleteSuperheroeById,
  deleteSuperheroeByName
} from "../services/superheroesService.mjs";

import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";

export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    res.status(200).json(renderizarListaSuperheroes(superheroes));
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los superhéroes",
      error: error.message,
    });
  }
}

export async function insertNewSuperheroController(req, res) {
  try {
    const nuevoSuperheroe = req.body;

    if (!nuevoSuperheroe.nombreSuperHeroe || !nuevoSuperheroe.nombreReal) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios: nombreSuperHeroe y nombreReal",
      });
    }

    const superheroeGuardado = await insertNewSuperheroe(nuevoSuperheroe);
    if (!superheroeGuardado) {
      return res.status(500).send({
        mensaje: "No se pudo grabar el nuevo superhéroe",
      });
    }

    res.status(201).json(renderizarSuperheroe(superheroeGuardado));
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al insertar el nuevo superhéroe",
      error: error.message,
    });
  }
}

export async function updateSuperheroController(req, res) {
  try {
    const { id } = req.params;
    const superheroeActualizado = req.body;

    if (!superheroeActualizado || Object.keys(superheroeActualizado).length === 0) {
      return res.status(400).send({
        mensaje: "No hay datos para actualizar",
      });
    }

    const superheroeModificado = await updateSuperheroe(id, superheroeActualizado);
    if (!superheroeModificado) {
      return res.status(404).send({ mensaje: "Superhéroe no encontrado o no actualizado" });
    }

    res.status(200).json(renderizarSuperheroe(superheroeModificado));
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al actualizar el superhéroe",
      error: error.message,
    });
  }
}

export async function deleteSuperheroeByIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await deleteSuperheroeById(id);

    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }

    res.status(200).json(renderizarSuperheroe(superheroe));
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar el superhéroe",
      error: error.message,
    });
  }
}

export async function deleteSuperheroeByNameController(req, res) {
  try {
    const { nombre } = req.params;
    const superheroe = await deleteSuperheroeByName(nombre);

    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }

    res.status(200).json(renderizarSuperheroe(superheroe));
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar el superhéroe por nombre",
      error: error.message,
    });
  }
}