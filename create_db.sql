DROP DATABASE IF EXISTS music;
DROP USER IF EXISTS music_user@localhost;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE music CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER music_user@localhost IDENTIFIED WITH mysql_native_password BY 'M1x&112946';
GRANT ALL PRIVILEGES ON music.* TO music_user@localhost;
