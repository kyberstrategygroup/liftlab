import About from './pages/About';
import Home from './pages/Home';
import Memberships from './pages/Memberships';
import Schedule from './pages/Schedule';
import Services from './pages/Services';
import StartNow from './pages/StartNow';
import Team from './pages/Team';
import TrainerDetail from './pages/TrainerDetail';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Home": Home,
    "Memberships": Memberships,
    "Schedule": Schedule,
    "Services": Services,
    "StartNow": StartNow,
    "Team": Team,
    "TrainerDetail": TrainerDetail,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};