# Stack de desarrollo OpenSource "ANGULAR + ASP.NET CORE + MARIADB SERVER + UBUNTU"

Para ejecutar la aplicación deben instalarse los siguientes frameworks/herramientas
 - Ubuntu 19.04: http://releases.ubuntu.com/19.04/ubuntu-19.04-desktop-amd64.iso
 - .Net core: https://dotnet.microsoft.com/download/linux-package-manager/ubuntu19-04/sdk-current
 - MariaDB Server: https://downloads.mariadb.org/mariadb/repositories/#distro=Ubuntu&distro_release=disco--ubuntu_disco&mirror=klaus&version=10.4
 - Angular: https://angular.io/guide/setup-local
 
 Lista de videos:
  - Parte 1  : https://youtu.be/AOiksdi3SHM
  - Parte 2  : https://youtu.be/Z8A7nE__EXg
  - Parte 3  : https://youtu.be/dMsqDVshQ2E
  - Parte 3.1: https://youtu.be/If_maEd8H14
 
Para ejecutar los proyectos servicios (webapi) y cliente (angular) hacer lo siguiente:
 - API:
     - > cd servicios
     - > dotnet run
 - Cliente:
     - > cd cliente
     - > ng serve
    
Comandos para creación de Controllers
Instalar el comando: 
 - > dotnet tool install -g dotnet-aspnet-codegenerator
	  
- > dotnet aspnet-codegenerator controller -name VehiculosController -outDir Controllers -m VehiculosStock -dc DbStockVehiculosContext -api -async -nv

Crear el modelo en c# desde la base de datos
 - > dotnet ef dbcontext scaffold "Server=localhost;Database=DbStockVehiculos;User=USUARIO;Password=PASSWORD!;" "Pomelo.EntityFrameworkCore.MySql" -o Repositorio/

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

<a href="https://www.buymeacoffee.com/CFVh8qe" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W314DUU)

v1.1.1 - 24/09/19
