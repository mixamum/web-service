-- Remove any existing database and user.
-- DROP DATABASE IF EXISTS unforget;
-- DROP USER IF EXISTS unforget_user@localhost;

-- -- Create Unforget database and user. Ensure Unicode is fully supported.
-- CREATE DATABASE unforget CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
-- CREATE USER unforget_user@localhost IDENTIFIED WITH mysql_native_password BY 'M1x112946';
-- GRANT ALL PRIVILEGES ON unforget.* TO unforget_user@localhost;


-- CREATE TABLE musicList (
--   id BIGINT UNSIGNED AUTO_INCREMENT,
--   artist VARCHAR(255),
--   genre VARCHAR(255),
--   year INT,
--   is_deleted INT DEFAULT 0,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Remove any existing database and user.

DROP TABLE IF EXISTS memory;

CREATE TABLE memory (
  id SERIAL PRIMARY KEY,
  year INT,
  month INT,
  day INT,
  entry TEXT,
  is_deleted INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);