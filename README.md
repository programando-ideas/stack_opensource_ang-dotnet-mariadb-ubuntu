# Stack de desarrollo OpenSource "ANGULAR + Node.js/Express + ASP.NET CORE + MARIADB SERVER + UBUNTU"

Para ejecutar la aplicación deben instalarse los siguientes frameworks/herramientas
 - Ubuntu 19.04: http://releases.ubuntu.com/19.04/ubuntu-19.04-desktop-amd64.iso
 - .Net core: https://dotnet.microsoft.com/download/linux-package-manager/ubuntu19-04/sdk-current
 - MariaDB Server: https://downloads.mariadb.org/mariadb/repositories/#distro=Ubuntu&distro_release=disco--ubuntu_disco&mirror=klaus&version=10.4
 - Angular: https://angular.io/guide/setup-local
 - Node.js: https://nodejs.org/es/
 - Express: https://expressjs.com/es/starter/installing.html
 
 Lista de videos:
  - Parte 1: [Instalación y configuración](https://youtu.be/AOiksdi3SHM)
  - Parte 2: [Base de datos y API](https://youtu.be/Z8A7nE__EXg)
  - Parte 3: [Cliente Angular](https://youtu.be/dMsqDVshQ2E)
  - Parte 3.1: [Cliente Angular y API asp.net core](https://youtu.be/If_maEd8H14)
  - Parte 4: [API node.js](https://youtu.be/t_xz2oZsf_s)
 
Para ejecutar los proyectos servicios (webapi) y cliente (angular) hacer lo siguiente:
 - API asp.net core:
     - > cd servicios
     - > dotnet restore
     - > dotnet run
 - API Node.js/Express
     - > npm install
     - > npm start
 - Cliente:
     - > cd cliente
     - > ng serve -o
    
ASP.NET Core:
- Comandos para creación de Controllers
 - > dotnet tool install -g dotnet-aspnet-codegenerator
 - > dotnet aspnet-codegenerator controller -name VehiculosController -outDir Controllers -m VehiculosStock -dc DbStockVehiculosContext -api -async -nv

- Crear el modelo en c# desde la base de datos
 - > dotnet ef dbcontext scaffold "Server=localhost;Database=DbStockVehiculos;User=USUARIO;Password=PASSWORD!;" "Pomelo.EntityFrameworkCore.MySql" -o Repositorio/

Node.js/Express
- Iniciar el proyecto:
 - > npm init

- Dependencias y paquetes:
 - > npm install express --save
 - > npm install --save-dev nodemon
 - > npm install cors --save
 - > npm install helmet --save
 - > npm install morgan --save
 - > npm install dotenv --save
 - > npm install mariadb --save

Licencias del software instalado:
 - Angular: https://angular.io/license
 - Node.js: https://github.com/nodejs/node/blob/master/LICENSE
 - dotnet: https://github.com/dotnet/core/blob/master/LICENSE.TXT
 - MariaDB: https://downloads.mariadb.org/mariadb/repositories/#distro=Ubuntu&distro_release=disco--ubuntu_disco&mirror=klaus&version=10.4
 - DBEaver: https://dbeaver.io/about/
 - Ubuntu: https://ubuntu.com/licensing
 - vsCode: https://github.com/microsoft/vscode/blob/master/LICENSE.txt
 
Twitter: https://twitter.com/ProgramIdeas
Facebook: https://www.facebook.com/ProgramandoIdeas01

 <a href="https://paypal.me/lp8126" target="_blank">
  <img alt="Donar via PayPal" style="height: 50px !important;" src="https://github.com/programando-ideas/cursoangular/blob/master/imagenes/paypal.png"/>
</a>

v1.2.0 - 31/10/19
