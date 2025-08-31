// src/services/matchService.js
import axios from "axios";

const API = "http://localhost:5000/api/matches";

export const startMatch = (team1Name, team2Name, oversLimit = 10) => {
  return axios.post(`${API}/start`, { team1Name, team2Name, oversLimit });
};

export const getMatch = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data;
};

export const setBatsmen = async (id, striker, nonStriker) => {
  const { data } = await axios.post(`${API}/${id}/setBatsmen`, {
    striker,
    nonStriker,
  });
  return data;
};

export const updateBowler = async (id, bowler) => {
  const { data } = await axios.post(`${API}/${id}/setBowler`, { bowler });
  return data;
};

export const getMatches = () => axios.get(API);

export const updateMatch = (id, payload) =>
  axios.put(`${API}/${id}`, payload);

export const deleteMatch = (id) => axios.delete(`${API}/${id}`);
