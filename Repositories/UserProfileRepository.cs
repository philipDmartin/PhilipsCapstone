﻿using Microsoft.EntityFrameworkCore;
using PhilipsCapstone.Data;
using PhilipsCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType)
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .OrderBy(up => up.DisplayName)
                .ToList();
        }

        public UserProfile GetById(int id)
        {
            return _context.UserProfile
                                .Include(up => up.UserType)
                                .FirstOrDefault(up => up.Id == id);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Update(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
