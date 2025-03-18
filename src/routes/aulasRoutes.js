import express from "express";
import AulaController from "../controllers/aulaController.js";

const routes = express.Router();

routes.get("/aulas", AulaController.listarAulas);
routes.get("/aulas/:id", AulaController.buscarAulaPorId);
routes.post("/aulas", AulaController.postarAula);
routes.put("/aulas/:id", AulaController.editarAula);
routes.delete("/aulas/:id", AulaController.excluirAula);

export default routes;