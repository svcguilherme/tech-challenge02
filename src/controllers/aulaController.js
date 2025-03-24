import aula from '../models/Aula.js';
import { usuario } from '../models/Usuario.js';

class AulaController {
  static async listarAulas(req, res) {
    try {
      const listaAulas = await aula
        .find()
        .select('titulo disciplina autor.nome');
      res.status(200).json(listaAulas);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição.` });
    }
  }

  static async buscarAulaPorId(req, res) {
    try {
      const id = req.params.id;
      const aulaEncontrada = await aula
      .findById(id)
      .select('titulo disciplina conteudo autor.nome');
      res.status(200).json(aulaEncontrada);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição da aula.` });
    }
  }

  static async postarAula(req, res) {
    const novaAula = req.body;
    try {
      const usuarioEncontrado = await usuario.findById(novaAula.autor);

      if (!usuarioEncontrado) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const aulaCompleta = {
        ...novaAula,
        autor: { ...usuarioEncontrado._doc },
      };

      const aulaCriada = await aula.create(aulaCompleta);
      res.status(201).json({ message: 'Aula postada!', aula: aulaCriada });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao postar aula.` });
    }
  }

  static async editarAula(req, res) {
    try {
      const id = req.params.id;
      await aula.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Aula atualizada!' });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao editar a aula.` });
    }
  }

  static async excluirAula(req, res) {
    try {
      const id = req.params.id;
      await aula.findByIdAndDelete(id);
      res.status(200).json({ message: 'Aula excluída!' });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao excluir a aula.` });
    }
  }

  static async buscarAulaPorPalavraChave(req, res) {
    const termoDeBusca = req.query.termo;
    try {
      const aulasPorTermo = await aula.find({
        $or: [
          { titulo: { $regex: termoDeBusca, $options: 'i' } }, // Busca no título (case-insensitive)
          { conteudo: { $regex: termoDeBusca, $options: 'i' } }, // Busca no conteúdo (case-insensitive)
          { disciplina: { $regex: termoDeBusca, $options: 'i' } }, // Busca no conteúdo (case-insensitive)
        ],
      });
      res.status(200).json(aulasPorTermo);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao buscar aula.` });
    }
  }

  static async listarAulasPaginaPrincipal(req, res) {
    try {
      const { limite = 5, pagina = 1 } = req.query;

      const listaAulas = await aula
        .find()
        .sort({ _id: -1 })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .select('titulo disciplina autor.nome');

      res.status(200).json(listaAulas);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na requisição.` });
    }
  }
}

export default AulaController;
