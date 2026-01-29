import { useState, useEffect } from 'react';

interface Song {
  letter: string;
  song: string;
}

interface LetterByLetterProps {
  songs: Song[];
  onComplete: () => void;
}

export default function LetterByLetter({ songs, onComplete }: LetterByLetterProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (currentIndex < songs.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentIndex === songs.length - 1) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, songs.length, onComplete]);

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 max-w-4xl mx-auto">
      {songs.map((item, idx) => (
        <div
          key={idx}
          className={`bg-white/70 backdrop-blur p-4 md:p-6 rounded-2xl shadow-lg transition-all duration-500 ${
            idx <= currentIndex
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-50 translate-y-10'
          }`}
        >
          <div className="text-4xl md:text-5xl font-bold text-pink-500 mb-2">{item.letter}</div>
          <div className="text-xs md:text-sm text-pink-700">{item.song}</div>
        </div>
      ))}
    </div>
  );
}
