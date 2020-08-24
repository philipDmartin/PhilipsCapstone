USE [master]
GO
IF db_id('MooV') IS NULL
  CREATE DATABASE [MooV]
GO
USE [MooV]
GO

DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [FavoritePost];
DROP TABLE IF EXISTS [FavoriteMovies];

CREATE TABLE [Review] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Title] NVARCHAR(255),
  [Content] text,
  [ImageLocation] NVARCHAR(255),
  [CreateDateTime] DATETIME,
  [Category] NVARCHAR(255),
  [Stars] integer,
  [UserProfileId] integer
)
GO

CREATE TABLE [UserType] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] NVARCHAR(255)
)
GO

CREATE TABLE [UserProfile] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [FirebaseUserId] NVARCHAR(255) NOT NULL,
  [DisplayName] NVARCHAR(255) NOT NULL,
  [FirstName] NVARCHAR(255) NOT NULL,
  [LastName] NVARCHAR(255) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL,
  [ImageLocation] NVARCHAR(255),
  [UserTypeId] integer

    CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)

)
GO

CREATE TABLE [Comment] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [ReviewId] integer,
  [UserProfileId] integer,
  [Content] text,
  [CreateDateTime] datetime
)
GO

CREATE TABLE [FavoritePost] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Title] NVARCHAR(255),
  [CreateDateTime] datetime,
  [UserProfileId] integer
)
GO

CREATE TABLE [FavoriteMovies] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [FavoritePostId] integer,
  [ReviewId] integer,
  [Why] text
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([ReviewId]) REFERENCES [Review] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [FavoritePost] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [FavoriteMovies] ADD FOREIGN KEY ([FavoritePostId]) REFERENCES [FavoritePost] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [FavoriteMovie] ADD FOREIGN KEY ([ReviewId]) REFERENCES [Review] ([Id])
GO
