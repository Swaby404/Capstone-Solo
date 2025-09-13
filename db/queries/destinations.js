import db from "#db/client";


export async function createDestination({user_Id, name, description, created_at}) {
  const sql = `
  INSERT INTO destinations
    (user_id, name, description, created_at)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [destination],
  } = await db.query(sql, [user_Id, name, description, created_at]);
  return destination;
}

export async function getUserDestinations(user_id) {
  const sql = `
  SELECT *
  FROM destinations
  WHERE user_id = $1
  `;
  const { rows: userActivities } = await db.query(sql, [user_id]);
  return userActivities;
}
 

