export interface Book {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  internalUrl?: string;
  gradient: string;
  icon: string;
}

export const books: Book[] = [
  {
    id: "bhagavad-gita",
    title: "Bhagavad Gita",
    description: "leven, plicht, Krishna's pep-talk",
    downloadUrl: "https://archive.org/details/SrimadBhagavadGitaSanskritHindiEnglish",
    gradient: "from-orange-500 to-pink-500",
    icon: "flame"
  },
  {
    id: "ramayana",
    title: "Ramayana",
    description: "Rama's avontuur, liefde, apenleger",
    downloadUrl: "https://archive.org/details/valmiki-ramayana-gita-press-english",
    gradient: "from-blue-500 to-cyan-500",
    icon: "bow"
  },
  {
    id: "upanishaden",
    title: "Upanishaden",
    description: "wat ben jij nou eigenlijk?",
    downloadUrl: "https://www.gita-society.com/wp-content/uploads/PDF/108upanishads.pdf",
    gradient: "from-purple-500 to-indigo-500",
    icon: "sparkles"
  },
  {
    id: "mahabharata",
    title: "Mahabharata",
    description: "oorlog, familie, karma-drama",
    downloadUrl: "https://archive.org/details/TheMahabharataOfKrishna-dwaipayanaVyasa",
    gradient: "from-red-500 to-yellow-500",
    icon: "swords"
  }
];
