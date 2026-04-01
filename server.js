const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 4101;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment3_app1"
});

app.get("/products", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, image, price FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App 1 server running on http://localhost:${PORT}`);
});
