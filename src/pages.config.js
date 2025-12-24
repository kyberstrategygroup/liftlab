import Home from './pages/Home';
import StartNow from './pages/StartNow';
import Services from './pages/Services';
import Memberships from './pages/Memberships';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "StartNow": StartNow,
    "Services": Services,
    "Memberships": Memberships,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};