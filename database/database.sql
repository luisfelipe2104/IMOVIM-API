CREATE DATABASE IF NOT EXISTS imovim;

# DROP DATABASE imovim;

USE imovim;


CREATE TABLE IF NOT EXISTS Users(
	id int primary key auto_increment,
    nickname varchar(100) not null,
    email varchar(255) not null unique,
    phoneNumber varchar(30),
    password varchar(255) not null,
    birthday date not null,
    created_at datetime default now()
);

# INSERT INTO Users VALUES(DEFAULT, "TIago", "tiago@teste", "123123", "456456", "2004-10-15", DEFAULT);

CREATE TABLE IF NOT EXISTS Profile(
	id int primary key auto_increment,
    user_id int not null unique,
    profileImage varchar(255),
    profileBackground varchar(255),
    description text,
    localization varchar(100),
    
    constraint user_ID_tblProfile foreign key(user_id) references Users(id)
);

CREATE TABLE IF NOT EXISTS UserFollowing(
	id int primary key auto_increment,
    user_id int not null,
    follower_id int not null,
    created_at datetime default now(),
    
    constraint user_ID_tblUserFollowing foreign key(user_id) references Users(id),
    constraint follower_ID_tblUserFollowing foreign key(follower_id) references Users(id)
);

CREATE TABLE IF NOT EXISTS Friendship(
	id int primary key auto_increment,
    friend1 int not null,
    friend2 int not null,
    created_at datetime default now(),
    pending boolean default true,
    
    constraint friend1_tblFriendship foreign key(friend1) references Users(id),
    constraint friend2_tblFriendship foreign key(friend2) references Users(id)
);

CREATE TABLE IF NOT EXISTS BlockedUser(
    id int primary key auto_increment,
    user_id int not null,
    blocked_user_id int not null,
    created_at datetime default now()
);

CREATE TABLE IF NOT EXISTS Posts(
	id int primary key auto_increment,
    user_id int not null,
	caption text,
    localization varchar(100),
	created_at datetime default now() not null,
	image varchar(255),
    post_type ENUM('post', 'event') DEFAULT 'post' NOT NULL,
    updated boolean default false
   
);

CREATE TABLE IF NOT EXISTS UserLikesPost(
	id int primary key auto_increment,
    user_id int not null,
    post_id int not null,
    created_at datetime default now(),
	
    constraint user_ID_tblUserLikes foreign key(user_id) references Users(id),
    constraint post_ID_tblUserLikes foreign key(post_id) references Posts(id)
);

CREATE TABLE IF NOT EXISTS Comments(
	id int primary key auto_increment,
    post_id int not null,
    user_id int not null,
    comment text not null,
    created_at datetime default now(),
    updated boolean default false,
    
    constraint post_id_tblComments foreign key(post_id) references Posts(id),
    constraint user_id_tblComments foreign key(user_id) references Users(id)
);

CREATE TABLE IF NOT EXISTS Sports(
	id int primary key,
    sport_name varchar(50),
    sport_color VARCHAR(15)
);

INSERT INTO Sports(id, sport_name) VALUES
(1, "Atletismo"),
(2, "Badminton"),
(3, "Basquete"),
(4, "Beisebol"),
(5, "Boxe"),
(6, "Break Dance"),
(7, "Canoagem"),
(8, "Ciclismo"),
(9, "Escalada"),
(10, "Esgrima"),
(11, "Futebol"),
(12, "Futsal"),
(14, "Ginástica"),
(15, "Golfe"),
(16, "Handebol"),
(17, "Hipismo"),
(18, "Judô"),
(19, "Karatê"),
(20, "Levantamento de Peso"),
(21, "Natação"),
(22, "Skate"),
(24, "Surfe"),
(25, "Taekwondo"),
(26, "Tênis"),
(27, "Tênis de Mesa"),
(28, "Vôlei"),
(29, "Triatlo"),
(30, "Corrida");

CREATE TABLE IF NOT EXISTS UserPracticeSport(
	id int primary key auto_increment, 
    user_id int not null,
    sport_id int not null,
    
    constraint UserPracticeSport_userID foreign key(user_id) references Users(id),
    constraint UserPracticeSport_sportID foreign key(sport_id) references Sports(id)
);

CREATE TABLE IF NOT EXISTS Events(
	id int primary key auto_increment,
    user_id int not null,
    event_name varchar(100) not null,
    event_date date not null,
    event_hour time not null,
    description text not null,
    photo varchar(255),
    address varchar(255) not null,
    latitude float not null,
    longitude float not null,
    post_type ENUM('post', 'event') DEFAULT 'event' NOT NULL,
    created_at datetime default now() not null,
    
    constraint events_userID foreign key(user_id) references Users(id)
);

CREATE TABLE IF NOT EXISTS UserGoesToEvent(
	id int not null primary key auto_increment,
	event_id int not null,
	user_id int not null
);

CREATE TABLE IF NOT EXISTS SavedEvent(
	id int not null primary key auto_increment,
	event_id int not null,
	user_id int not null
);

# INSERT INTO Events VALUES (DEFAULT, 1, "futebol", "2023-03-11", "14:12", "minha rua", "futebol na minha rua", "");

CREATE TABLE IF NOT EXISTS Room(
	id varchar(250) primary key, 
    description varchar(100),
    room_name varchar(30),
    room_type enum('private', 'public') default 'private' not null,
    photo varchar(255),
    created_at datetime default now(),
    created_by varchar(30)
);


CREATE TABLE IF NOT EXISTS UserInTheRoom(
    id int primary key auto_increment, 
    room_id varchar(250) not null,
    user_id int not null,
    user_type enum('common', 'admin')
);

INSERT INTO UserInTheRoom(room_id, user_id) values
(1, 3);

