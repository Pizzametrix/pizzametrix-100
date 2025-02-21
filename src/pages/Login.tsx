
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulons une connexion pour le moment
    setTimeout(() => {
      toast.success("Connexion réussie!");
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Pizzametrix" 
      subtitle="Connectez-vous pour gérer vos recettes"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-cream">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-cream/20 text-cream placeholder:text-cream/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-cream">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/10 border-cream/20 text-cream"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link to="/reset-password" className="text-basil hover:text-basil/80 transition-colors">
            Mot de passe oublié ?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-cream"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
        <p className="text-center text-sm text-cream/80">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-basil hover:text-basil/80 transition-colors">
            S'inscrire
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
