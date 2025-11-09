import { getAllChapters } from "@/lib/gita-api";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bhagavad Gita - 18 Hoofdstukken | Hindu Literatuur",
  description: "Lees de Bhagavad Gita online: 700 verzen verdeeld over 18 hoofdstukken met vertalingen en commentaren. Krishna's wijsheid aan Arjuna.",
};

export default async function GitaChaptersPage() {
  const chapters = await getAllChapters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Terug naar bibliotheek</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 mb-6 shadow-xl">
            <BookOpen className="w-10 h-10 text-white" strokeWidth={2} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Bhagavad Gita
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            700 verzen verdeeld over 18 hoofdstukken - Krishna's wijsheid aan Arjuna
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/gita/chapter/${chapter.chapter_number}`}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />

              <div className="relative p-6">
                {/* Chapter Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold text-lg shadow">
                    {chapter.chapter_number}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {chapter.verses_count} verzen
                  </span>
                </div>

                {/* Chapter Name */}
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {chapter.translation}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 italic">
                  {chapter.transliteration}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chapter.meaning.en}
                </p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-sm font-medium">
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Lees hoofdstuk →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
