'use client';

import { Book } from "@/lib/books";
import { Flame, Sparkles, Swords, LucideIcon, Download, BookOpen } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  flame: Flame,
  sparkles: Sparkles,
  swords: Swords,
  bow: Sparkles, // Using Sparkles as alternative for bow
};

const gradientMap: Record<string, string> = {
  "from-orange-500 to-pink-500": "bg-gradient-to-r from-orange-500 to-pink-500",
  "from-blue-500 to-cyan-500": "bg-gradient-to-r from-blue-500 to-cyan-500",
  "from-purple-500 to-indigo-500": "bg-gradient-to-r from-purple-500 to-indigo-500",
  "from-red-500 to-yellow-500": "bg-gradient-to-r from-red-500 to-yellow-500",
};

const gradientBgMap: Record<string, string> = {
  "from-orange-500 to-pink-500": "bg-gradient-to-br from-orange-500 to-pink-500",
  "from-blue-500 to-cyan-500": "bg-gradient-to-br from-blue-500 to-cyan-500",
  "from-purple-500 to-indigo-500": "bg-gradient-to-br from-purple-500 to-indigo-500",
  "from-red-500 to-yellow-500": "bg-gradient-to-br from-red-500 to-yellow-500",
};

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const Icon = iconMap[book.icon] || Sparkles;
  const href = book.internalUrl || book.downloadUrl;
  const isInternal = !!book.internalUrl;
  const gradientClass = gradientMap[book.gradient] || gradientMap["from-orange-500 to-pink-500"];
  const gradientBgClass = gradientBgMap[book.gradient] || gradientBgMap["from-orange-500 to-pink-500"];

  const cardContent = (
    <>
      <div className={`absolute inset-0 ${gradientBgClass} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="relative p-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${gradientBgClass} mb-6 shadow-lg`}>
          <Icon className="w-8 h-8 text-white" strokeWidth={2} />
        </div>

        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
          {book.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
          {book.description}
        </p>

        {isInternal ? (
          <div className="flex flex-col gap-3">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg ${gradientClass} text-white font-semibold text-base shadow-md hover:shadow-lg transition-shadow`}>
              <BookOpen className="w-5 h-5" />
              <span>Lees online →</span>
            </div>
            <a
              href={book.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-base hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </a>
          </div>
        ) : (
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg ${gradientClass} text-white font-semibold text-base shadow-md hover:shadow-lg transition-shadow`}>
            <Download className="w-5 h-5" />
            <span>Download PDF →</span>
          </div>
        )}
      </div>
    </>
  );

  const className = "group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {cardContent}
    </a>
  );
}
