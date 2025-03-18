import aula from "../models/Aula.js"; 
import { usuario } from "../models/Usuario.js";

class AulaController {

    static async listarAulas (req, res) {
        try {
            const listaAulas = await aula.find({});
            res.status(200).json(listaAulas);            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição.` });
        }
    };

    static async buscarAulaPorId (req, res) {
        try {
            const id = req.params.id;
            const aulaEncontrada = await aula.findById(id);
            res.status(200).json(aulaEncontrada);            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição da aula.` });
        }
    };

    static async postarAula (req, res) {
        const novaAula = req.body;
        try {
            const usuarioEncontrado = await usuario.findById(novaAula.autor);
            const aulaCompleta = { ...novaAula, autor: { ...usuarioEncontrado._doc }};
            const aulaCriada = await aula.create(aulaCompleta);
            res.status(201).json({ message: "Aula postada!", aula: aulaCriada });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao postar aula.` });
        }
    }
    
    static async editarAula (req, res) {
        try {
            const id = req.params.id;
            await aula.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Aula atualizada!"});            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao editar a aula.` });
        }
    };

    static async excluirAula (req, res) {
        try {
            const id = req.params.id;
            await aula.findByIdAndDelete(id);
            res.status(200).json({ message: "Aula excluída!"});            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao excluir a aula.` });
        }
    };
};

export default AulaController;
