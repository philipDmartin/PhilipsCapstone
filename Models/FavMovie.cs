using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Models
{
    public class FavoriteMovie
    {
        public int Id { get; set; }

        public int FavoritePostId { get; set; }

        public FavoritePost FavoritePost { get; set; }

        public int ReviewId { get; set; }

        public Review Review { get; set; }

        public string Why { get; set; }
    }
}
