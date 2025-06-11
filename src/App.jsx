import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Login from "./pages/Login.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Account from "./pages/Account.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking.jsx";
import Checkin from "./pages/Checkin.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

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
      { path: "/booking/:bookingId", element: <Booking /> },
      { path: "/checkin/:bookingId", element: <Checkin /> },
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
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          loading: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: 'theme("colors.indigo.600")',
            color: 'theme("colors.gray.700")',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
