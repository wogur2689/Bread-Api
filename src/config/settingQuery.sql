# db create
create database bread;
# user create
CREATE USER 'bread'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
# access role setting
GRANT ALL PRIVILEGES ON bread.* TO 'bread'@'localhost';
# flush
FLUSH PRIVILEGES;
# ====================
# users table create
# ====================
create table users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id VARCHAR(20) NOT null,
	name VARCHAR(20) NOT NULL,
	pwd VARCHAR(20) NOT NULL,
	age INT(5) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	address VARCHAR(20) NOT NULL
);
