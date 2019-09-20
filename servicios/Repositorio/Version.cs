using System;
using System.Collections.Generic;

namespace servicios.Repositorio
{
    public partial class Version
    {
        public Version()
        {
            VehiculosStock = new HashSet<VehiculosStock>();
        }

        public int Id { get; set; }
        public int IdModelo { get; set; }
        public string Nombre { get; set; }

        public Modelo IdModeloNavigation { get; set; }
        public ICollection<VehiculosStock> VehiculosStock { get; set; }
    }
}
