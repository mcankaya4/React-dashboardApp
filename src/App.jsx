import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Account from "./pages/Account.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace={true} to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/cabins", element: <Cabins /> },
      { path: "/users", element: <Users /> },
      { path: "/settings", element: <Settings /> },
      { path: "/account", element: <Account /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
