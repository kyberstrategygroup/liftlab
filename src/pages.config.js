import Home from './pages/Home';
import StartNow from './pages/StartNow';
import Services from './pages/Services';
import Memberships from './pages/Memberships';
import Team from './pages/Team';
import TrainerDetail from './pages/TrainerDetail';
import Schedule from './pages/Schedule';
import About from './pages/About';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "StartNow": StartNow,
    "Services": Services,
    "Memberships": Memberships,
    "Team": Team,
    "TrainerDetail": TrainerDetail,
    "Schedule": Schedule,
    "About": About,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};