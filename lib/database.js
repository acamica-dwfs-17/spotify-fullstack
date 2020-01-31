const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

const cwd = process.cwd();
const dbPath = path.join(cwd, "data", "db.json");
const adapter = new FileSync(dbPath);

const db = low(adapter);
db.defaults({ users: [] }).write();

module.exports = db;
