// Mapping des descriptions en français vers leurs traductions
export const descriptionTranslations = {
  // Toyota Corolla
  "La Toyota Corolla est une berline compacte fiable et économique": {
    en: "The Toyota Corolla is a reliable and economical compact sedan",
    de: "Der Toyota Corolla ist eine zuverlässige und wirtschaftliche Kompaktlimousine"
  },
  // Mercedes Class C
  "La Mercedes Classe C incarne l'élégance et le luxe à l'allemande": {
    en: "The Mercedes C-Class embodies German elegance and luxury",
    de: "Die Mercedes C-Klasse verkörpert deutsche Eleganz und Luxus"
  },
  // Range Rover
  "Le Range Rover est un SUV de luxe offrant confort et performances": {
    en: "The Range Rover is a luxury SUV offering comfort and performance",
    de: "Der Range Rover ist ein Luxus-SUV, der Komfort und Leistung bietet"
  },
  // Toyota Hilux
  "Le Toyota Hilux est un pickup robuste et fiable": {
    en: "The Toyota Hilux is a robust and reliable pickup truck",
    de: "Der Toyota Hilux ist ein robuster und zuverlässiger Pickup-Truck"
  },
  // Descriptions spécifiques des voitures
  "La Toyota Corolla 2024 est une berline compacte qui allie style moderne et efficacité. Dotée d'un moteur économique et d'équipements de sécurité avancés, elle offre une expérience de conduite confortable et fiable. Parfaite pour les déplacements quotidiens et les longs trajets.": {
    en: "The 2024 Toyota Corolla is a compact sedan that combines modern style and efficiency. Equipped with an economical engine and advanced safety features, it offers a comfortable and reliable driving experience. Perfect for daily commuting and long trips.",
    de: "Der Toyota Corolla 2024 ist eine Kompaktlimousine, die modernen Stil und Effizienz vereint. Ausgestattet mit einem sparsamen Motor und fortschrittlichen Sicherheitsfunktionen bietet er ein komfortables und zuverlässiges Fahrerlebnis. Perfekt für den täglichen Pendelverkehr und lange Fahrten."
  },
  "La Mercedes-Benz Classe C 2024 incarne le luxe et l'innovation. Son design sophistiqué, son intérieur raffiné et ses technologies de pointe en font une berline premium exceptionnelle. Profitez d'une conduite dynamique et d'un confort inégalé.": {
    en: "The 2024 Mercedes-Benz C-Class embodies luxury and innovation. Its sophisticated design, refined interior, and cutting-edge technologies make it an exceptional premium sedan. Enjoy dynamic driving and unmatched comfort.",
    de: "Die Mercedes-Benz C-Klasse 2024 verkörpert Luxus und Innovation. Ihr anspruchsvolles Design, der raffinierte Innenraum und modernste Technologien machen sie zu einer außergewöhnlichen Premium-Limousine. Genießen Sie dynamisches Fahren und unvergleichlichen Komfort."
  },
  "Le Range Rover Sport 2024 redéfinit le SUV de luxe. Avec sa présence imposante, ses capacités tout-terrain exceptionnelles et son intérieur somptueux, il offre une expérience de conduite unique. Technologies avancées et confort premium pour tous vos voyages.": {
    en: "The 2024 Range Rover Sport redefines the luxury SUV. With its commanding presence, exceptional off-road capabilities, and sumptuous interior, it offers a unique driving experience. Advanced technologies and premium comfort for all your journeys.",
    de: "Der Range Rover Sport 2024 definiert den Luxus-SUV neu. Mit seiner beeindruckenden Präsenz, außergewöhnlichen Geländegängigkeit und luxuriösen Innenausstattung bietet er ein einzigartiges Fahrerlebnis. Fortschrittliche Technologien und Premium-Komfort für alle Ihre Reisen."
  },
  "Le Toyota Hilux 2024 est le pickup robuste par excellence. Conçu pour affronter les terrains les plus difficiles, il combine puissance, fiabilité et confort. Idéal pour les professionnels et les aventuriers, avec une capacité de chargement impressionnante.": {
    en: "The 2024 Toyota Hilux is the ultimate robust pickup truck. Designed to tackle the toughest terrain, it combines power, reliability, and comfort. Ideal for professionals and adventurers, with impressive loading capacity.",
    de: "Der Toyota Hilux 2024 ist der ultimative robuste Pickup-Truck. Entwickelt für das schwierigste Gelände, vereint er Kraft, Zuverlässigkeit und Komfort. Ideal für Profis und Abenteurer, mit beeindruckender Ladekapazität."
  },
  "Le Hyundai Tucson 2024 est un SUV moderne et polyvalent. Son design distinctif, ses technologies innovantes et son espace généreux en font un choix parfait pour les familles. Profitez d'une conduite confortable et sécurisée.": {
    en: "The 2024 Hyundai Tucson is a modern and versatile SUV. Its distinctive design, innovative technologies, and generous space make it a perfect choice for families. Enjoy comfortable and secure driving.",
    de: "Der Hyundai Tucson 2024 ist ein moderner und vielseitiger SUV. Sein markantes Design, innovative Technologien und großzügiger Platz machen ihn zur perfekten Wahl für Familien. Genießen Sie komfortables und sicheres Fahren."
  },
  "La Honda Civic 2024 représente l'équilibre parfait entre sportivité et praticité. Son design dynamique, son intérieur ergonomique et ses performances impressionnantes en font une berline compacte exceptionnelle. Idéale pour la ville et les escapades.": {
    en: "The 2024 Honda Civic represents the perfect balance between sportiness and practicality. Its dynamic design, ergonomic interior, and impressive performance make it an exceptional compact sedan. Ideal for city driving and getaways.",
    de: "Der Honda Civic 2024 stellt die perfekte Balance zwischen Sportlichkeit und Praktikabilität dar. Sein dynamisches Design, ergonomischer Innenraum und beeindruckende Leistung machen ihn zu einer außergewöhnlichen Kompaktlimousine. Ideal für Stadtfahrten und Ausflüge."
  }
};

/**
 * Traduit une description de voiture dans la langue spécifiée
 * @param {string} originalDescription - Description originale en français
 * @param {string} targetLanguage - Code de langue cible (en, fr, de)
 * @returns {string} Description traduite ou description originale si pas de traduction
 */
export const translateDescription = (originalDescription, targetLanguage) => {
  if (targetLanguage === 'fr') return originalDescription;
  
  const translations = descriptionTranslations[originalDescription];
  if (!translations) {
    console.log('No translation found for:', originalDescription);
    return originalDescription;
  }
  
  return translations[targetLanguage] || originalDescription;
};
