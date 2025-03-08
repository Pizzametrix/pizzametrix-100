
import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SEOMetadata } from "@/components/landing/SEOMetadata";

export default function TermsFr() {
  return (
    <div className="min-h-screen flex flex-col bg-[#2C2C2C]">
      <Helmet>
        <title>Conditions d'Utilisation - Pizzametrix</title>
        <meta name="description" content="Conditions d'utilisation de Pizzametrix. Lisez nos termes et conditions pour l'utilisation de notre application de calcul de pâte à pizza." />
      </Helmet>
      <Header />
      <SEOMetadata />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-montserrat font-bold text-[#F5E9D7] mb-8">Conditions d'Utilisation</h1>
          
          <p className="text-[#F5E9D7]/90 mb-6">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">1. Acceptation des Conditions</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            En accédant ou en utilisant Pizzametrix, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord avec une partie des conditions, vous ne pouvez pas accéder au service.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">2. Description du Service</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Pizzametrix est une application web conçue pour aider les utilisateurs à calculer et gérer des recettes de pâte à pizza. Nous fournissons des outils pour le calcul, le stockage et la gestion des recettes.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">3. Comptes Utilisateurs</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Lorsque vous créez un compte chez nous, vous devez fournir des informations précises et complètes. Vous êtes responsable de la protection de votre mot de passe et de toutes les activités qui se produisent sous votre compte.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">4. Contenu Utilisateur</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Notre service vous permet de publier, sauvegarder et partager des recettes. Vous conservez tous les droits sur votre contenu, mais nous accordez une licence pour utiliser, reproduire et afficher ce contenu afin de fournir le service.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">5. Propriété Intellectuelle</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Le service et son contenu original, ses fonctionnalités et sa fonctionnalité appartiennent à Pizzametrix et sont protégés par les lois internationales sur le droit d'auteur, les marques et autres lois sur la propriété intellectuelle.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">6. Résiliation</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous pouvons résilier ou suspendre votre compte immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris la violation de ces Conditions.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">7. Limitation de Responsabilité</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            En aucun cas, Pizzametrix ne sera responsable de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris la perte de profits, de données ou de clientèle.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">8. Modifications des Conditions</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous nous réservons le droit de modifier ou de remplacer ces Conditions à tout moment. En continuant à accéder ou à utiliser notre service après que ces révisions sont entrées en vigueur, vous acceptez d'être lié par les conditions révisées.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">9. Nous Contacter</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Si vous avez des questions concernant ces Conditions, veuillez nous contacter à support@pizzametrix.com.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
