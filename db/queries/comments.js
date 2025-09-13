import db from "#db/client";


export async function createComment({user_id, destination_id, content, created_at}) {
  const sql = `
  INSERT INTO comments
    (user_id, destination_id, content, created_at)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [comment],
  } = await db.query(sql, [user_id, destination_id, content, created_at]);
  return comment;
}



export async function getComment({user_id, destination_id, content, created_at}) {
  const sql = `
  SELECT *
  FROM comments
  WHERE user_id = $1
    AND destination_id = $2
    AND content = $3
    AND created_at = $4
  `;
  const { rows: comments } = await db.query(sql, [user_id, destination_id, content, created_at]);
  return comments;
}

export async function getAllComments() {
  const sql = `
  SELECT *
  FROM comments
  `;
  const { rows: comments } = await db.query(sql);
  return comments;
}