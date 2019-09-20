using System;
using System.Collections.Generic;

namespace servicios.Repositorio
{
    public partial class Modelo
    {
        public Modelo()
        {
            Version = new HashSet<Version>();
        }

        public int Id { get; set; }
        public int IdMarca { get; set; }
        public int IdAnio { get; set; }
        public string Nombre { get; set; }

        public Anio IdAnioNavigation { get; set; }
        public Marca IdMarcaNavigation { get; set; }
        public ICollection<Version> Version { get; set; }
    }
}
