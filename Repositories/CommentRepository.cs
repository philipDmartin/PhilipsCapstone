using Microsoft.EntityFrameworkCore;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetAll()
        {
            // Using a .ThenInclude() method with a .Include() method
            return _context.Comment // We get all comments
                .Include(c => c.UserProfile) // We Include the user information as it relates to the comment
                .Include(c => c.Review) // We Include the Review information as it relates to the comment
                .ThenInclude(p => p.UserProfile) // Then we include the user information as it relates to the post
                .ToList(); // Then we list it.
        }

        public Comment GetById(int id)
        {
            return _context.Comment
                .Include(c => c.UserProfile)
                .Include(c => c.Review)
                .ThenInclude(p => p.UserProfile)
                .FirstOrDefault(c => c.Id == id);
        }

        public List<Comment> GetByReviewId(int id)
        {
            return _context.Comment
                            .Include(c => c.Review)
                            .ThenInclude(p => p.UserProfile)
                            .Include(c => c.UserProfile)
                            .Where(c => c.ReviewId == id)
                            .OrderByDescending(c => c.CreateDateTime)
                            .ToList();
        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var comment = GetById(id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}
