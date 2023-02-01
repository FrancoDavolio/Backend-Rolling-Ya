import { Router} from "express";
import { check } from "express-validator";
import { crearUsuario, listarUsuarios, login } from "../controllers/usuarioController";

const usuarioRouter = Router()

usuarioRouter.route('/listar').get(listarUsuarios)

usuarioRouter.route('/').post(
    [
        check('email', 'Email no valido')
          .isEmail()
          .matches(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          ),
        check('contrasena', 'contraseña no valida')
          .isLength({
            min: 8,
            max: 15,
          })
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
          ),
      ],
      login
)

usuarioRouter.route('/nuevo').get(listarUsuarios).post(
    [
        check('nombre', 'El nombre es obligatorio')
          .not()
          .isEmpty()
          .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim)
          .withMessage('Debe ingresar un nombre de usaurio valido'),
        check('email', 'El email es obligatorio')
          .isEmail()
          .matches(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          )
          .withMessage('Por favor ponga un email valido'),
        check('contrasena', 'La contraseña es obligatoria')
          .isLength({
            min: 8,
            max: 15,
          })
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
          )
          .withMessage(
            'Siga estas intrucciones: Minimo 8 caracteres, Maximo 15, Al menos una letra mayúscula, Al menos una letra minucula, Al menos un dígito, No espacios en blanco, Al menos 1 caracter especial',
          ),
      ],
      crearUsuario
)

export default usuarioRouter