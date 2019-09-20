using System;
using System.Collections.Generic;

namespace servicios.Repositorio
{
    public partial class Anio
    {
        public Anio()
        {
            Modelo = new HashSet<Modelo>();
        }

        public int Id { get; set; }
        public short Nombre { get; set; }

        public ICollection<Modelo> Modelo { get; set; }
    }
}
