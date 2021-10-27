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
  res.send("Hello World!");
});

service.post("/songs/", (req, res) => {
  // res.json({
  //   requestBody: req.body,
  //});
  // if (
  //   req.body.hasOwnProperty("year") &&
  //   req.body.hasOwnProperty("song_name") &&
  //   req.body.hasOwnProperty("artist_name") &&
  //   req.body.hasOwnProperty("genre") &&
  //   req.body.hasOwnProperty("song_length")
  // ) {
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
  // } else {
  //   res.status(400);
  //   res.json({
  //     ok: false,
  //     results: "Incomplete song.",
  //   });
  //}
});

service.get("/songs/:genre/", (req, res) => {
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

service.get("/songs/:genre/:artist_name/", (req, res) => {
  const params = [req.params.genre, req.params.artist_name];
  const query =
    "SELECT * FROM songs WHERE genre = ? AND artist_name = ? AND is_deleted = 0";
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

service.get("/songs/:year/:genre/", (req, res) => {
  const params = [req.params.year];
  const query = "SELECT * FROM songs WHERE year = ? AND is_deleted = 0";
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

service.get("/songs/:song_name/", (req, res) => {
  const params = [req.params.song_name];
  const query = "SELECT * FROM songs WHERE song_name = ? AND is_deleted = 0";
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
        //results: rows.map(rowToSongs),
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

service.options("options", (request, response) => {
  response.set("Access-Control-Allow-Headers", "Content-Type");
  response.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  response.sendStatus(200);
});
