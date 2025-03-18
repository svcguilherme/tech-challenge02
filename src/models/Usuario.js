import mongoose from 'mongoose';
import { papelUsuarioSchema } from './PapelUsuario.js';

const usuarioSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    password: { type: String, required: true },
    role: papelUsuarioSchema,
  },
  { versionKey: false },
);

const usuario = mongoose.model('usuarios', usuarioSchema);

export { usuario, usuarioSchema };
