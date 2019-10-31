const mariadb = require('./_db');

async function getVehiculos(idversion, idmodelo, idmarca, idanio) {
    try {
        let conn = await mariadb.getConn();

        const rows = await conn.query(`
            SELECT VS.Id AS VS_Id, VS.comentarios AS VS_Comentarios, VS.cantidad AS VS_Cantidad,
                   V.Id AS V_Id, V.nombre AS V_Nombre,
                   M.id AS M_Id, M.nombre AS M_Nombre,
                   MA.id AS MA_Id, MA.nombre AS MA_Nombre,  
                   A.id AS A_Id, A.nombre AS A_Nombre 
            FROM VehiculosStock VS 
            INNER JOIN Version V ON V.id = VS.idVersion 
            INNER JOIN Modelo M ON M.id = V.idModelo 
            INNER JOIN Marca MA ON MA.id = M.idMarca 
            INNER JOIN Anio A ON A.id = M.idAnio 
            WHERE (? = 0 OR (V.id - ? = 0)) AND 
                  (? = 0 OR (M.id - ? = 0)) AND 
                  (? = 0 OR (MA.id - ? = 0)) AND 
                  (? = 0 OR (A.id - ? = 0));`,
            [idversion, idversion, idmodelo, idmodelo, idmarca, idmarca, idanio, idanio]);

        conn.release();

        return rows;
    }
    catch (err) {
        console.log(err);
    }
}

async function getVehiculo(id) {
    try {
        let conn = await mariadb.getConn();

        const rows = await conn.query(`SELECT * FROM VehiculosStock 
                                       WHERE id = ?;`, [id]);

        conn.release();

        if (rows.length == 1)
            return rows[0];
        else
            return null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function update(vehiculo) {
    try {
        let conn = await mariadb.getConn();
        console.log('Se actualiza vechiculo: ', vehiculo);
        const rows = await conn.query(`UPDATE VehiculosStock
                                       SET cantidad = ?
                                       WHERE id = ?;`, [vehiculo.cantidad, vehiculo.id]);

        conn.release();

        return rows;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { getVehiculos, getVehiculo, update }