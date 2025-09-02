// src/pages/MatchDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatch, updateMatch } from "../services/MatchService";

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

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

  const handleAddRun = async (runs) => {
    await updateMatch(id, { runs });
    fetchMatch();
  };

  const handleWicket = async () => {
    await updateMatch(id, { isWicket: true });
    fetchMatch();
  };

  if (!match) return <h3 className="text-center mt-5">Loading...</h3>;

  const battingTeam =
    match.battingTeam === "team1" ? match.team1 : match.team2;

  const striker = battingTeam?.players?.[match.strikerIndex] || {};
  const nonStriker = battingTeam?.players?.[match.nonStrikerIndex] || {};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg mb-4">
            <div className="card-body text-center">
              <h3 className="card-title text-success fw-bold">
                {battingTeam?.name} Batting
              </h3>
              <h4 className="mt-3">
                <span className="badge bg-dark p-2">
                  {match.score?.runs}/{match.score?.wickets}
                </span>{" "}
                in {Math.floor(match.score?.balls / 6)}.{match.score?.balls % 6} overs
              </h4>
              <h6 className="text-muted mt-2">
                Current Bowler:{" "}
                <span className="fw-semibold">
                  {match.currentBowler || "Not Set"}
                </span>
              </h6>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card border-success shadow-sm">
                <div className="card-body">
                  <h5 className="text-success">🟢 Striker</h5>
                  <p className="fw-bold">{striker?.name || "N/A"}</p>
                  <small className="text-muted">
                    {striker?.runs || 0} runs, {striker?.balls || 0} balls
                  </small>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-primary shadow-sm">
                <div className="card-body">
                  <h5 className="text-primary">🔵 Non-Striker</h5>
                  <p className="fw-bold">{nonStriker?.name || "N/A"}</p>
                  <small className="text-muted">
                    {nonStriker?.runs || 0} runs, {nonStriker?.balls || 0} balls
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="mb-3">Update Ball</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleAddRun(1)}
                >
                  1 Run
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleAddRun(4)}
                >
                  Four
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleAddRun(6)}
                >
                  Six
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleAddRun(0)}
                >
                  Dot Ball
                </button>
                <button className="btn btn-dark" onClick={handleWicket}>
                  Wicket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
