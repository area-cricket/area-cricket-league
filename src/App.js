import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import ListPlayers from "./Listing";
import AppContext from "./contexts/Context";

export default function App() {
  return (
    <AppContext>
      <Routes>
        <Route path="" element={<Registration />} />
        <Route path="/players" element={<ListPlayers />} />
      </Routes>
    </AppContext>
  );
}
