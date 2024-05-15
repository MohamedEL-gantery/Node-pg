const app = require("./src/app");
const pool = require("./src/pool");

pool
  .connect({
    host: "localhost",
    port: 5432,
    database: "facebook",
    user: "postgres",
    password: "123789",
  })
  .then(() => {
    app().listen(3000, () => {
      console.log("server listening on port 3000");
    });
  })
  .catch((err) => console.error(err));
