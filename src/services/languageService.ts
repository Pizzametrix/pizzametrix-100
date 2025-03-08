
/**
 * Service pour gérer la détection et le stockage de la langue préférée
 */

// Langues supportées
export type SupportedLanguage = 'en' | 'fr' | 'it';

// Clé pour stocker la préférence de langue dans le localStorage
const LANGUAGE_PREFERENCE_KEY = 'pizzametrix_language_preference';

/**
 * Détecte la langue préférée de l'utilisateur
 * Ordre de priorité: 
 * 1. Préférence stockée
 * 2. Langue du navigateur
 * 3. Par défaut: 'en'
 */
export const detectPreferredLanguage = (): SupportedLanguage => {
  // Vérifier si une préférence est déjà stockée
  const storedPreference = localStorage.getItem(LANGUAGE_PREFERENCE_KEY) as SupportedLanguage | null;
  if (storedPreference && isSupportedLanguage(storedPreference)) {
    return storedPreference;
  }

  // Détecter la langue du navigateur
  const browserLanguage = navigator.language.split('-')[0]; // ex: fr-FR -> fr
  
  if (isSupportedLanguage(browserLanguage as SupportedLanguage)) {
    return browserLanguage as SupportedLanguage;
  }
  
  // Langue par défaut
  return 'en';
};

/**
 * Vérifie si la langue est supportée
 */
export const isSupportedLanguage = (language: string): language is SupportedLanguage => {
  return ['en', 'fr', 'it'].includes(language);
};

/**
 * Sauvegarde la préférence de langue
 */
export const saveLanguagePreference = (language: SupportedLanguage): void => {
  localStorage.setItem(LANGUAGE_PREFERENCE_KEY, language);
};

/**
 * Obtient l'URL de base pour une langue donnée
 */
export const getLanguageUrl = (language: SupportedLanguage): string => {
  if (language === 'en') {
    return '/'; // La version anglaise est à la racine
  }
  return `/${language}`; // Les autres langues sont dans leur propre route
};

/**
 * Redirige vers la version correcte du site en fonction de la langue
 */
export const redirectToLanguage = (language: SupportedLanguage): void => {
  const targetUrl = getLanguageUrl(language);
  
  // Ne rediriger que si l'URL actuelle ne correspond pas à la langue
  const currentPath = window.location.pathname;
  
  if (language === 'en' && (currentPath === '/' || currentPath === '/en')) {
    return; // Déjà sur la page d'accueil anglaise
  }
  
  if (language !== 'en' && currentPath.startsWith(`/${language}`)) {
    return; // Déjà sur la bonne page pour cette langue
  }
  
  // Rediriger vers la bonne URL
  window.location.href = targetUrl;
};
