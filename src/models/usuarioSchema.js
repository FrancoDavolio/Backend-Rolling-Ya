import mongoose, { Schema }  from "mongoose";

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
      },
      email: {
        type: String,
        minlength: 8,
        maxlength: 100,
        unique: true,
        required: true,
      },
      contrasena: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true,
      },
      perfil: {
        type: String,
      },
      estado: {
        type: String,
      }
})

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;