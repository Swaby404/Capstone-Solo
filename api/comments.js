 import express from "express";
 const router = express.Router();

 export default router;

 import { createUserActivity, getUserActivities, getUserById} from "#db/queries/user_activities";

 import requireUser from "#middleware/requireUser";
 router.use(requireUser);

 router.get("/", async (req, res) => {
   try {
     const activities = await getUserActivities(req.user.id);
     res.send(activities);
   } catch (err) {
     res.status(500).send("Server error.");
   }
 });

 router.post("/", async (req, res) => {
   try {
     const activity = await createUserActivity(req.user.id, req.body);
     res.status(201).send(activity);
   } catch (err) {
     res.status(500).send("Server error.");
   }
 });

 router.get("/:id", async (req, res) => {
   try {
     const activity = await getUserById(req.params.id);
     if (!activity) return res.status(404).send("Activity not found.");
     res.send(activity);
   } catch (err) {
     res.status(500).send("Server error.");
   }
 });