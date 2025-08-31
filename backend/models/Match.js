const mongoose = require("mongoose");


const playerSchema = new mongoose.Schema({
name: { type: String, required: true },
runs: { type: Number, default: 0 },
balls: { type: Number, default: 0 },
fours: { type: Number, default: 0 },
sixes: { type: Number, default: 0 },
isOut: { type: Boolean, default: false },
outDesc: { type: String, default: "" }
});


const teamSchema = new mongoose.Schema({
name: { type: String, default: "Team" },
players: { type: [playerSchema], default: [] }
});


const extrasSchema = new mongoose.Schema({
wides: { type: Number, default: 0 },
noBalls: { type: Number, default: 0 },
byes: { type: Number, default: 0 },
legByes: { type: Number, default: 0 }
});


const scoreSchema = new mongoose.Schema({
runs: { type: Number, default: 0 },
wickets: { type: Number, default: 0 },
balls: { type: Number, default: 0 }, // total legal balls in this innings
extras: { type: extrasSchema, default: () => ({}) }
});


const matchSchema = new mongoose.Schema(
{
team1: { type: teamSchema, required: true },
team2: { type: teamSchema, required: true },


oversLimit: { type: Number, default: 10 },


currentInning: { type: Number, default: 1 }, // 1 or 2
battingTeam: { type: String, enum: ["team1", "team2"], default: "team1" },
bowlingTeam: { type: String, enum: ["team1", "team2"], default: "team2" },


strikerIndex: { type: Number, default: -1 },
nonStrikerIndex: { type: Number, default: -1 },
currentBowler: { type: String, default: "" },


score: { type: scoreSchema, default: () => ({}) },


isCompleted: { type: Boolean, default: false },
result: { type: String, default: "" }
},
{ timestamps: true }
);


module.exports = mongoose.model("Match", matchSchema);