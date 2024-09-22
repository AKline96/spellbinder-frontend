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
import ProtectedRoute from "./components/ProtectedRoutes.js";

const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/newWizard",
                element: (
                    <ProtectedRoute>
                        <NewWizard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/viewWizard/:id",
                element: (
                    <ProtectedRoute>
                        <WizardInfo />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/allSpells",
                element: (
                    <ProtectedRoute>
                        <AllSpells />
                    </ProtectedRoute>
                ),
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
        path: "/welcome",
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
