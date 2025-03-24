import AulaController from './aulaController.js';
import aula from '../models/Aula.js';
import { usuario } from '../models/Usuario.js';

jest.mock('../models/Aula.js');
jest.mock('../models/Usuario.js');

describe('AulaController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, query: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('postarAula', () => {
    it('Deve criar e retornar uma nova aula com o nome do autor embedado!!!', async () => {
      req.body = { titulo: 'Nova Aula', autor: '456' };

      const mockUsuario = { _doc: { nome: 'João' } };
      const mockCreated = { titulo: 'Nova Aula', autor: mockUsuario._doc };

      usuario.findById.mockResolvedValue(mockUsuario);
      aula.create.mockResolvedValue(mockCreated);

      await AulaController.postarAula(req, res);

      expect(usuario.findById).toHaveBeenCalledWith('456');
      expect(aula.create).toHaveBeenCalledWith({
        titulo: 'Nova Aula',
        autor: { nome: 'João' },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Aula postada!',
        aula: mockCreated,
      });
    });

    it('Deve lidar com erros em postarAula', async () => {
      req.body = { titulo: 'Nova Aula', autor: '456' };
      usuario.findById.mockRejectedValue(new Error('Erro ao buscar usuário'));

      await AulaController.postarAula(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('Erro ao buscar usuário'),
      });
    });
  });

  describe('editarAula', () => {
    it('Deve lidar com erros em editarAula', async () => {
      req.params.id = '123';
      aula.findByIdAndUpdate.mockRejectedValue(new Error('Erro ao editar'));

      await AulaController.editarAula(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('Erro ao editar'),
      });
    });
  });

  describe('excluirAula', () => {
    it('Deve deletar uma aula pelo ID', async () => {
      req.params.id = '123';

      await AulaController.excluirAula(req, res);

      expect(aula.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Aula excluída!' });
    });

    it('Deve lidar com erros em excluirAula', async () => {
      req.params.id = '123';
      aula.findByIdAndDelete.mockRejectedValue(new Error('Erro ao excluir'));

      await AulaController.excluirAula(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('Erro ao excluir'),
      });
    });
  });

  describe('listarAulas', () => {
    it('Deve retornar uma lista de aulas', async () => {
      const mockAulas = [{ titulo: 'Aula 1' }, { titulo: 'Aula 2' }];
      const selectMock = jest.fn().mockResolvedValue(mockAulas);
      aula.find.mockReturnValue({ select: selectMock });

      await AulaController.listarAulas(req, res);

      expect(aula.find).toHaveBeenCalled();
      expect(selectMock).toHaveBeenCalledWith('titulo disciplina autor.nome');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAulas);
    });

    it('Deve lidar com erros em listarAulas', async () => {
      aula.find.mockImplementation(() => {
        throw new Error('DB error');
      });

      await AulaController.listarAulas(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('DB error'),
      });
    });
  });

  describe('buscarAulaPorId', () => {
    it('Deve retornar uma única aula pelo ID', async () => {
      const mockAula = { _id: '123', titulo: 'Aula Teste' };
      req.params.id = '123';
      aula.findById.mockResolvedValue(mockAula);

      await AulaController.buscarAulaPorId(req, res);

      expect(aula.findById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAula);
    });

    it('Deve lidar com erros em buscarAulaPorId', async () => {
      aula.findById.mockRejectedValue(new Error('Erro ao buscar'));

      await AulaController.buscarAulaPorId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('Erro ao buscar'),
      });
    });
  });

  describe('buscarAulaPorPalavraChave', () => {
    it('Deve buscar uma lista de aulas de acordo com uma palavra-chave', async () => {
      req.query.termo = 'matemática';
      const mockResult = [{ titulo: 'Aula de Matemática' }];

      aula.find.mockResolvedValue(mockResult);

      await AulaController.buscarAulaPorPalavraChave(req, res);

      expect(aula.find).toHaveBeenCalledWith({
        $or: [
          { titulo: { $regex: 'matemática', $options: 'i' } },
          { conteudo: { $regex: 'matemática', $options: 'i' } },
          { disciplina: { $regex: 'matemática', $options: 'i' } },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('Deve lidar com erros em buscarAulaPorPalavraChave', async () => {
      aula.find.mockRejectedValue(new Error('Erro de busca'));

      await AulaController.buscarAulaPorPalavraChave(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('Erro de busca'),
      });
    });
  });

  describe('listarAulasPaginaPrincipal', () => {
    it('Deve retornar uma lista de aulas limitada para a página principal', async () => {
      req.query = { limite: 2, pagina: 1 };
      const mockAulas = [{ titulo: 'A1' }, { titulo: 'A2' }];

      const selectMock = jest.fn().mockResolvedValue(mockAulas);
      const findMock = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: selectMock,
      };

      aula.find.mockReturnValue(findMock);

      await AulaController.listarAulasPaginaPrincipal(req, res);

      expect(aula.find).toHaveBeenCalled();
      expect(findMock.sort).toHaveBeenCalledWith({ _id: -1 });
      expect(findMock.skip).toHaveBeenCalledWith(0);
      expect(findMock.limit).toHaveBeenCalledWith(2);
      expect(selectMock).toHaveBeenCalledWith('titulo disciplina autor.nome');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAulas);
    });

    it('Deve lidar com erros em listarAulasPaginaPrincipal', async () => {
      aula.find.mockImplementation(() => {
        throw new Error('Erro na listagem');
      });

      await AulaController.listarAulasPaginaPrincipal(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining('Erro na listagem'),
      });
    });
  });
});
