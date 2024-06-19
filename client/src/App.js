import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Login from "pages/login";
import Signup from "pages/signup";
import { useAuthContext } from "hooks/useAuthContext";
// Import the provider

function App() {
  const { user } = useAuthContext();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  user ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/dashboard"
                element={
                  user ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
            </Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/dashboard" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
