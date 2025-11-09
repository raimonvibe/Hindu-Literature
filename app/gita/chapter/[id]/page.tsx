import { getChapter, getVerse } from "@/lib/gita-api";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { GitaCommentaryAuthor } from "@/lib/api-types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const chapterNumber = parseInt(id);
  const chapter = await getChapter(chapterNumber);

  return {
    title: `${chapter.translation} - Hoofdstuk ${chapterNumber} | Bhagavad Gita`,
    description: chapter.meaning.en || chapter.summary.en?.substring(0, 155),
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { id } = await params;
  const chapterNumber = parseInt(id);

  // Fetch chapter to get total verse count
  const chapter = await getChapter(chapterNumber);

  // Fetch all verses for this chapter
  const versePromises = Array.from(
    { length: chapter.verses_count },
    (_, i) => getVerse(chapterNumber, i + 1)
  );
  const verses = await Promise.all(versePromises);

  // Helper function to extract commentaries from verse
  const getCommentaries = (verse: typeof verses[0]): GitaCommentaryAuthor[] => {
    const commentaries: GitaCommentaryAuthor[] = [];

    for (const key in verse) {
      if (typeof verse[key] === 'object' && verse[key] !== null && 'author' in (verse[key] as object)) {
        commentaries.push(verse[key] as GitaCommentaryAuthor);
      }
    }

    return commentaries;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/gita"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Terug naar hoofdstukken</span>
        </Link>

        {/* Chapter Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
          </div>

          <div className="mb-4">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-medium mb-4">
              Hoofdstuk {chapter.chapter_number}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            {chapter.translation}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2 italic">
            {chapter.transliteration}
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {chapter.meaning.en}
          </p>

          {/* Chapter Summary */}
          {chapter.summary.en && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-8">
              <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Samenvatting
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {chapter.summary.en}
              </p>
            </div>
          )}
        </div>

        {/* Verses */}
        <div className="space-y-8">
          {verses.map((verse) => {
            const commentaries = getCommentaries(verse);

            return (
              <div
                key={verse._id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Verse Number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold text-sm">
                    {verse.verse}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Vers {verse.verse}
                  </span>
                </div>

                {/* Sanskrit Text */}
                <div className="mb-4 p-4 bg-orange-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xl text-gray-900 dark:text-white font-serif leading-relaxed">
                    {verse.slok}
                  </p>
                </div>

                {/* Transliteration */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Transliteratie
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    {verse.transliteration}
                  </p>
                </div>

                {/* Translations */}
                {commentaries.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Vertalingen & Commentaren
                    </h3>
                    <div className="space-y-3">
                      {commentaries.slice(0, 3).map((commentary, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                          {commentary.et && (
                            <>
                              <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-2">
                                {commentary.et}
                              </p>
                              {commentary.ec && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-4 border-l-2 border-orange-300">
                                  {commentary.ec}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                — {commentary.author}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          {chapterNumber > 1 ? (
            <Link
              href={`/gita/chapter/${chapterNumber - 1}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Vorig hoofdstuk</span>
            </Link>
          ) : (
            <div />
          )}

          {chapterNumber < 18 && (
            <Link
              href={`/gita/chapter/${chapterNumber + 1}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              <span>Volgend hoofdstuk</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
