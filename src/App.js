import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home.js";
import NewWizard from "./pages/NewWizard.js";
import Login from "./pages/Login.js";
import Welcome from "./pages/Welcome.js";
import Nav from "./components/Nav.js";
import WizardInfo from "./components/WizardInfo.js";
import AllSpells from "./pages/AllSpells.js";

const myRoutes = createBrowserRouter([
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/newWizard",
        element: <NewWizard />,
    },
    {
        path: "/viewWizard/:id",
        element: <WizardInfo />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Welcome />,
    },
    {
        path: "/nav",
        element: <Nav />,
    },
    {
        path: "/allSpells",
        element: <AllSpells />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={myRoutes} />
        </div>
    );
}

export default App;
