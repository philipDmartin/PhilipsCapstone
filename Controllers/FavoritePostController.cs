using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using PhilipsCapstone.Repositories;

namespace PhilipsCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritePostController : ControllerBase
    {
        private readonly FavoritePostRepository _favoritePostRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public FavoritePostController(ApplicationDbContext context)
        {
            _favoritePostRepository = new FavoritePostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_favoritePostRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var favoritePost = _favoritePostRepository.GetById(id);
            if (favoritePost == null)
            {
                return NotFound();
            }
            return Ok(favoritePost);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_favoritePostRepository.GetByUserProfileId(id));
        }

        [HttpPost]
        public IActionResult FavoritePost(FavoritePost favoritePost)
        {
            _favoritePostRepository.Add(favoritePost);
            return CreatedAtAction("Get", new { id = favoritePost.Id }, favoritePost);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, FavoritePost favoritePost)
        {
            var user = GetCurrentUserProfile();

            if (user.Id != favoritePost.UserProfileId)
            {
                return Forbid();
            }

            _favoritePostRepository.Update(favoritePost);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var favoritePost = _favoritePostRepository.GetById(id);
            if (user.Id != favoritePost.UserProfileId)
            {
                return Forbid();
            }

            _favoritePostRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("filterfavoritepostsbyuserProfile")]
        public IActionResult FilterFavoritePostsByUserProfile(int q, bool b)
        {
            if (q == 0)
            {
                if (b)
                {
                    return Ok(_favoritePostRepository.GetAll());
                }
                else
                {
                    return NoContent();
                }
            }
            else
            {
                return Ok(_favoritePostRepository.GetAllFavoritePostByUserProfile(q, b));
            }
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_favoritePostRepository.Search(q, sortDesc));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

        }
    }
}
