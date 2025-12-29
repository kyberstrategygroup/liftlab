import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminSetup from './pages/AdminSetup';
import Home from './pages/Home';
import Memberships from './pages/Memberships';
import Schedule from './pages/Schedule';
import Services from './pages/Services';
import Team from './pages/Team';
import TrainerDetail from './pages/TrainerDetail';
import StartNow from './pages/StartNow';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminDashboard": AdminDashboard,
    "AdminSetup": AdminSetup,
    "Home": Home,
    "Memberships": Memberships,
    "Schedule": Schedule,
    "Services": Services,
    "Team": Team,
    "TrainerDetail": TrainerDetail,
    "StartNow": StartNow,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};