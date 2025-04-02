import Superhero from "../models/SuperHero.mjs";
import IRepository from "../repositories/IRepository.mjs";

class SuperheroeRepository extends IRepository {
  
  async obtenerTodos() {
    return await Superhero.find({});
  };

  async insertSuperheroe(nuevoSuperheroe) {
    const { nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes,
      aliados,
      enemigos,
      creador
    } = nuevoSuperheroe;
  
    const newSpuerheroe = new Superhero({
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes,
      aliados,
      enemigos,
      creador
    });
  
    const savedSuperheroe = await newSpuerheroe.save();
    return savedSuperheroe;
  };

  async updateSuperheroe(idSuperheroe, superheroeActualizado) {
    const updateSuperheroeNew = await Superhero.findByIdAndUpdate(idSuperheroe, superheroeActualizado, {
      new: true,
    });
    if (!updateSuperheroeNew) return res.status(404).json({ message: "Superhero no found" });
    return updateSuperheroeNew
  };

  async deleteSuperheroeById(id) {
    const deleteSuperheroeId = await Superhero.findByIdAndDelete(id);
    if (!deleteSuperheroeId) return res.status(404).json({ message: "Superhero no found" });
    // return res.sendStatus(204);
    return deleteSuperheroeId;
  };

  async deleteSuperheroeByName(nombre) {
    const deleteSuperheroeName = await Superhero.findOneAndDelete({ nombreSuperHeroe: nombre });
    if (!deleteSuperheroeName) return res.status(404).json({ message: "Superhero no found" });
    // return res.sendStatus(204);
    return deleteSuperheroeName;
  };
}

export default new SuperheroeRepository();