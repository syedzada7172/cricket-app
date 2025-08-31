const Match = require("../models/Match");

// ✅ Start new match
exports.createMatch = async (req, res) => {
  try {
    const { team1Name, team2Name, oversLimit } = req.body;

    const newMatch = new Match({
      team1: { name: team1Name, players: [] },
      team2: { name: team2Name, players: [] },
      oversLimit,
    });

    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all matches
exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get match by ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update match ball by ball
exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { runs = 0, isWicket = false } = req.body;

    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: "Match not found" });

    // Find batting team
    const battingTeam =
      match.battingTeam === "team1" ? match.team1 : match.team2;

    // Striker player
    const striker = battingTeam.players[match.strikerIndex];

    if (!striker) {
      return res.status(400).json({ message: "Striker not set" });
    }

    // Update striker stats
    striker.runs += runs;
    striker.balls += 1;

    // Update team score
    match.score.runs += runs;
    match.score.balls += 1;

    if (isWicket) {
      striker.isOut = true;
      match.score.wickets += 1;
    }

    // ✅ Rotate strike if odd runs scored (1, 3, 5...)
    if (runs % 2 !== 0) {
      let temp = match.strikerIndex;
      match.strikerIndex = match.nonStrikerIndex;
      match.nonStrikerIndex = temp;
    }

    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete match
exports.deleteMatch = async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: "Match deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Set Batsmen
exports.setBatsmen = async (req, res) => {
  try {
    const { id } = req.params;
    const { strikerName, nonStrikerName } = req.body;

    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: "Match not found" });

    const battingTeam =
      match.battingTeam === "team1" ? match.team1 : match.team2;

    // Add players if not already
    battingTeam.players.push({ name: strikerName, runs: 0, balls: 0 });
    match.strikerIndex = battingTeam.players.length - 1;

    battingTeam.players.push({ name: nonStrikerName, runs: 0, balls: 0 });
    match.nonStrikerIndex = battingTeam.players.length - 1;

    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Set Bowler
exports.updateBowler = async (req, res) => {
  try {
    const { id } = req.params;
    const { bowlerName } = req.body;

    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.currentBowler = bowlerName;

    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const Match = require("../models/Match");

// // Create a new match
// const createMatch = async (req, res) => {
//   try {
//     const { team1Name, team2Name, oversLimit } = req.body;

//     const newMatch = new Match({
//       team1: { name: team1Name, players: [] },
//       team2: { name: team2Name, players: [] },
//       oversLimit,
//     });

//     const savedMatch = await newMatch.save();
//     res.status(201).json(savedMatch);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating match", error: error.message });
//   }
// };

// // Get all matches
// const getMatches = async (req, res) => {
//   try {
//     const matches = await Match.find();
//     res.json(matches);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching matches", error: error.message });
//   }
// };

// // Get match by ID
// const getMatchById = async (req, res) => {
//   try {
//     const match = await Match.findById(req.params.id);
//     if (!match) return res.status(404).json({ message: "Match not found" });
//     res.json(match);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching match", error: error.message });
//   }
// };

// // ✅ FIXED: Update match (score, players, wickets, etc.)
// const updateMatch = async (req, res) => {
//   try {
//     const { runs = 0, wicket = false, extras = null, striker, nonStriker, bowler } = req.body;

//     const match = await Match.findById(req.params.id);
//     if (!match) return res.status(404).json({ message: "Match not found" });

//     // ✅ Update score
//     if (extras === "wide") {
//       match.score.runs += runs;
//       match.score.extras.wides += runs;
//     } else if (extras === "noball") {
//       match.score.runs += runs;
//       match.score.extras.noBalls += runs;
//     } else {
//       // Legal delivery
//       match.score.runs += runs;
//       match.score.balls += 1;
//     }

//     // ✅ Handle wicket
//     if (wicket) {
//       match.score.wickets += 1;
//     }

//     // ✅ Update current players
//     if (striker) {
//       const idx = match.team1.players.findIndex(p => p.name === striker);
//       if (idx === -1) match.team1.players.push({ name: striker });
//       match.strikerIndex = match.team1.players.findIndex(p => p.name === striker);
//     }

//     if (nonStriker) {
//       const idx = match.team1.players.findIndex(p => p.name === nonStriker);
//       if (idx === -1) match.team1.players.push({ name: nonStriker });
//       match.nonStrikerIndex = match.team1.players.findIndex(p => p.name === nonStriker);
//     }

//     // ✅ Update bowler
//     if (bowler) {
//       match.currentBowler = bowler;
//     }

//     await match.save();
//     res.json(match);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating match", error: error.message });
//   }
// };

// // Delete match
// const deleteMatch = async (req, res) => {
//   try {
//     const deleted = await Match.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Match not found" });
//     res.json({ message: "Match deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting match", error: error.message });
//   }
// };

// // Set Batsmen (striker & non-striker)
// const setBatsmen = async (req, res) => {
//   try {
//     const { striker, nonStriker } = req.body;
//     const match = await Match.findById(req.params.id);
//     if (!match) return res.status(404).json({ message: "Match not found" });

//     const strikerIndex = match.team1.players.findIndex(p => p.name === striker);
//     const nonStrikerIndex = match.team1.players.findIndex(p => p.name === nonStriker);

//     if (strikerIndex === -1) match.team1.players.push({ name: striker });
//     if (nonStrikerIndex === -1) match.team1.players.push({ name: nonStriker });

//     match.strikerIndex = match.team1.players.findIndex(p => p.name === striker);
//     match.nonStrikerIndex = match.team1.players.findIndex(p => p.name === nonStriker);

//     await match.save();
//     res.json(match);
//   } catch (error) {
//     res.status(500).json({ message: "Error setting batsmen", error: error.message });
//   }
// };

// // Update current bowler
// const updateBowler = async (req, res) => {
//   try {
//     const { bowler } = req.body;
//     const match = await Match.findById(req.params.id);
//     if (!match) return res.status(404).json({ message: "Match not found" });

//     match.currentBowler = bowler;
//     await match.save();
//     res.json(match);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating bowler", error: error.message });
//   }
// };

// module.exports = {
//   createMatch,
//   getMatches,
//   getMatchById,
//   updateMatch,
//   deleteMatch,
//   setBatsmen,
//   updateBowler,
// };
