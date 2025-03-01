
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full p-4 md:p-6 flex justify-between items-center">
      <div className="text-[#F5E9D7] text-2xl font-montserrat font-bold">Pizzametrix</div>
      <div>
        <Link to="/login">
          <Button variant="secondary" className="mr-2">
            Connexion
          </Button>
        </Link>
        <Link to="/sign-in">
          <Button>Inscription</Button>
        </Link>
      </div>
    </header>
  );
};
