import jwt from 'jsonwebtoken'

export const generarJWT = (_id, nombre)=>{
    return new Promise((resolve, reject) => {
        const payload = { _id, nombre }
        jwt.sign(
          payload,
          process.env.SECRET_JWT,
          {
            expiresIn: '3h',
          },
          (err, token) => {
            if (err) {
              console.log(err)
              reject('No se pudo generar el token')
            }
            resolve(token)
          },
        )
      })
}