const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`AfroFlame running on ${PORT}`);
});

app.post("/api/reservations", (req, res) => {
  const { name, phone, date, time, guests } = req.body;

  const sql = `
    INSERT INTO reservations (name, phone, date, time, guests)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, date, time, guests], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving reservation");
    }

    res.json({ message: "Reservation saved!" });
  });
});

const bcrypt = require("bcrypt");

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error registering user");
    }

    res.json({ message: "User registered!" });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).send("Error");

    if (results.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = results[0];

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return res.status(400).send("Wrong password");
    }

    res.json({ message: "Login successful", user });
  });
});

app.get("/api/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching orders");
    }
    res.json(results);
  });
});

app.get("/api/reservations", (req, res) => {
  db.query("SELECT * FROM reservations ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching reservations");
    }
    res.json(results);
  });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error");
    }

    if (results.length > 0) {
      res.json({
        success: true,
        admin: results[0]
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials"
      });
    }
  });
});


