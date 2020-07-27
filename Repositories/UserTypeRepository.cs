using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Repositories
{
    public class UserTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public UserTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<UserType> GetAll()
        {
            return _context.UserType.OrderBy(ut => ut.Name).ToList();
        }
    }
}
