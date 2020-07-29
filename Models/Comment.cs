using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int ReviewId { get; set; }

        public Review Review { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public string Content { get; set; }

        public DateTime CreateDateTime { get; set; }
    }
}
