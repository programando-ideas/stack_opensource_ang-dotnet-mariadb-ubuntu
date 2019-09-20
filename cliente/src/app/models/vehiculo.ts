import { Anio } from './anio';
import { Modelo } from './modelo';
import { Marca } from './marca';
import { Version } from './version';

export interface Vehiculo {
    id: number;
    cantidad: number;

    anio: Anio;
    modelo: Modelo;
    marca: Marca;
    version: Version;
}
