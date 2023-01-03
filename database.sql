CREATE DATABASE IF NOT EXISTS imovim;

# DROP DATABASE imovim;

USE imovim;

CREATE TABLE IF NOT EXISTS Users(
	id int primary key auto_increment,
    nickname varchar(30) not null unique,
    email varchar(255) not null unique,
    password varchar(255) not null,
    birthday date not null,
    created_at datetime default now()
);


create table Posts(
	id int primary key auto_increment,
    author varchar(255) not null,
	caption text,
	created_at datetime default now() not null,
	image varchar(255)
);

CREATE TABLE IF NOT EXISTS UserLikesPost(
	id int primary key auto_increment,
    user_nickname varchar(30) not null,
    post_id int not null,
	
    constraint user_Nickname foreign key(user_nickname) references Users(nickname),
    constraint post_ID foreign key(post_id) references Posts(id)
);

SELECT * FROM Users;