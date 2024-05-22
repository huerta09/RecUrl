const Url = require('../models/Url');
const validUrl = require('valid-url');

exports.home = (req, res) => {
    res.render('index');
};

exports.agregarUrl = async (req, res) => {
    let respuesta;
    const { urlOriginal } = req.body;

    // Validar la URL
    let isValidUrl = validUrl.isWebUri(urlOriginal) || validUrl.isWebUri('http://' + urlOriginal);

    if (!isValidUrl) {
        respuesta = {
            codigo: 400,
            mensaje: 'URL inválida. Por favor, ingrese una URL válida.'
        };
        return res.json(respuesta);
    }

    const url = new Url({ urlOriginal });

    try {
        let resultado = await url.save();
        respuesta = {
            codigo: 201,
            mensaje: 'Almacenado Correctamente',
            url: resultado.urlCorta
        };
    } catch (error) {
        console.log(error);
        respuesta = {
            codigo: 400,
            error: 'Hubo un error'
        };
    }
    res.json(respuesta);
};

// Cuando el usuario visita la URL corta
exports.redireccionarUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ urlCorta: req.params.url });

        if (!url) {
            return res.redirect('/?error=404');
        }

        res.redirect(url.urlOriginal);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
};
