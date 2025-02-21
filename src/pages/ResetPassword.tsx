
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulons l'envoi d'un email pour le moment
    setTimeout(() => {
      toast.success("Si un compte existe avec cet email, vous recevrez les instructions de réinitialisation.");
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Réinitialiser le mot de passe" 
      subtitle="Entrez votre email pour recevoir les instructions"
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
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-cream"
        >
          {loading ? "Envoi..." : "Envoyer les instructions"}
        </Button>
        <p className="text-center text-sm text-cream/80">
          <Link to="/login" className="text-basil hover:text-basil/80 transition-colors">
            Retour à la connexion
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
