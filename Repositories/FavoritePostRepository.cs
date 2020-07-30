﻿using Microsoft.EntityFrameworkCore;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Repositories
{
    public class FavoritePostRepository
    {
        private readonly ApplicationDbContext _context;

        public FavoritePostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<FavoritePost> GetAll()
        {
            return _context.FavoritePost
                .Include(fp => fp.UserProfile)
                //.Include(fp => fp.Comments)
                .OrderByDescending(fp => fp.CreateDateTime)
                .ToList();
        }

        public FavoritePost GetById(int id)
        {
            return _context.FavoritePost.Include(fp => fp.UserProfile)
                                //.Include(fp => fp.Comments)
                                .OrderByDescending(fp => fp.CreateDateTime)
                                .FirstOrDefault(fp => fp.Id == id);
        }

        public List<FavoritePost> GetByUserProfileId(int id)
        {
            return _context.FavoritePost.Include(fp => fp.UserProfile)
                            //.Include(fp => fp.Comments)
                            .Where(fp => fp.UserProfileId == id)
                            .OrderByDescending(fp => fp.CreateDateTime)
                            .ToList();
        }

        public void Add(FavoritePost favoritePost)
        {
            _context.Add(favoritePost);
            _context.SaveChanges();
        }

        public void Update(FavoritePost favoritePost)
        {
            _context.Entry(favoritePost).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var favoritePost = GetById(id);
            _context.FavoritePost.Remove(favoritePost);
            _context.SaveChanges();
        }
    }
}