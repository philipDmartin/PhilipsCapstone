using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Models
{
    public class Review
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string ImageLocation { get; set; }

        public string Content { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        public string Category { get; set; }
        public int Stars { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<ReviewUserProfile> ReviewUserProfiles { get; set; } = new List<ReviewUserProfile>();
    }
}
