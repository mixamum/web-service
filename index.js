const fs = require("fs");
const mysql = require("mysql");
const express = require("express");
const { response } = require("express");

const credentials = JSON.parse(fs.readFileSync("credentials.json", "utf8"));
const connection = mysql.createConnection(credentials);

const service = express();

connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

const port = 5001;
service.listen(port, () => {
  console.log(`We're live on port: ${port}!`);
});

function rowToSongs(row) {
  return {
    id: row.id,
    year: row.year,
    song_name: row.song_name,
    artist_name: row.artist_name,
    genre: row.genre,
    song_length: row.song_length,
  };
}

service.get("/songs/:genre", (req, res) => {
  // const params = [requests.params.genre];
  // const query = "SELECT * FROM songs WHERE genre = ? AND is_deleted = 0";
  // connection.query(query, params, (error, rows) => {
  //   if (error) {
  //     response.status(500);
  //     response.json({
  //       ok: false,
  //       results: error.message,
  //     });
  //   } else {
  //     const memories = rows.map(rowToSongs);
  //     response.json({
  //       ok: true,
  //       results: rows.map(rowToSongs),
  //     });
  //   }
  // });
  response.json({
    ok: true,
    results: "lol",
  });
});
