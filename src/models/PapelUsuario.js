import mongoose from "mongoose";

const papelUsuarioSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId },
    papel: { type: String, required: true },
}, { versionKey: false });

const papelUsuario = mongoose.model("papeis", papelUsuarioSchema);

export { papelUsuario, papelUsuarioSchema };