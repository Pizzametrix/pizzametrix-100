
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Camera, User, Save, Pencil, Check } from "lucide-react";
import { Sidebar } from "@/components/layouts/Sidebar";

export default function Profile() {
  const navigate = useNavigate();
  const [pseudonyme, setPseudonyme] = useState("");
  const [niveau, setNiveau] = useState("");
  const [four, setFour] = useState("");
  const [petrin, setPetrin] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from('utilisateurs')
        .select('pseudonyme, niveau, four, petrin')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPseudonyme(data.pseudonyme || "");
        setNiveau(data.niveau || "");
        setFour(data.four || "");
        setPetrin(data.petrin || "");
      }

      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(`${user.id}`);

      if (publicUrl) {
        setAvatarUrl(publicUrl);
      }

    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement du profil");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from('utilisateurs')
        .update({ 
          pseudonyme,
          niveau,
          four,
          petrin
        })
        .eq('id', user.id);

      if (error) throw error;
      setIsEditing(false);
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du profil");
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Vous devez sélectionner une image");
      }

      const file = event.target.files[0];
      const filePath = `${user.id}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (publicUrl) {
        setAvatarUrl(publicUrl);
        toast.success("Photo de profil mise à jour");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du téléchargement de l'image");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate">
        <div className="text-cream animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate">
      <Sidebar />
      <div className="flex-1 px-4 md:px-8 pt-8 pb-20 md:ml-64 overflow-x-hidden">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* En-tête du profil */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative mt-16 md:mt-0">
              <Avatar className="w-32 h-32 border-4 border-basil shadow-lg">
                <AvatarImage src={avatarUrl || undefined} alt="Photo de profil" />
                <AvatarFallback className="bg-cream text-basil/30">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar" className="absolute -bottom-2 -right-2 cursor-pointer">
                <div className="bg-basil rounded-full p-2 hover:bg-basil/90 transition-colors">
                  <Camera className="h-5 w-5 text-slate" />
                </div>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                  className="hidden"
                />
              </Label>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold font-montserrat text-cream">Mon Profil</h1>
              <p className="text-cream/60 mt-1">Gérez vos informations personnelles</p>
            </div>
          </div>

          {/* Grille d'informations */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-8 space-y-6 border border-cream/5">
            <div className="flex justify-end">
              <Button
                onClick={() => isEditing ? updateProfile() : setIsEditing(true)}
                variant="ghost"
                className="text-cream hover:text-basil"
              >
                {isEditing ? (
                  <><Check className="h-5 w-5 mr-2" /> Enregistrer</>
                ) : (
                  <><Pencil className="h-5 w-5 mr-2" /> Modifier</>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pseudo */}
              <div className="space-y-2">
                <Label htmlFor="pseudonyme" className="text-sm font-medium text-cream">
                  Pseudonyme
                </Label>
                <div className="relative">
                  <Input
                    id="pseudonyme"
                    type="text"
                    value={pseudonyme}
                    onChange={(e) => setPseudonyme(e.target.value)}
                    disabled={!isEditing}
                    className="bg-slate-700 border-cream/10 text-cream placeholder:text-cream/40 disabled:opacity-50"
                    placeholder="Votre pseudonyme"
                  />
                </div>
              </div>

              {/* Niveau */}
              <div className="space-y-2">
                <Label htmlFor="niveau" className="text-sm font-medium text-cream">
                  Niveau
                </Label>
                <Select 
                  value={niveau} 
                  onValueChange={setNiveau}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-slate-700 border-cream/10 text-cream disabled:opacity-50">
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="confirme">Confirmé</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Four */}
              <div className="space-y-2">
                <Label htmlFor="four" className="text-sm font-medium text-cream">
                  Four
                </Label>
                <Input
                  id="four"
                  type="text"
                  value={four}
                  onChange={(e) => setFour(e.target.value)}
                  disabled={!isEditing}
                  className="bg-slate-700 border-cream/10 text-cream placeholder:text-cream/40 disabled:opacity-50"
                  placeholder="Votre four"
                />
              </div>

              {/* Pétrin */}
              <div className="space-y-2">
                <Label htmlFor="petrin" className="text-sm font-medium text-cream">
                  Pétrin
                </Label>
                <Select 
                  value={petrin} 
                  onValueChange={setPetrin}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-slate-700 border-cream/10 text-cream disabled:opacity-50">
                    <SelectValue placeholder="Sélectionnez votre pétrin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans</SelectItem>
                    <SelectItem value="domestic">Domestic</SelectItem>
                    <SelectItem value="semi-pro">Semi Pro</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
