import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Login from "pages/login";
import Signup from "pages/signup";
import { useAuthContext } from "hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: !user ? <Login /> : <Layout />,
      children: [
        {
          path: "/",
          element: user ? <Dashboard /> : <Navigate to="/login" replace />,
        },
        {
          path: "/dashboard",
          element: user ? <Dashboard /> : <Navigate to="/login" replace />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to="/dashboard" />,
        },
        {
          path: "/signup",
          element: !user ? <Signup /> : <Navigate to="/dashboard" />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
