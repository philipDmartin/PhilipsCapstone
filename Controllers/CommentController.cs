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
    public class CommentController : ControllerBase
    {
        private readonly CommentRepository _commentRepository;
        private readonly UserProfileRepository _userProfileRepository;


        public CommentController(ApplicationDbContext context)
        {
            _commentRepository = new CommentRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepository.GetById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpGet("getbyreview/{id}")]
        public IActionResult GetByReview(int id)
        {
            return Ok(_commentRepository.GetByReviewId(id));
        }

        [HttpPost]
        public IActionResult Review(Comment comment)
        {
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            var user = GetCurrentUserProfile();

            if (id != comment.Id)
            {
                return BadRequest();
            }

            if (user.Id != comment.UserProfileId)
            {
                return Forbid();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var comment = _commentRepository.GetById(id);
            if (user.Id != comment.UserProfileId)
            {
                return Forbid();
            }
            _commentRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
