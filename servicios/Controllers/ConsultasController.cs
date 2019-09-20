using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios.Repositorio;

namespace servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private readonly DbStockVehiculosContext _context;

        public ConsultasController(DbStockVehiculosContext context)
        {
            _context = context;
        }

        [HttpGet("anios")]
        public async Task<IActionResult> GetAnios()
        {
            return Ok(await _context.Anio.OrderBy(a => a.Nombre).ToListAsync());
        }

        [HttpGet("marcas")]
        public async Task<IActionResult> GetMarcas()
        {
            return Ok(await _context.Marca.OrderBy(m => m.Nombre).ToListAsync());
        }

        [HttpGet("modelos/{idmarca}/{idanio}")]
        public async Task<IActionResult> GetModelos(int idmarca, int idanio)
        {
            var modelos = _context.Modelo.Where(mod => mod.IdMarca == idmarca && mod.IdAnio == idanio);
            return Ok(await modelos.OrderBy(mod => mod.Nombre).ToListAsync());
        }

        [HttpGet("versiones/{idmodelo}")]
        public async Task<IActionResult> GetVersiones(int idmodelo)
        {
            var versiones = _context.Version.Where(ver => ver.IdModelo == idmodelo);
            return Ok(await versiones.OrderBy(ver => ver.Nombre).ToListAsync());
        }
    }
}
