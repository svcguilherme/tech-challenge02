import express from 'express';
import authenticateJWT from '../middleWare/authMiddleware.js';
import { authorizeRoles } from '../middleWare/authMiddleware.js';
import AulaController from '../controllers/aulaController.js';

const routes = express.Router();

routes.get('/aulas', AulaController.listarAulas);
routes.get('/aulas/:id', AulaController.buscarAulaPorId);
routes.post(
  '/aulas',
  authenticateJWT,
  authorizeRoles('Professor'),
  AulaController.postarAula,
);
routes.put(
  '/aulas/:id',
  authenticateJWT,
  authorizeRoles('Professor'),
  AulaController.editarAula,
);
routes.delete(
  '/aulas/:id',
  authenticateJWT,
  authorizeRoles('Professor'),
  AulaController.excluirAula,
);

export default routes;
