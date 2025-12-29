import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminSetup from './pages/AdminSetup';
import Home from './pages/Home';
import Memberships from './pages/Memberships';
import Schedule from './pages/Schedule';
import Services from './pages/Services';
import StartNow from './pages/StartNow';
import Team from './pages/Team';
import TrainerDetail from './pages/TrainerDetail';
import ChallengeApplication from './pages/ChallengeApplication';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminDashboard": AdminDashboard,
    "AdminSetup": AdminSetup,
    "Home": Home,
    "Memberships": Memberships,
    "Schedule": Schedule,
    "Services": Services,
    "StartNow": StartNow,
    "Team": Team,
    "TrainerDetail": TrainerDetail,
    "ChallengeApplication": ChallengeApplication,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};