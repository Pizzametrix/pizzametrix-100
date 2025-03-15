
import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SEOMetadata } from "@/components/landing/SEOMetadata";

export default function PrivacyFr() {
  return (
    <div className="min-h-screen flex flex-col bg-[#2C2C2C] animate-fadeIn">
      <Helmet>
        <title>Politique de Confidentialité - Pizzametrix</title>
        <meta name="description" content="Politique de confidentialité de Pizzametrix. Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles." />
        <style>{`
          html, body { 
            background-color: #2C2C2C !important;
            min-height: 100%; 
          }
        `}</style>
      </Helmet>
      <Header />
      <SEOMetadata />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-montserrat font-bold text-[#F5E9D7] mb-8">Politique de Confidentialité</h1>
          
          <p className="text-[#F5E9D7]/90 mb-6">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">1. Introduction</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Chez Pizzametrix, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre application.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">2. Informations que Nous Collectons</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous collectons les types d'informations suivants :
          </p>
          <ul className="list-disc pl-6 text-[#F5E9D7]/90 mb-4">
            <li className="mb-2">Informations de compte : adresse e-mail, mot de passe et détails du profil</li>
            <li className="mb-2">Données de recettes : recettes que vous créez et enregistrez à l'aide de notre application</li>
            <li className="mb-2">Données d'utilisation : comment vous interagissez avec notre application</li>
            <li className="mb-2">Données techniques : adresse IP, type de navigateur, informations sur l'appareil</li>
          </ul>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">3. Comment Nous Utilisons Vos Informations</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc pl-6 text-[#F5E9D7]/90 mb-4">
            <li className="mb-2">Fournir, maintenir et améliorer nos services</li>
            <li className="mb-2">Traiter et compléter les transactions</li>
            <li className="mb-2">Vous envoyer des avis techniques et des messages d'assistance</li>
            <li className="mb-2">Répondre à vos commentaires et questions</li>
            <li className="mb-2">Comprendre comment les utilisateurs utilisent notre application pour l'améliorer</li>
          </ul>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">4. Cookies et Technologies Similaires</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre application et conserver certaines informations. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">5. Sécurité des Données</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles. Cependant, veuillez noter qu'aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est sécurisée à 100%.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">6. Conservation des Données</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous conserverons vos informations personnelles uniquement aussi longtemps que nécessaire pour atteindre les objectifs décrits dans cette Politique de Confidentialité, et lorsque nous avons des besoins commerciaux légitimes en cours.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">7. Vos Droits de Protection des Données</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Selon votre emplacement, vous pouvez avoir les droits suivants concernant vos données :
          </p>
          <ul className="list-disc pl-6 text-[#F5E9D7]/90 mb-4">
            <li className="mb-2">Droit d'accès à vos données personnelles</li>
            <li className="mb-2">Droit de rectification des données inexactes</li>
            <li className="mb-2">Droit à l'effacement de vos données</li>
            <li className="mb-2">Droit de limiter le traitement de vos données</li>
            <li className="mb-2">Droit à la portabilité des données</li>
            <li className="mb-2">Droit de s'opposer au traitement de vos données</li>
          </ul>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">8. Confidentialité des Enfants</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Notre application n'est pas destinée aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">9. Modifications de cette Politique de Confidentialité</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page et en mettant à jour la date de "Dernière mise à jour".
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">10. Nous Contacter</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter à privacy@pizzametrix.com.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
