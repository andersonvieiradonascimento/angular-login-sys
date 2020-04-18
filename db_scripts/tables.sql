CREATE TABLE users(
	id serial,
	name varchar(120),
	nickname varchar(120),
	nickreal varchar(120),
	email varchar(150),
	secret varchar(500),
	hash varchar(500)
);