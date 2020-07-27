using Microsoft.AspNetCore.Mvc;
using PhilipsCapstone.Data;
using PhilipsCapstone.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {
        private readonly UserTypeRepository _userTypeRepository;
        public UserTypeController(ApplicationDbContext context)
        {
            _userTypeRepository = new UserTypeRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userTypeRepository.GetAll());
        }

    }
}
