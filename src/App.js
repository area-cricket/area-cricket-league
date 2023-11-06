import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import ListPlayers from "./Listing";
import AppContext from "./contexts/Context";
import RegistrationCopy from "./AdminRegistration";

export default function App() {
  return (
    <AppContext>
      <Routes>
        <Route path="" element={<Registration />} />
        <Route path="/players" element={<ListPlayers />} />
        <Route path="/register" element={<RegistrationCopy />} />
      </Routes>
    </AppContext>
  );
}
