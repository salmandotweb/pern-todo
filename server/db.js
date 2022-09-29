const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "salman@4200",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
