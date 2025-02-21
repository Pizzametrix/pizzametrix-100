
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudonyme, setPseudonyme] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            pseudonyme: pseudonyme
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Mise à jour du pseudonyme dans la table utilisateurs
        const { error: updateError } = await supabase
          .from('utilisateurs')
          .update({ pseudonyme: pseudonyme })
          .eq('id', data.user.id);

        if (updateError) {
          console.error("Erreur lors de la mise à jour du pseudonyme:", updateError);
        }

        toast.success("Inscription réussie! Vérifiez votre email pour confirmer votre compte.");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      toast.error(error.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Créer un compte" 
      subtitle="Rejoignez Pizzametrix pour créer vos recettes"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div className="space-y-2">
          <Label htmlFor="pseudonyme" className="text-cream">Pseudonyme</Label>
          <Input
            id="pseudonyme"
            type="text"
            placeholder="Votre pseudonyme"
            value={pseudonyme}
            onChange={(e) => setPseudonyme(e.target.value)}
            required
            className="bg-white/10 border-cream/20 text-cream placeholder:text-cream/50"
          />
        </div>
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
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-cream"
        >
          {loading ? "Création..." : "Créer un compte"}
        </Button>
        <p className="text-center text-sm text-cream/80">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-basil hover:text-basil/80 transition-colors">
            Se connecter
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
