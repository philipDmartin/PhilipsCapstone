set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Author');
set identity_insert [UserType] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, ImageLocation, UserTypeId, FirebaseUserId) values (1, 'Phil', 'Philip', 'Martin', 'philip@gmail.com', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 1, 'Hpra11pLc8YRKkpfeArEzmpJiiB2');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, ImageLocation, UserTypeId, FirebaseUserId) values (2, 'Nate', 'Nathan', 'Martin', 'nathan@gmail.com', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 2, 'LgHKr3pUG2gX5YFpPK4zwEsKlNt2');
set identity_insert [UserProfile] off

set identity_insert [Review] on
insert into Review (Id, Title, Content, ImageLocation, CreateDateTime, Category, Stars, UserProfileId) values (1, 'Review1', 'My review on a movie1', 'http://lorempixel.com/920/360/', '2019-12-04', 'Action', 3, 1);
insert into Review (Id, Title, Content, ImageLocation, CreateDateTime, Category, Stars, UserProfileId) values (2, 'Review2', 'My review on a movie2', 'http://lorempixel.com/920/360/', '2019-12-04', 'Mystory', 1, 2);
set identity_insert [Review] off

set identity_insert [Comment] on
insert into Comment (Id, ReviewId, UserProfileId, Content, CreateDateTime) values (1, 1, 1, 'My Comment1', '2020-05-19');
insert into Comment (Id, ReviewId, UserProfileId, Content, CreateDateTime) values (2, 2, 2, 'My Comment2', '2020-05-11');
set identity_insert [Comment] off

set identity_insert [FavoritePost] on
insert into FavoritePost (Id, Title, CreateDateTime, UserProfileId) values (1, 'Top10', '2019-12-04', 1);
insert into FavoritePost (Id, Title, CreateDateTime, UserProfileId) values (2, 'Top5', '2019-12-04', 2);
set identity_insert [FavoritePost] off


set identity_insert [FavoriteMovies] on
insert into FavoriteMovies (Id, FavoritePostId, ReviewId, Why) values (1, 1, 1, 'This is my fav Movie1');
insert into FavoriteMovies (Id, FavoritePostId, ReviewId, Why) values (2, 2, 2, 'This is my fav Movie2');
set identity_insert [FavoriteMovies] off