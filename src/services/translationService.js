// Clé API DeepL (à remplacer par votre clé)
const DEEPL_API_KEY = 'your-api-key';

/**
 * Traduit un texte vers la langue cible en utilisant DeepL
 * @param {string} text - Texte à traduire
 * @param {string} targetLang - Langue cible (EN, DE)
 * @returns {Promise<string>} - Texte traduit
 */
export const translateText = async (text, targetLang) => {
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang.toUpperCase(),
        source_lang: 'FR'
      })
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Retourne le texte original en cas d'erreur
  }
};

// Cache pour stocker les traductions déjà effectuées
const translationCache = new Map();

/**
 * Traduit un texte avec cache pour éviter les appels API répétés
 * @param {string} text - Texte à traduire
 * @param {string} targetLang - Langue cible (en, de, fr)
 * @returns {Promise<string>} - Texte traduit
 */
export const translateWithCache = async (text, targetLang) => {
  // Si la langue cible est le français, retourner le texte original
  if (targetLang === 'fr') {
    return text;
  }

  // Créer une clé unique pour le cache
  const cacheKey = `${text}_${targetLang}`;

  // Vérifier si la traduction est dans le cache
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // Effectuer la traduction
  const translatedText = await translateText(text, targetLang);

  // Stocker dans le cache
  translationCache.set(cacheKey, translatedText);

  return translatedText;
};
