DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  year INT,
  song_name VARCHAR(255),
  artist_name VARCHAR(255),
  genre VARCHAR(255),
  song_length INT,
  is_deleted INT DEFAULT 0
);