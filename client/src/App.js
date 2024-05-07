import {BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetCred from "./components/ResetCred";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import Reports from "./components/Reports";
import ListExpenses from "./components/expenses/ListExpenses";
import Income from "./components/income/Income";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BudgetManagementPage from "./components/budget/BudgetManagementPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />

                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
                <Route path="/change_password" element={<ProtectedRoute element={ResetCred} />} />
                <Route path="/reports" element={<ProtectedRoute element={Reports} />} />
                <Route path="/dashboard" element={<ProtectedRoute element={DashboardOverview} />} />
                <Route path="/expense" element={<ProtectedRoute element={ListExpenses} />} />
                <Route path="/income" element={<ProtectedRoute element={Income} />} />
                <Route path="/categories" element={<ProtectedRoute element={BudgetManagementPage} />} />

            </Routes>
        </BrowserRouter>
    );
}
export default App;