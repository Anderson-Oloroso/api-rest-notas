import mongoose from 'mongoose';
const notaSchema = new mongoose.Schema({
    titulo: { type: String, require: true },
    contenido: { type: String, require: true },
    categoria: { type: String, enum: ['calse', 'tarea', 'idea'] , require: true }
}, { timestamps: true });

export const Nota = mongoose.model('Nota', notaSchema);