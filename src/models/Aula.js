import mongoose from "mongoose";
import { usuarioSchema } from "./Usuario.js"

const aulaSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    disciplina: { type: String, required: true },
    data: { type: Date, default: Date.now, required: true },
    conteudo: { type: String, required: true },
    autor: usuarioSchema,
}, { versionKey: false });

const aula = mongoose.model("Aulas", aulaSchema);

export default aula;