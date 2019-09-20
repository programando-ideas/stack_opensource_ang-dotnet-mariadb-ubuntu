using System;
using System.Collections.Generic;

namespace servicios.Repositorio
{
    public partial class Marca
    {
        public Marca()
        {
            Modelo = new HashSet<Modelo>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public ICollection<Modelo> Modelo { get; set; }
    }
}
