
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function LoginEn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Pizzametrix" 
      subtitle="Log in to manage your recipes"
      isEnglish={true}
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-cream">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-cream/20 text-cream placeholder:text-cream/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-cream">Password</Label>
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
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-cream"
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <p className="text-center text-sm text-cream/80">
          Don't have an account yet?{" "}
          <Link to="/sign-in" className="text-basil hover:text-basil/80 transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
