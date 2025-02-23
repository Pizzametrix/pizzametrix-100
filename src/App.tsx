
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/calculators/napolitaine" element={<NapolitainCalculator />} />
        <Route path="/calculators/teglia" element={<TegliaCalculator />} />
        <Route path="/mes-recettes" element={<MyRecipes />} />
        <Route path="/mes-recettes/:id" element={<RecipeDetail />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
