const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com",
  port: 4000,
  user: "2XAUE9LFxZSHNq3.root",
  password: "EsIIvtaj1sPtchRW",
  database: "afroflame",
  ssl: {
    rejectUnauthorized: true
  }
});

db.connect(err => {
  if (err) {
    console.log("❌ DB connection failed:", err);
  } else {
    console.log("Connected to TiDB successfully");
  }
});

module.exports = db;