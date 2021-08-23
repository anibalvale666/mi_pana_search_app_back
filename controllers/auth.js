const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const loginUsuario = async(req, res = response ) => {
    const { nick, password } = req.body;
    try {

        //contraseña encriptada solo para crear usuario
        // let usuario = new Usuario(req.body);
        // const salt = bcrypt.genSaltSync();
        // usuario.password = bcrypt.hashSync( password, salt );
    
        // await usuario.save();
    
        const usuario = await Usuario.findOne({nick});

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y contraseña son incorrectos'
            });
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y contraseña son incorrectos'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id, usuario.nick);


        res.status(200).json({
            ok: true,
            uid: usuario.id,
            nick: usuario.nick,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}


const revalidarToken = async(req, res = response) => {

    const {uid,nick} = req;
    
    const token = await generarJWT( uid, nick);

    res.json({
        ok: 'true',
        nick,
        token
    })
}


module.exports = {
    loginUsuario,
    revalidarToken,
}