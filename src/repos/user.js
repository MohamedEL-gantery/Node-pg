const pool = require("../pool");
const convert = require("./utils/camelCase");

class User {
  static async Create(username, bio) {
    const { rows } = await pool.query(
      `INSERT INTO users (username ,bio) VALUES($1 , $2) RETURNING *;`,
      [username, bio]
    );

    return convert(rows)[0];
  }
  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    return convert(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id=$1;`, [id]);

    return convert(rows)[0];
  }

  static async findByIdAndUpdate(username, bio, id) {
    const { rows } = await pool.query(
      `UPDATE users SET username=$1,bio=$2 WHERE id=$3 RETURNING *;`,
      [username, bio, id]
    );
    return convert(rows)[0];
  }

  static async findByIdAndDelete(id) {
    const { rows } = await pool.query(
      `DELETE FROM users WHERE id=$1  RETURNING *;`,
      [id]
    );

    return convert(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query(`SELECT COUNT(*) FROM users ;`);
    return parseInt(rows[0].count);
  }
}

module.exports = User;
