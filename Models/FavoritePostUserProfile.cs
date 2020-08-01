using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Models
{
    public class FavoritePostUserProfile
    {
        public int Id { get; set; }

        public int FavoritePostId { get; set; }

        public FavoritePost FavoritePost { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
