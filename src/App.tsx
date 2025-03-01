
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Calculators from "./pages/Calculators";
import NapolitainCalculator from "./pages/NapolitainCalculator";
import TegliaCalculator from "./pages/TegliaCalculator";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/calculators/neapolitan" element={<NapolitainCalculator />} />
        <Route path="/calculators/teglia" element={<TegliaCalculator />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/my-recipes/:id" element={<RecipeDetail />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/" element={<Home />} />
        
        {/* Redirections des anciennes routes vers les nouvelles */}
        <Route path="/mes-recettes" element={<Navigate to="/my-recipes" replace />} />
        <Route path="/mes-recettes/:id" element={<Navigate to={window.location.pathname.replace('/mes-recettes/', '/my-recipes/')} replace />} />
        <Route path="/calculators/napolitaine" element={<Navigate to="/calculators/neapolitan" replace />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
