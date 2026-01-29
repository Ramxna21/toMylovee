import { useState } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeOpeningProps {
  onOpenComplete: () => void;
}

export default function EnvelopeOpening({ onOpenComplete }: EnvelopeOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    if (!isOpening && !isOpened) {
      setIsOpening(true);
      setTimeout(() => {
        setIsOpened(true);
        setTimeout(() => {
          onOpenComplete();
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300/20 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div
          className={`envelope-container ${isOpening ? 'opening' : ''} ${isOpened ? 'opened' : ''}`}
          onClick={handleClick}
        >
          <div className="envelope-wrapper">
            <div className="envelope-flap-top"></div>
            <div className="envelope-body">
              <div className="envelope-seal">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="letter">
              <div className="letter-content">
                <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-light text-pink-900 mb-2">Untuk Kamu...</h2>
                <p className="text-pink-700">Ada yang ingin kusampaikan</p>
              </div>
            </div>
          </div>
        </div>

        {!isOpening && !isOpened && (
          <p className="text-center mt-8 text-pink-700 text-lg animate-pulse">
            Klik surat untuk membuka...
          </p>
        )}
      </div>
    </div>
  );
}
