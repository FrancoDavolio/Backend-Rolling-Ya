import Usuario from '../models/usuarioSchema'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import { generarJWT } from '../helpers/jwt'

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
    res.status(200).json(usuarios)
  } catch (error) {
    console.lo(error)
    res.status(404).json({
      mensaje: 'Error al buscar los productos',
    })
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { email, contrasena } = req.body

    let usuario = await Usuario.findOne({ email })

    if (!usuario) {
      return req.status(400).json({
        mensaje: 'Correo o contraseña invalido - correo',
      })
    }

    const contrasenaValido = bcrypt.compareSync(contrasena, usuario.contrasena)

    if (!contrasenaValido) {
      return res.status(400).json({
        mensaje: 'Correo o contraseña invalido - contraseña',
      })
    }

    const token = await generarJWT(
      usuario._id,
      usuario.nombre,
      usuario.perfil,
      usuario.estado,
    )

    res.status(200).json({
      mensaje: 'El usuario existe',
      uid: usuario._id,
      nombre: usuario.nombre,
      perfil: usuario.perfil,
      estado: usuario.estado,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: 'email o contraseña invalido',
    })
  }
}

export const crearUsuario = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { email, contrasena } = req.body

    let usuario = await Usuario.findOne({ email })
    if (usuario) {
      return res.status(400).json({
        mensaje: 'ya existe un usuario con el correo enviado',
      })
    }

    usuario = new Usuario(req.body)

    const saltRounds = 15
    const salt = bcrypt.genSaltSync(saltRounds)
    usuario.contrasena = bcrypt.hashSync(contrasena, salt)

    await usuario.save()

    res.status(201).json({
      mensaje: 'usuario creado',
      nombre: usuario.nombre,
      perfil: usuario.perfil,
      estado: usuario.estado,
      uid: usuario._id,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: 'El usuario no pudo ser creado',
    })
  }
}
