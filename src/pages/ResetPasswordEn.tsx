
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResetPasswordEn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending an email for now
    setTimeout(() => {
      toast.success("If an account exists with this email, you'll receive reset instructions.");
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Reset password" 
      subtitle="Enter your email to receive instructions"
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
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-cream"
        >
          {loading ? "Sending..." : "Send reset instructions"}
        </Button>
        <p className="text-center text-sm text-cream/80">
          <Link to="/login-en" className="text-basil hover:text-basil/80 transition-colors">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
