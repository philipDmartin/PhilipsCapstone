using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Models
{
    public class FavoritePost
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<FavoritePostUserProfile> FavoritePostUserProfiles { get; set; } = new List<FavoritePostUserProfile>();
    }
}
