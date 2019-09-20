import { VersionFiltro } from './versionFiltro';

export class VehiculoFiltro {
    Id: number;
    IdVersion: number;
    Comentarios: string;
    Cantidad: number;

    IdVersionNavigation: VersionFiltro;

    constructor() {
        this.IdVersionNavigation = new VersionFiltro();
    }
}