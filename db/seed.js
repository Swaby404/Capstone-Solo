import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createComment } from "#db/queries/comments";
import { createDestination } from "#db/queries/destinations";
import bcrypt from "bcrypt";

(async () => {
  await db.connect();
  await seed();
  await db.end();
  console.log("🌱 Database seeded.");
})();

async function seed() {
  // create User
  const password_hash = await bcrypt.hash("password123", 100);
  const user = await createUser("user", password_hash);
  if (!user || !user.id) {
    throw new Error("User creation failed");
  }

  // create 8 destinations for the user with images
  const destinations = [{'name': 'Japan', 'image': 'japan.jpg'}, {'name': 'England', 'image': 'england.jpg'}, {'name': 'United States', 'image': 'usa.jpg'}, {'name': 'Nigeria', 'image': 'nigeria.jpg'}, {'name': 'Cayman Islands', 'image': 'cayman.jpg'}, {'name': 'Singapore', 'image': 'singapore.jpg'}, {'name': 'Nepal', 'image': 'nepal.jpg'}, {'name': 'Italy', 'image': 'italy.jpg'}];
  for (let i = 0; i < destinations.length; i++) {
    const destinationName = destinations[i].name;
    const destinationImage = destinations[i].image;
    try {
      // create destination for the user
      const destination = await createDestination({ user_id: user.id, name: destinationName, image: destinationImage });
      if (!destination || !destination.id) {
        throw new Error(`Destination creation failed for ${destinationName}`);
      }
      console.log(`Seeded destination (${i}): ${destinationName}`);

      // each destination should have 5 comments
      for (let j = 1; j <= 5; j++) {
        const comment = {
          user_id: user.id,
          destination_id: destination.id,
          content: faker.lorem.sentence(),
        };
        const createdComment = await createComment(comment);
        if (!createdComment || !createdComment.id) {
          throw new Error("Comment creation failed");
        }
      }
    } catch (error) {
      console.error(`Error seeding destination ${destinationName}:`, error);
    }
  }
}
