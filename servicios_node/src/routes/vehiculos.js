var express = require('express');
var vehiculosDb = require('../database/vehiculos');
var router = express.Router();

//ruta: obtenervechiculos/{fversion}/{fmodelo}/{fanio}/{fmarca}
router.get('/obtenervechiculos/:fversion/:fmodelo/:fanio/:fmarca', async function (req, res, next) {
    const idversion = req.params.fversion;
    const idmodelo = req.params.fmodelo;
    const idanio = req.params.fanio;
    const idmarca = req.params.fmarca;

    var vehiculos = await vehiculosDb.getVehiculos(idversion, idmodelo, idmarca, idanio);

    var vehiculoJSON = [];
    vehiculos.forEach(function (ve, index, arr) {
        vehiculoJSON.push(
            {
                id: ve.VS_Id,
                comentarios: ve.VS_Comentarios,
                cantidad: ve.VS_Cantidad,
                version:
                {
                    id: ve.V_Id,
                    nombre: ve.V_Nombre
                },
                modelo: {
                    id: ve.M_Id,
                    nombre: ve.M_Nombre
                },
                marca: {
                    id: ve.MA_Id,
                    nombre: ve.MA_Nombre
                },
                anio: {
                    id: ve.A_Id,
                    nombre: ve.A_Nombre
                }
            });
    });

    //console.log(vehiculoJSON);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(vehiculoJSON, null, 4));
});

router.post('/ingresar', async function (req, res, next) {
    var vehiculo = req.body;
    if (!vehiculo)
        return res.status(500).send('Los datos del vehículo son incorrectos.');

    //Verifica si el vehiculo existe
    var vexiste = await vehiculosDb.getVehiculo(vehiculo.Id);
    if (!vexiste)
        return res.status(500).send('El vehículo ' + vehiculo.Id + ' no está disponible');

    vexiste.cantidad++;

    await vehiculosDb.update(vexiste);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(vexiste, null, 4));
});

router.post('/vender', async function (req, res, next) {
    var vehiculo = req.body;
    if (!vehiculo)
        return res.status(500).send('Los datos del vehículo son incorrectos.');

    //Verifica si el vehiculo existe
    var vexiste = await vehiculosDb.getVehiculo(vehiculo.Id);
    if (!vexiste)
        return res.status(500).send('El vehículo ' + vehiculo.Id + ' no está disponible');

    if (vexiste.Cantidad == 0)
        return Ok(vexiste);

    vexiste.cantidad--;

    await vehiculosDb.update(vexiste);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(vexiste, null, 4));
});

module.exports = router;