const dbSetup = require("./db/dbSetup");
const dotenv = require("dotenv");

//error handling of uncaughtException
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!  Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Environment configuration
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Database setup
dbSetup();

const port = 5000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
