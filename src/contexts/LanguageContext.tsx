
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'ht';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.products': 'Products',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.matches': 'Matches',
    'nav.feeds': 'Feeds',
    'nav.profile': 'Profile',
    'nav.wallet': 'Wallet',
    'nav.recent': 'Recent Apps',
    'nav.back': 'Go Back',
    'btn.signin': 'Sign In',
    'btn.signup': 'Sign Up',
    'features.discover': 'Discover what makes us unique',
    'pricing.plans': 'Plans that fit your needs',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.products': 'Productos',
    'nav.features': 'Características',
    'nav.pricing': 'Precios',
    'nav.matches': 'Coincidencias',
    'nav.feeds': 'Feeds',
    'nav.profile': 'Perfil',
    'nav.wallet': 'Billetera',
    'nav.recent': 'Apps Recientes',
    'nav.back': 'Regresar',
    'btn.signin': 'Iniciar Sesión',
    'btn.signup': 'Registrarse',
    'features.discover': 'Descubre lo que nos hace únicos',
    'pricing.plans': 'Planes que se ajustan a tus necesidades',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.products': 'Produits',
    'nav.features': 'Fonctionnalités',
    'nav.pricing': 'Tarifs',
    'nav.matches': 'Correspondances',
    'nav.feeds': 'Flux',
    'nav.profile': 'Profil',
    'nav.wallet': 'Portefeuille',
    'nav.recent': 'Apps Récentes',
    'nav.back': 'Retour',
    'btn.signin': 'Connexion',
    'btn.signup': "S'inscrire",
    'features.discover': 'Découvrez ce qui nous rend uniques',
    'pricing.plans': 'Des forfaits adaptés à vos besoins',
  },
  ht: {
    'nav.home': 'Akèy',
    'nav.about': 'Apropo',
    'nav.contact': 'Kontakte',
    'nav.products': 'Pwodwi yo',
    'nav.features': 'Karakteristik',
    'nav.pricing': 'Pri',
    'nav.matches': 'Match yo',
    'nav.feeds': 'Fil Aktiyalite',
    'nav.profile': 'Pwofil',
    'nav.wallet': 'Bous',
    'nav.recent': 'Dènye Apps yo',
    'nav.back': 'Retounen',
    'btn.signin': 'Konekte',
    'btn.signup': 'Enskri',
    'features.discover': 'Dekouvri sa ki fè nou inik',
    'pricing.plans': 'Plan ki adapte ak bezwen ou yo',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
