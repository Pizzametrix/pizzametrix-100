
import { Button } from "@/components/ui/button";
import { Save, Settings } from "lucide-react";

interface ActionButtonsProps {
  onSaveClick: () => void;
  onSettingsClick: () => void;
}

export function ActionButtons({ onSaveClick, onSettingsClick }: ActionButtonsProps) {
  return (
    <div className="fixed bottom-6 right-6 flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-14 w-14 rounded-full bg-terracotta text-cream hover:bg-terracotta/90 shadow-lg"
        onClick={onSaveClick}
      >
        <Save className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-14 w-14 rounded-full bg-terracotta text-cream hover:bg-terracotta/90 shadow-lg"
        onClick={onSettingsClick}
      >
        <Settings className="h-6 w-6" />
      </Button>
    </div>
  );
}
