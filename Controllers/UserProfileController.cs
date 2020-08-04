using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using PhilipsCapstone.Repositories;

namespace PhilipsCapstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileRepository _userProfileRepository;
        public UserProfileController(ApplicationDbContext context)
        {
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("fbuId/{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId == 1 || user.UserTypeId == 2)
            {
                return Ok(_userProfileRepository.GetAll());
            }
            //var userProfile = _userProfileRepository.GetById(Id);
            //else if (user.Id != userProfile.id)
            //{
            //    return Forbid();
            //}
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }
            else if (userProfile.UserTypeId == 1 || userProfile.UserTypeId == 2)
            {
                return Ok(_userProfileRepository.GetById(id));
            }
            else
            {
                return Forbid();
            }
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
             userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(userProfile);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
