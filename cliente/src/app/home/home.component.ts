import { Component, OnInit } from '@angular/core';
import { faWarehouse, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Anio } from '../models/anio';
import { Modelo } from '../models/modelo';
import { Marca } from '../models/marca';
import { Version } from '../models/version';
import { Vehiculo } from '../models/vehiculo';
import { VehiculoFiltro } from '../models/vehiculoFiltro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faWarehouse = faWarehouse;
  faDollarSign = faDollarSign;

  //Datos
  anios: any;
  marcas: any;
  modelos: any;
  versiones: any;
  vehiculos: any;

  //Parametros para el filtro de busqueda de vehiculos
  fanio: number = 0;
  fmarca: number = 0;
  fmodelo: number = 0;
  fversion: number = 0;

  //Descripcion parametros para el filtro de búsqueda
  fanio_nombre: string = "";
  fmarca_nombre: string = "";
  fmodelo_nombre: string = "";
  fversion_nombre: string = "";

  constructor(private _http: HttpClient,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  ///////////////
  // Funciones //
  ///////////////
  cargarDatosIniciales() {
    this.cargarAnios();
    this.cargarMarcas();

    this.cargarVehiculos();
  }

  cargarAnios() {
    this.spinner.show();

    this.getDatos<Anio[]>("consultas/anios").subscribe(data => {
      this.anios = data.body;
    },
      error => this.handleError(error),
      () => {
        this.spinner.hide();
        console.log("La llamada a la api de anios ha finalizado");
      });
  }

  cargarMarcas() {
    this.spinner.show();

    this.getDatos<Marca[]>("consultas/marcas").subscribe(data => {
      this.marcas = data.body;
    },
      error => this.handleError(error),
      () => {
        this.spinner.hide();
        console.log("La llamada a la api de marcas ha finalizado");
      });
  }

  cargarModelos(idanio: number, idmarca: number) {
    this.spinner.show();

    let recurso: string = "consultas/modelos/" + idmarca + "/" + idanio;

    this.getDatos<Modelo[]>(recurso).subscribe(data => {
      this.modelos = data.body;
    },
      error => this.handleError(error),
      () => {
        this.spinner.hide();
        console.log("La llamada a la api de modelos ha finalizado");
      });
  }

  cargarVersiones(idmodelo: number) {
    this.spinner.show();

    let recurso: string = "consultas/versiones/" + idmodelo;

    this.getDatos<Version[]>(recurso).subscribe(data => {
      this.versiones = data.body;
    },
      error => this.handleError(error),
      () => {
        this.spinner.hide();
        console.log("La llamada a la api de versiones ha finalizado");
      });
  }

  cargarVehiculos() {
    this.spinner.show();

    //obtenervechiculos/{fversion}/{fmodelo}/{fanio}/{fmarca}

    let recurso: string = "vehiculos/obtenervechiculos/" + this.fversion + "/" + this.fmodelo + "/" + this.fanio + "/" + this.fmarca;

    this.getDatos<Vehiculo[]>(recurso).subscribe(data => {
      this.vehiculos = data.body;
    },
      error => this.handleError(error),
      () => {
        this.spinner.hide();
        console.log("La llamada a la api de vehículos ha finalizado");
      });
  }

  /////////////
  // Eventos //
  /////////////
  onFiltroAnioClick(anio: Anio) {
    this.fanio = anio.id;
    this.fanio_nombre = anio.nombre;

    this.modelos = [];
    this.fmodelo_nombre = "";
    this.fmodelo = 0;

    this.cargarModelos(this.fanio, this.fmarca);

    this.versiones = [];
    this.fversion = 0;
    this.fversion_nombre = "";

    this.cargarVehiculos();
  }

  onFiltroMarcaClick(marca: Marca) {
    this.fmarca = marca.id;
    this.fmarca_nombre = marca.nombre;

    this.modelos = [];
    this.fmodelo_nombre = "";
    this.fmodelo = 0;

    this.cargarModelos(this.fanio, this.fmarca);

    this.versiones = [];
    this.fversion = 0;
    this.fversion_nombre = "";

    this.cargarVehiculos();
  }

  onFiltroModeloClick(modelo: Modelo) {
    this.fmodelo = modelo.id;
    this.fmodelo_nombre = modelo.nombre;

    this.cargarVersiones(this.fmodelo);

    this.cargarVehiculos();
  }

  onFiltroVersionClick(version: Version) {
    this.fversion = version.id;
    this.fversion_nombre = version.nombre;

    this.cargarVehiculos();
  }

  ingresarVehiculo(ve: Vehiculo) {
    this.spinner.show();

    //ingresar
    let vf: VehiculoFiltro = new VehiculoFiltro();
    vf.Id = ve.id;
    vf.IdVersionNavigation.id = ve.version.id;

    let recurso: string = "vehiculos/ingresar";

    this.postDatos<string>(recurso, vf).subscribe(data => {
      ve.cantidad += 1;
      console.log("Se ingresó el vehículo: ", data.body);
    },
      error => {
        this.handleError(error);
      },
      () => {
        this.spinner.hide();
        console.log("La llamada a la api de ingresar vehículos ha finalizado");
      });
  }

  venderVehiculo(ve: Vehiculo) {
    if (ve.cantidad == 0)
      return;

    this.spinner.show();

    //ingresar
    let vf: VehiculoFiltro = new VehiculoFiltro();
    vf.Id = ve.id;
    vf.IdVersionNavigation.id = ve.version.id;

    let recurso: string = "vehiculos/vender";

    this.postDatos<string>(recurso, vf).subscribe(data => {

      let vserv: any = data.body;
      console.log("Cantidad: ", vserv.cantidad);
      if (vserv.cantidad >= 0)
        ve.cantidad -= 1;

      console.log("Se ingresó el vehículo: ", vserv);
    },
      error => {
        this.handleError(error);
      },
      () => {
        this.spinner.hide();
        console.log("La llamada a la api de vender vehículos ha finalizado");
      });
  }

  limpiarFiltros() {
    //Parametros para el filtro de busqueda de vehiculos
    this.fanio = 0;
    this.fmarca = 0;
    this.fmodelo = 0;
    this.fversion = 0;

    //Descripcion parametros para el filtro de búsqueda
    this.fanio_nombre = "";
    this.fmarca_nombre = "";
    this.fmodelo_nombre = "";
    this.fversion_nombre = "";

    this.modelos = [];
    this.versiones = [];

    this.cargarVehiculos();
  }

  //////////
  // Http //
  //////////
  getDatos<T>(recurso: string): Observable<HttpResponse<T>> {

    let httpHeaders: HttpHeaders = new HttpHeaders();
    let url: string = environment.urlapi + recurso;

    return this._http.get<T>(url, {
      headers: httpHeaders,
      observe: "response"
    });
  }

  postDatos<T>(recurso: string, data: any): Observable<HttpResponse<T>> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let url: string = environment.urlapi + recurso;

    return this._http.post<T>(url, data,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }

  handleError(error: any): void {
    console.log("****** ERROR: ", error);
  }
}