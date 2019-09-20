using System;
using System.Collections.Generic;

namespace servicios.Repositorio
{
    public partial class VehiculosStock
    {
        public int Id { get; set; }
        public int IdVersion { get; set; }
        public string Comentarios { get; set; }
        public int Cantidad { get; set; }

        public Version IdVersionNavigation { get; set; }
    }
}
