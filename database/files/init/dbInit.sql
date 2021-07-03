CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin_password';
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'user_password';
CREATE DATABASE IF NOT EXISTS groupomania CHARACTER SET 'utf8';
GRANT ALL PRIVILEGES ON groupomania.* TO 'admin'@'%';