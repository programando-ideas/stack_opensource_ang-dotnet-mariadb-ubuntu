USE  DbStockVehiculos;

/* MARCAS */
INSERT INTO Marca (id,nombre) VALUES (1,'Ford'),(2,'Volkswagen'),(3,'Nissan');

/* AÑO */
INSERT INTO Anio (id, Nombre) VALUES(1, 2017), (2, 2018), (3, 2019);

/* MODELOS */
INSERT INTO Modelo (id, idMarca, idAnio, nombre) VALUES
	(1, 1, 3, 'Eco Sport'),
	(2, 1, 2, 'Focus'),
	(3, 1, 2, 'Lobo'),
	(4, 2, 1, 'Gol'),
	(5, 2, 3, 'Vento'),
	(6, 2, 3, 'Jetta Nuevo'),
	(7, 3, 1, 'Altima'),
	(8, 3, 2, 'March (2018)'),
	(9, 3, 3, 'March (2019)');
	
/* VERSIONES */
INSERT INTO Version (id, idModelo, nombre) VALUES
	(1, 1, 'Trend L3/1.5 Man'),
	(2, 2, 'SE L4/2.0 Man'),
	(3, 2, 'SE L4/2.0 Aut'),
	(4, 3, 'Lariat Doble V6/3.5 Aut 4x4'),
	(5, 4, 'Sedán Trendline L4/1.6 Man'),
	(6, 5, 'Starline L4/1.6 Man'),
	(7, 5, 'Confortline L4/1.6 Aut'),
	(8, 6, 'R-Line L4/1.4/T Man'),
	(9, 7, 'Sense L4/2.5 Aut'),
	(10, 8, 'Advance L4/1.6 Man'),
	(11, 8, 'Advance Duo L4/1.6 Man');
	
/* Carga inicial del Stock de Vehiculos */
INSERT INTO VehiculosStock (idVersion, comentarios, cantidad)
SELECT v.id as idVersion, '' as comentarios, 0 as cantidad
FROM Version v;
