import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createDestination } from "#db/queries/destinations";
import { createComment } from "#db/queries/comments";
   

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  ///create users
}
//create destinations

//create comments