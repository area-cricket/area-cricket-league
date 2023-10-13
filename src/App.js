import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import ListPlayers from "./Listing";

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Registration />} />
      <Route path="/players" element={<ListPlayers />} />
    </Routes>
  );
}
