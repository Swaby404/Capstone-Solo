
import express from "express";
const router = express.Router();
export default router;


import { createMood, getMoods  } from "#db/queries/mood";
 

router
.route("/").get(async (req, res) => {
  try {
    const moods = await getMoods();
    res.send(moods);
  } catch (err) {
    res.status(500).send("Server error.");
  }
});


router.route("/:id").get(async (req, res) => {
  try {
    const mood = await createMood(req.params.id);
    if (!mood) return res.status(404).send("Mood not found.");
    res.send(mood);
  } catch (err) {
    res.status(500).send("Server error.");
  }
});

 

 