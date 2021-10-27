DROP DATABASE IF EXISTS playlist;
DROP USER IF EXISTS playlist_user@localhost;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE playlist CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER playlist_user@localhost IDENTIFIED WITH mysql_native_password BY 'M1x&112946';
GRANT ALL PRIVILEGES ON playlist.* TO playlist_user@localhost;
