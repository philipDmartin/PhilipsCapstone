using Microsoft.EntityFrameworkCore;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Repositories
{
    public class FavoriteMovieRepository
    {
        private readonly ApplicationDbContext _context;

        public FavoriteMovieRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<FavoriteMovie> GetAll()
        {
            // Using a .ThenInclude() method with a .Include() method
            return _context.FavoriteMovie // We get all favoriteMovies
                .Include(c => c.FavoritePost.UserProfile) // We Include the user information as it relates to the favoriteMovie
                .Include(c => c.FavoritePost) // We Include the FavoritePost information as it relates to the favoriteMovie
                .ThenInclude(p => p.UserProfile) // Then we include the user information as it relates to the post
                .ToList(); // Then we list it.
        }

        public FavoriteMovie GetById(int id)
        {
            return _context.FavoriteMovie
                .Include(c => c.FavoritePost.UserProfile)
                .Include(c => c.FavoritePost)
                .ThenInclude(p => p.UserProfile)
                .FirstOrDefault(c => c.Id == id);
        } 

        public List<FavoriteMovie> GetByFavoritePostId(int id)
        {
            return _context.FavoriteMovie
                            .Include(c => c.FavoritePost)
                            .ThenInclude(p => p.UserProfile)
                            .Include(c => c.FavoritePost.UserProfile)
                            .Where(c => c.FavoritePostId == id)
                            .OrderByDescending(c => c.FavoritePost.CreateDateTime)
                            .ToList();
        }

        public void Add(FavoriteMovie favoriteMovie)
        {
            _context.Add(favoriteMovie);
            _context.SaveChanges();
        }

        public void Update(FavoriteMovie favoriteMovie)
        {
            _context.Entry(favoriteMovie).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var favoriteMovie = GetById(id);
            _context.FavoriteMovie.Remove(favoriteMovie);
            _context.SaveChanges();
        }
    }
}
