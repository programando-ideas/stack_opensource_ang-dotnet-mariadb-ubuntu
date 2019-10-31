const mariadb = require('./_db');

async function getAnios() {
    try {
        let conn = await mariadb.getConn();

        const rows = await conn.query("SELECT * FROM Anio ORDER BY nombre;");

        conn.release();

        return rows;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
}

async function getMarcas() {
    try {
        let conn = await mariadb.getConn();

        const rows = await conn.query("SELECT * FROM Marca ORDER BY nombre;");

        conn.release();

        return rows;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
}

async function getModelos(idmarca, idanio) {
    try {
        let conn = await mariadb.getConn();

        const rows = await conn.query(`SELECT * FROM Modelo 
                                       WHERE idMarca = ? AND idAnio = ? 
                                       ORDER BY nombre;`, [idmarca, idanio]);

        conn.release();

        return rows;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
}

async function getVersiones(idmodelo) {
    try {
        let conn = await mariadb.getConn();

        const rows = await conn.query(`SELECT * FROM Version 
                                       WHERE idModelo = ? 
                                       ORDER BY nombre;`, [idmodelo]);

        conn.release();

        return rows;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
}

module.exports = { getAnios, getMarcas, getModelos, getVersiones };