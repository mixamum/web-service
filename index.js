const fs = require("fs");
const mysql = require("mysql");
const express = require("express");

const json = fs.readFileSync("credentials.json", "utf8");
const credentials = JSON.parse(json);

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

function rowToMemory(row) {
  return {
    id: row.id,
    year: row.year,
    month: row.month,
    day: row.day,
    entry: row.entry,
  };
}

service.get("/memories/:month/:day", (request, response) => {
  // issue select query
  const parameters = [
    parseInt(request.params.month),
    parseInt(request.params.day),
  ];

  const query =
    "SELECT * FROM memory WHERE month = ? AND day = ? AND is_deleted = 0 ORDER BY year DESC";
  connection.query(query, parameters, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const memories = rows.map(rowToMemory);
      response.json({
        ok: true,
        results: rows.map(rowToMemory),
      });
    }
  });
});

// const selectQuery = "SELECT * FROM memory";
// connection.query(selectQuery, (error, rows) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(rows);
//   }
// });
// connection.end();
