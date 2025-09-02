import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Team from './Pages/Team';
import IPhoneMockupPage from './Pages/IphoneMockup';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/Team" element={<Team />} />
            <Route path="/iphone-mockup" element={<IPhoneMockupPage />}></Route>
            <Route path="/" element={<HomePage />}>
            </Route>
        </Routes>
    );
}

export default AppRouter;