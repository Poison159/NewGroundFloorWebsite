import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Team from './Pages/Team';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/Team" element={<Team />} />
            <Route path="/" element={<HomePage />}>
            </Route>
        </Routes>
    );
}

export default AppRouter;