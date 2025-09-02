// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMatch, setBatsmen, updateBowler } from "../services/MatchService";

export default function AdminPanel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");

  useEffect(() => {
    fetchMatch();
  }, []);

  const fetchMatch = async () => {
    try {
      const data = await getMatch(id);
      setMatch(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetBatsmen = async () => {
    await setBatsmen(id, striker, nonStriker);
    setStriker("");
    setNonStriker("");
    fetchMatch();
  };

  const handleSetBowler = async () => {
    await updateBowler(id, bowler);
    setBowler("");
    fetchMatch();
  };

  if (!match) return <p className="text-center mt-5">⏳ Loading Match...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4 rounded-4">
        <h2 className="text-center text-primary fw-bold mb-2">⚡ Admin Panel</h2>
        <h5 className="text-center text-muted mb-4">
          {match.team1?.name} 🆚 {match.team2?.name}
        </h5>

        <div className="bg-light p-3 rounded-3 mb-4">
          <h4 className="text-success fw-bold mb-3">📝 Set Batsmen</h4>
          <input
            className="form-control mb-2"
            placeholder="Striker Name"
            value={striker}
            onChange={(e) => setStriker(e.target.value)}
          />
          <input
            className="form-control mb-3"
            placeholder="Non-Striker Name"
            value={nonStriker}
            onChange={(e) => setNonStriker(e.target.value)}
          />
          <button className="btn btn-success w-100" onClick={handleSetBatsmen}>
            ✅ Confirm Batsmen
          </button>
        </div>

        <div className="bg-light p-3 rounded-3">
          <h4 className="text-warning fw-bold mb-3">🎯 Set Bowler</h4>
          <input
            className="form-control mb-3"
            placeholder="Bowler Name"
            value={bowler}
            onChange={(e) => setBowler(e.target.value)}
          />
          <button className="btn btn-warning w-100" onClick={handleSetBowler}>
            🎯 Confirm Bowler
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-primary w-100 fw-bold"
            onClick={() => navigate(`/match/${id}`)}
          >
            📊 View Match Details
          </button>
        </div>
      </div>
    </div>
  );
}
