import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home.js";
import NewWizard from "./pages/NewWizard.js";
import Login from "./pages/Login.js";
import Welcome from "./pages/Welcome.js";
import Nav from "./components/Nav.js";
import WizardInfo from "./components/WizardInfo.js";
import AllSpells from "./pages/AllSpells.js";
import Layout from "./components/Layout.js";
import SignUp from "./pages/SignUp.js";

const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
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
                path: "/allSpells",
                element: <AllSpells />,
            },
        ],
    },

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/",
        element: <Welcome />,
    },
    {
        path: "/nav",
        element: <Nav />,
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
