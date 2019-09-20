using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios.Repositorio;

namespace servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculosController : ControllerBase
    {
        private readonly DbStockVehiculosContext _context;

        public VehiculosController(DbStockVehiculosContext context)
        {
            _context = context;
        }

        // GET: api/Vehiculos
        [HttpGet("obtenervechiculos/{fversion}/{fmodelo}/{fanio}/{fmarca}")]
        public async Task<IActionResult> GetVehiculosStock(int fversion, int fmodelo, int fanio, int fmarca)
        {
            var vv = from vehstock in _context.VehiculosStock
                     join version in _context.Version on vehstock.IdVersion equals version.Id
                     join modelo in _context.Modelo on version.IdModelo equals modelo.Id
                     join marca in _context.Marca on modelo.IdMarca equals marca.Id
                     join anio in _context.Anio on modelo.IdAnio equals anio.Id
                     where (fversion == 0 || version.Id - fversion == 0) &&
                           (fmodelo == 0 || modelo.Id - fmodelo == 0) &&
                           (fmarca == 0 || marca.Id - fmarca == 0) &&
                           (fanio == 0 || anio.Id - fanio == 0)
                     select new
                     {
                         Id = vehstock.Id,
                         Comentarios = vehstock.Comentarios,
                         Cantidad = vehstock.Cantidad,
                         Version = new
                         {
                             Id = version.Id,
                             Nombre = version.Nombre
                         },
                         Modelo = new
                         {
                             Id = modelo.Id,
                             Nombre = modelo.Nombre
                         },
                         Marca = new
                         {
                             Id = marca.Id,
                             Nombre = marca.Nombre
                         },
                         Anio = new
                         {
                             Id = anio.Id,
                             Nombre = anio.Nombre
                         }
                     };

            return Ok(await vv.OrderBy(vs => vs.Marca.Nombre)
                              .OrderBy(vs => vs.Modelo.Nombre)
                              .OrderBy(vs => vs.Version.Nombre)
                              .OrderBy(vs => vs.Anio.Nombre)
                              .ToListAsync());
        }

        [HttpPost]
        [Route("ingresar")]
        public async Task<IActionResult> Ingresar(VehiculosStock pvehiculo)
        {
            try
            {
                var vehiculosStock = await _context.VehiculosStock.FindAsync(pvehiculo.Id);
                if (vehiculosStock == null)
                {
                    return NotFound("El vehículo " + pvehiculo.Id.ToString() + " no está disponible");
                }

                vehiculosStock.Cantidad += 1;

                await _context.SaveChangesAsync();

                return Ok(vehiculosStock);
            }
            catch (System.Exception e)
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        [Route("vender")]
        public async Task<IActionResult> Vender(VehiculosStock pvehiculo)
        {
            try
            {
                var vehiculosStock = await _context.VehiculosStock.FindAsync(pvehiculo.Id);
                if (vehiculosStock == null)
                {
                    return NotFound("El vehículo " + pvehiculo.Id.ToString() + " no está disponible");
                }

                if (vehiculosStock.Cantidad == 0)
                    return Ok(vehiculosStock);

                vehiculosStock.Cantidad -= 1;

                await _context.SaveChangesAsync();

                return Ok(vehiculosStock);
            }
            catch (System.Exception e)
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
