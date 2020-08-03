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
    public class FavoriteMovieController : ControllerBase
    {
        private readonly FavoriteMovieRepository _favoriteMovieRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public FavoriteMovieController(ApplicationDbContext context)
        {
            _favoriteMovieRepository = new FavoriteMovieRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_favoriteMovieRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var favoriteMovie = _favoriteMovieRepository.GetById(id);
            if (favoriteMovie == null)
            {
                return NotFound();
            }
            return Ok(favoriteMovie);
        }

        [HttpGet("getbyfavoritePost/{id}")]
        public IActionResult GetByFavoritePost(int id)
        {
            return Ok(_favoriteMovieRepository.GetByFavoritePostId(id));
        }

        [HttpPost]
        public IActionResult FavoritePost(FavoriteMovie favoriteMovie)
        {
            _favoriteMovieRepository.Add(favoriteMovie);
            return CreatedAtAction("Get", new { id = favoriteMovie.Id }, favoriteMovie);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, FavoriteMovie favoriteMovie)
        {
            var user = GetCurrentUserProfile();

            if (id != favoriteMovie.Id)
            {
                return BadRequest();
            }

            if (user.Id != favoriteMovie.FavoritePost.UserProfileId)
            {
                return Forbid();
            }

            _favoriteMovieRepository.Update(favoriteMovie);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var favoriteMovie = _favoriteMovieRepository.GetById(id);
            if (user.Id != favoriteMovie.FavoritePost.UserProfileId)
            {
                return Forbid();
            }
            _favoriteMovieRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("getbyuser")]
        public IActionResult GetByUser()
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_favoriteMovieRepository.GetByUserProfileId(currentUser.Id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
