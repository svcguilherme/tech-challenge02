import express from 'express';
import authenticateJWT from '../middleWare/authMiddleware.js';
import { authorizeRoles } from '../middleWare/authMiddleware.js';
import UsuarioController from '../controllers/usuarioController.js';

const routes = express.Router();

routes.post('/login', UsuarioController.loginUsuario);
routes.get(
  '/usuarios',
  authenticateJWT,
  authorizeRoles('Professor'),
  UsuarioController.listarUsuarios,
);
routes.post('/usuarios', UsuarioController.criarUsuario);
routes.put('/usuarios/:id', UsuarioController.editarUsuario);
routes.delete('/usuarios/:id', UsuarioController.excluirUsuario);

export default routes;
