CREATE DATABASE IF NOT EXISTS Imovim;

USE Imovim;

CREATE TABLE IF NOT EXISTS Users(
	id int primary key auto_increment,
    nickname varchar(30) not null unique,
    email varchar(255) not null unique,
    password varchar(255) not null,
    birthday date not null,
    created_at datetime default now()
);

create table UserLikesPost(
	id int primary key auto_increment,
    user_id int not null,
    post_id int not null,
	
    constraint user_ID foreign key(user_id) references Users(id),
    constraint post_ID foreign key(post_id) references Post(id)
);

SELECT * FROM Users;