const express = require("express");
const {
  createMatch,
  getMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  setBatsmen,
  updateBowler,
} = require("../controllers/matchController");

const router = express.Router();

router.post("/start", createMatch);          // start match
router.post("/", createMatch);               // create new match
router.get("/", getMatches);                 // all matches
router.get("/:id", getMatchById);            // match by ID
router.put("/:id", updateMatch);             // update match
router.delete("/:id", deleteMatch);          // delete match

// ✅ New routes for AdminPanel
router.post("/:id/setBatsmen", setBatsmen);
router.post("/:id/setBowler", updateBowler);

module.exports = router;
