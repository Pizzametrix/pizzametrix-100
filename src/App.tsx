import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { UpdateNotification } from "@/components/UpdateNotification";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import LandingFr from "./pages/LandingFr";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Calculators from "./pages/Calculators";
import NapolitainCalculator from "./pages/NapolitainCalculator";
import TegliaCalculator from "./pages/TegliaCalculator";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <UpdateNotification />
      <Routes>
        {/* Routes publiques */}
        <Route path="/fr" element={<LandingFr />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Routes protégées */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/calculators" element={
          <ProtectedRoute>
            <Calculators />
          </ProtectedRoute>
        } />
        <Route path="/calculators/neapolitan" element={
          <ProtectedRoute>
            <NapolitainCalculator />
          </ProtectedRoute>
        } />
        <Route path="/calculators/teglia" element={
          <ProtectedRoute>
            <TegliaCalculator />
          </ProtectedRoute>
        } />
        <Route path="/my-recipes" element={
          <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
        } />
        <Route path="/my-recipes/:id" element={
          <ProtectedRoute>
            <RecipeDetail />
          </ProtectedRoute>
        } />
        
        {/* Route par défaut */}
        <Route path="/" element={<Navigate to="/fr" replace />} />
        
        {/* Redirections des anciennes routes vers les nouvelles */}
        <Route path="/mes-recettes" element={<Navigate to="/my-recipes" replace />} />
        <Route path="/mes-recettes/:id" element={<Navigate to={window.location.pathname.replace('/mes-recettes/', '/my-recipes/')} replace />} />
        <Route path="/calculators/napolitaine" element={<Navigate to="/calculators/neapolitan" replace />} />
        <Route path="/profil" element={<Navigate to="/home" replace />} />
        
        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
