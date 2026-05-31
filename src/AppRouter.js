import {Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Team from './Pages/Team';
import IPhoneMockupPage from './Pages/IphoneMockup';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import SwipeCardsPage from './Pages/SwipeCardsPage';
import WebCarouselPage from './Pages/WebCarouselPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/Team" element={<Team />} />
            <Route path="/Privacy Policy" element={<PrivacyPolicy />} />
            <Route path="/iphone-mockup" element={<IPhoneMockupPage />}></Route>
            <Route path="/analytics" element={<SwipeCardsPage />} />
            <Route path="/websites" element={<WebCarouselPage />} />
            <Route path="/" element={<HomePage />}>
            </Route>
        </Routes>
    );
}

export default AppRouter;
