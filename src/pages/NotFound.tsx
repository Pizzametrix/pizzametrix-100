
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const location = useLocation();
  const isFrenchVersion = location.pathname.includes('/fr');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2C2C2C]">
      <Helmet>
        <title>{isFrenchVersion ? 'Page non trouvée - Pizzametrix' : 'Page not found - Pizzametrix'}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center p-8">
        <h1 className="text-7xl font-montserrat font-bold text-[#F5E9D7] mb-6">404</h1>
        <p className="text-xl text-[#F5E9D7]/80 mb-8">
          {isFrenchVersion 
            ? "Oups ! Cette page n'existe pas" 
            : "Oops! This page doesn't exist"}
        </p>
        <Link to={isFrenchVersion ? "/fr" : "/"} className="px-6 py-3 bg-[#C53030] text-[#F5E9D7] rounded-lg hover:bg-[#C53030]/90 transition-all">
          {isFrenchVersion ? "Retour à l'accueil" : "Return to Home"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
