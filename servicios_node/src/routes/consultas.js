var express = require('express');
var consultaDb = require('../database/consultas');
var router = express.Router();

router.get('/anios', async function(req, res, next) {
    var anios = await consultaDb.getAnios();

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(anios, null, 4));
});

router.get('/marcas', async function(req, res, next) {
    var marcas = await consultaDb.getMarcas();

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(marcas, null, 4));
});

//ruta: modelos/{idmarca}/{idanio}
router.get('/modelos/:idmarca/:idanio', async function(req, res, next) {
    const idMarca = req.params.idmarca;
    const idAnio = req.params.idanio;

    var modelos = await consultaDb.getModelos(idMarca, idAnio);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(modelos, null, 4));
});

//ruta: versiones/{idmodelo}
router.get('/versiones/:idmodelo', async function(req, res, next) {
    const idModelo = req.params.idmodelo;

    var versiones = await consultaDb.getVersiones(idModelo);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(versiones, null, 4));
});

module.exports = router;