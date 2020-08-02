using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using PhilipsCapstone.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PhilipsCapstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewRepository _reviewRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public ReviewController(ApplicationDbContext context)
        {
            _reviewRepository = new ReviewRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reviewRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var review = _reviewRepository.GetById(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_reviewRepository.GetByUserProfileId(id));
        }

        [HttpPost]
        public IActionResult Review(Review review)
        {
            _reviewRepository.Add(review);
            return CreatedAtAction("Get", new { id = review.Id }, review);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            _reviewRepository.Update(review);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var review = _reviewRepository.GetById(id);
            if (user.Id != review.UserProfileId)
            {
                return Forbid();
            }

            _reviewRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            if (String.IsNullOrEmpty(q))
            {
                return Ok(_reviewRepository.GetAll());
            }
            return Ok(_reviewRepository.Search(q, sortDesc));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
