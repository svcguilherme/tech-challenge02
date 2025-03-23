import express from 'express';
import authenticateJWT from '../middleWare/authMiddleware.js';
import { authorizeRoles } from '../middleWare/authMiddleware.js';
import AulaController from '../controllers/aulaController.js';

const routes = express.Router();

routes.get(
  '/aulas',
  authenticateJWT,
  authorizeRoles('Professor', 'Aluno'),
  AulaController.listarAulas,
);

routes.get(
  '/aulas/principal',
  authenticateJWT,
  authorizeRoles('Professor', 'Aluno'),
  AulaController.listarAulasPaginaPrincipal,
);

routes.get(
  '/aulas/busca',
  authenticateJWT,
  authorizeRoles('Professor', 'Aluno'),
  AulaController.buscarAulaPorPalavraChave,
);

routes.get(
  '/aulas/:id',
  authenticateJWT,
  authorizeRoles('Professor', 'Aluno'),
  AulaController.buscarAulaPorId,
);

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
