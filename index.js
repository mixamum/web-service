const fs = require("fs");
const mysql = require("mysql");
const express = require("express");

const credentials = JSON.parse(fs.readFileSync("credentials.json", "utf8"));
const connection = mysql.createConnection(credentials);

const service = express();
service.use(express.json());

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
service.get("/", function (req, res) {
  res.sendFile("/report.html"));
});

// Posts a song into
service.post("/songs/", (req, res) => {
  const parameters = [
    req.body.year,
    req.body.song_name,
    req.body.artist_name,
    req.body.genre,
    req.body.song_length,
  ];
  const query =
    "INSERT INTO songs(year, song_name, artist_name, genre, song_length) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, parameters, (error, result) => {
    if (error) {
      res.status(500);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
        results: result.insertId,
      });
    }
  });
});

service.get("/songs/", (req, res) => {
  const query = "SELECT * FROM songs WHERE is_deleted = 0";
  connection.query(query, (error, rows) => {
    if (error) {
      res.status(500);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
        results: rows.map(rowToSongs),
      });
    }
  });
});

service.get("/:genre/", (req, res) => {
  const params = [req.params.genre];
  const query = "SELECT * FROM songs WHERE genre = ? AND is_deleted = 0";
  connection.query(query, params, (error, rows) => {
    if (error) {
      res.status(500);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
        results: rows.map(rowToSongs),
      });
    }
  });
});

service.get("/songs/:artist_name/", (req, res) => {
  const params = [req.params.artist_name];
  const query = "SELECT * FROM songs WHERE artist_name = ? AND is_deleted = 0";
  connection.query(query, params, (error, rows) => {
    if (error) {
      res.status(500);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
        results: rows.map(rowToSongs),
      });
    }
  });
});

service.get("/:genre/:song_name/", (req, res) => {
  const params = [req.params.genre, req.params.song_name];
  const query =
    "SELECT * FROM songs WHERE genre = ? AND song_name = ? AND is_deleted = 0";
  connection.query(query, params, (error, rows) => {
    if (error) {
      res.status(500);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
        results: rows.map(rowToSongs),
      });
    }
  });
});

service.get("/songs/:genre/:artist_name/", (req, res) => {
  const params = [req.params.genre, req.params.artist_name];
  const query =
    "SELECT * FROM songs WHERE genre = ? AND artist_name = ?  AND is_deleted = 0";
  connection.query(query, params, (error, rows) => {
    if (error) {
      res.status(500);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
        results: rows.map(rowToSongs),
      });
    }
  });
});

service.patch("/songs/:id", (req, res) => {
  const params = [
    req.body.year,
    req.body.song_name,
    req.body.artist_name,
    req.body.genre,
    req.body.song_length,
    req.params.id,
  ];

  const query =
    "UPDATE songs SET year = ?, song_name = ?, artist_name = ?, genre = ?, song_length = ? WHERE id = ?";

  connection.query(query, params, (error, result) => {
    if (error) {
      res.status(500);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
      });
    }
  });
});

service.delete("/songs/:id", (req, res) => {
  const parameters = [req.params.id];

  const query = "UPDATE songs SET is_deleted = 1 WHERE id = ?";
  connection.query(query, parameters, (error, result) => {
    if (error) {
      res.status(404);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      res.json({
        ok: true,
      });
    }
  });
});

service.options("*", (req, res) => {
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.sendStatus(200);
});
