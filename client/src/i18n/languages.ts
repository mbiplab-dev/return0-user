// =============================================================================
// FILE: src/i18n/languages.ts
// =============================================================================

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: 'HI' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: 'BN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: 'OR' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: 'AS' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: 'GU' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: 'KN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: 'ML' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: 'MR' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: 'PA' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: 'TA' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: 'TE' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: 'UR', rtl: true },

];

export const getLanguageByCode = (code: string): Language | undefined => {
  return supportedLanguages.find(lang => lang.code === code);
};

export const getLanguageName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language?.nativeName || language?.name || code;
};
