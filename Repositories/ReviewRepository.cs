using Microsoft.EntityFrameworkCore;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Repositories
{
    public class ReviewRepository
    {
        private readonly ApplicationDbContext _context;

        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Review> GetAll()
        {
            return _context.Review
                .Include(p => p.UserProfile)
                //.Include(p => p.Comments)
                .OrderByDescending(p => p.CreateDateTime)
                .ToList();

        }

        public Review GetById(int id)
        {
            return _context.Review.Include(p => p.UserProfile)
                                //.Include(p => p.Comments)
                                .OrderByDescending(p => p.CreateDateTime)
                                .FirstOrDefault(p => p.Id == id);
        }

        public List<Review> GetByUserProfileId(int id)
        {
            return _context.Review.Include(p => p.UserProfile)
                            .Where(p => p.UserProfileId == id)
                            .OrderByDescending(p => p.CreateDateTime)
                            .ToList();
        }

        public void Add(Review review)
        {
            _context.Add(review);
            _context.SaveChanges();
        }

        public void Update(Review review)
        {
            _context.Entry(review).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var review = GetById(id);
            _context.Review.Remove(review);
            _context.SaveChanges();
        }

        public List<Review> Search(string criterion, bool sortDescending)
        {
            var query = _context.Review
                                .Include(p => p.UserProfile)
                                .Where(p => p.Title.Contains(criterion));

            return sortDescending
                ? query.OrderByDescending(p => p.CreateDateTime).ToList()
                : query.OrderBy(p => p.CreateDateTime).ToList();
        }
    }
}
