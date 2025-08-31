// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMatches } from "../services/matchService";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMatches()
      .then((res) => setMatches(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-primary fw-bold mb-4">🏏 All Matches</h2>

      {matches.length === 0 ? (
        <p className="text-muted">No matches available</p>
      ) : (
        <div className="row">
          {matches.map((match) => (
            <div className="col-md-6 mb-3" key={match._id}>
              <div className="card shadow-sm p-3 h-100">
                <h5>
                  {match.team1?.name} <span className="text-danger">vs</span>{" "}
                  {match.team2?.name}
                </h5>
                <p className="text-muted mb-2">
                  Runs: {match.score?.runs || 0} | Wickets:{" "}
                  {match.score?.wickets || 0} | Balls: {match.score?.balls || 0}
                </p>
                <button
                  onClick={() => navigate(`/match/${match._id}`)}
                  className="btn btn-primary w-100"
                >
                  📊 View Match
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
