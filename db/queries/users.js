import bcrypt from "bcrypt";
import db from "../client.js";

export async function createUser(username, password_hash, email) {
  const sql = `
  INSERT INTO users
    (username, password_hash, email)
  VALUES
    ($1, $2, $3)
  RETURNING * ;
  `;
  const password_hash = await bcrypt.hash(password_hash, 100); 
  const {
    rows: [user],
  } = await db.query(sql, [username, password_hash, email]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const { rows } = await db.query(sql, [username]);
  const user = rows[0];
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  return user;
}
export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const { rows } = await db.query(sql, [id]);
  return rows[0];
}