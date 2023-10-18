import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Team from './Pages/Team';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route index element={<HomePage />} />
                <Route path="Team" element={<Team />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;