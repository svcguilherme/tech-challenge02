import { papelUsuario } from '../models/PapelUsuario.js';
import { generateToken } from '../middleWare/authMiddleware.js';
import { usuario, usuarioSchema } from '../models/Usuario.js';

class UsuarioController {
  static async loginUsuario(req, res) {
    const { nome, password } = req.body;

    try {
      const user = await usuario.findOne({ nome });
      if (!user) return res.status(400).json({ error: 'Invalid username' });
      const isMatch = password == user.password;
      if (!isMatch)
        return res
          .status(400)
          .json({ error: 'Invalid password ' + user.password });

      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Login error' + error, error });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      const listaUsuarios = await usuario.find({});
      res.status(200).json(listaUsuarios);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição.` });
    }
  }

  static async criarUsuario(req, res) {
    const novoUsuario = req.body;
    try {
      const papelEncontrado = await papelUsuario.findById(novoUsuario.role);
      const usuarioCompleto = {
        ...novoUsuario,
        role: { ...papelEncontrado._doc },
      };
      const usuarioCriado = await usuario.create(usuarioCompleto);
      res
        .status(201)
        .json({ message: 'Usuário criado!', usuario: usuarioCriado });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao criar usuário.` });
    }
  }

  static async editarUsuario(req, res) {
    try {
      const id = req.params.id;
      await usuario.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Usuário atualizado!' });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao editar usuário.` });
    }
  }

  static async excluirUsuario(req, res) {
    try {
      const id = req.params.id;
      await usuario.findByIdAndDelete(id);
      res.status(200).json({ message: 'Usuário excluído!' });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao excluir usuário.` });
    }
  }
}

export default UsuarioController;
