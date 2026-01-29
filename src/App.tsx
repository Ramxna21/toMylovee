import { useState, useEffect } from 'react';
import { Heart, Music, Sparkles } from 'lucide-react';
import EnvelopeOpening from './components/EnvelopeOpening';
import HeartAnimation from './components/HeartAnimation';
import HeartMaskedPhoto from './components/HeartMaskedPhoto';
import LetterByLetter from './components/LetterByLetter';

type Stage =
  | 'envelope'
  | 'introduction'
  | 'story'
  | 'playlist'
  | 'reflection'
  | 'confession'
  | 'final';

function App() {
  const [stage, setStage] = useState<Stage>('envelope');
  const [playlistOpened, setPlaylistOpened] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";

  const photos = [
    'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  const songs = [
    { letter: 'I', song: 'Iris' },
    { letter: 'L', song: 'Love Story' },
    { letter: 'O', song: 'Only You' },
    { letter: 'V', song: 'Vision of Love' },
    { letter: 'E', song: 'Everything' },
    { letter: 'Y', song: 'You' },
    { letter: 'O', song: 'On & On' },
    { letter: 'U', song: 'Until You' },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  useEffect(() => {
    setFadeIn(true);
  }, [stage]);

  useEffect(() => {
    if (playlistOpened) {
      const timer = setTimeout(() => {
        setStage('reflection');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [playlistOpened]);

  const handleOpenPlaylist = () => {
    window.open(SPOTIFY_PLAYLIST_URL, '_blank');
    setPlaylistOpened(true);
  };

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (noClickCount < 4) {
      e.preventDefault();
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 150;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      setNoButtonPosition({ x: randomX, y: randomY });
      setNoClickCount(prev => prev + 1);
    } else {
      setShowNoMessage(true);
    }
  };

  const handleYesClick = () => {
    setStage('confession');
  };

  const renderEnvelope = () => (
    <EnvelopeOpening onOpenComplete={() => setStage('introduction')} />
  );

  const renderIntroduction = () => (
    <div className={`min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center p-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center max-w-3xl">
        <Sparkles className="w-16 h-16 mx-auto text-pink-400 mb-8 animate-pulse" />
        <h1 className="text-3xl md:text-5xl font-light text-pink-900 mb-8 leading-relaxed">
          Halo! 👋
        </h1>
        <p className="text-xl md:text-2xl text-pink-700 mb-6 leading-relaxed">
          Sebelum kita mulai, izinkan aku memperkenalkan diriku dengan cara yang sedikit berbeda...
        </p>
        <p className="text-lg md:text-xl text-pink-600 mb-12 leading-relaxed italic">
          Aku adalah seseorang yang percaya bahwa setiap momen berharga layak untuk diabadikan dan dirayakan dengan cara yang special.
        </p>
        <button
          onClick={() => setStage('story')}
          className="px-10 py-5 bg-pink-400 hover:bg-pink-500 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-lg"
        >
          Ceritakan lebih lanjut...
        </button>
      </div>
    </div>
  );

  const renderStory = () => (
    <div className={`min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-pink-100 flex items-center justify-center p-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-light text-pink-900 mb-12">
          Moment pertama kali...
        </h2>

        <div className="mb-12 relative inline-block">
          <HeartMaskedPhoto photos={photos} interval={3000} />
          <div className="floating-hearts">
            {[...Array(8)].map((_, i) => (
              <Heart
                key={i}
                className="floating-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <p className="text-xl md:text-2xl text-pink-700 leading-relaxed">
            Saat pertama kali melihatmu, ada sesuatu yang berbeda...
          </p>
          <p className="text-xl md:text-2xl text-pink-700 leading-relaxed">
            Senyummu membuat dunia terasa lebih cerah
          </p>
          <p className="text-xl md:text-2xl text-pink-700 leading-relaxed">
            Dan sejak saat itu, aku tahu ada sesuatu yang special tentangmu
          </p>
        </div>

        <button
          onClick={() => setStage('playlist')}
          className="px-10 py-5 bg-pink-400 hover:bg-pink-500 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-lg"
        >
          Lanjut ♡
        </button>
      </div>
    </div>
  );

  const renderPlaylist = () => (
    <div className={`min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center p-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center max-w-3xl">
        <Music className="w-20 h-20 mx-auto text-pink-400 mb-8 animate-bounce" />
        <h2 className="text-3xl md:text-5xl font-light text-pink-900 mb-6">
          Aku punya sesuatu untukmu...
        </h2>
        <p className="text-lg md:text-xl text-pink-700 mb-8 leading-relaxed">
          Sebuah playlist yang kurangkai khusus dengan penuh makna
        </p>
        <p className="text-md md:text-lg text-pink-600 mb-12 leading-relaxed italic">
          Setiap lagu dipilih dengan hati-hati, karena semuanya mewakili apa yang ingin kusampaikan padamu
        </p>
        <button
          onClick={handleOpenPlaylist}
          className="px-10 py-5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-xl text-lg font-medium"
        >
          🎵 Buka Playlist
        </button>
        {playlistOpened && (
          <p className="mt-8 text-pink-600 animate-pulse">
            Semoga kamu menikmatinya... ♡
          </p>
        )}
      </div>
    </div>
  );

  const renderReflection = () => (
    <div className={`min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-pink-100 flex items-center justify-center p-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center max-w-3xl relative">
        <h2 className="text-3xl md:text-4xl font-light text-pink-900 mb-8 leading-relaxed">
          Setelah mendengarkan playlist tadi...
        </h2>
        <p className="text-2xl md:text-3xl text-pink-700 mb-16 leading-relaxed">
          Kamu juga merasakan hal yang sama?
        </p>

        {!showNoMessage ? (
          <div className="flex gap-6 justify-center items-center flex-wrap">
            <button
              onClick={handleYesClick}
              className="px-10 py-5 bg-pink-400 hover:bg-pink-500 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-lg"
            >
              Yes ♡
            </button>
            <button
              onClick={handleNoClick}
              style={noClickCount > 0 ? {
                position: 'fixed',
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transition: 'all 0.3s ease'
              } : {}}
              className="px-10 py-5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full transition-all duration-300 shadow-lg text-lg"
            >
              No
            </button>
          </div>
        ) : (
          <div className="animate-bounce">
            <p className="text-2xl text-pink-600 mb-6">Eh salah pencet ya? 😊</p>
            <button
              onClick={handleYesClick}
              className="px-10 py-5 bg-pink-400 hover:bg-pink-500 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-lg"
            >
              Oke deh, Yes ♡
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderConfession = () => (
    <div className={`min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center max-w-5xl w-full">
        <HeartAnimation />

        <h2 className="text-3xl md:text-4xl font-light text-pink-900 mb-12 mt-8">
          Setiap lagu mewakili satu huruf...
        </h2>

        <LetterByLetter
          songs={songs}
          onComplete={() => {
            setTimeout(() => setShowMessage(true), 500);
          }}
        />

        {showMessage && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 mb-8 animate-pulse">
              I LOVE YOU
            </div>

            <div className="space-y-6 mb-12 max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl font-light text-pink-900 leading-relaxed">
                I love you, Syifa ❤️
              </p>
              <p className="text-xl md:text-2xl text-pink-700 leading-relaxed">
                Being with you makes me happy
              </p>
              <p className="text-xl md:text-2xl text-pink-800 font-medium leading-relaxed">
                I hope you will always be by my side.
              </p>
              <p className="text-xl md:text-2xl text-pink-800 font-medium leading-relaxed">
                Would you like to be my girlfriend?
              </p>
            </div>

            <button
              onClick={() => setStage('final')}
              className="px-10 py-5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-xl text-lg"
            >
              Lanjut ♡
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderFinal = () => (
    <div className={`min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 flex items-center justify-center p-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center max-w-4xl">
        <div className="mb-12 relative inline-block">
          <HeartMaskedPhoto photos={photos} interval={3000} className="mx-auto" />
          <div className="floating-hearts">
            {[...Array(10)].map((_, i) => (
              <Heart
                key={i}
                className="floating-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-light text-pink-900 leading-relaxed mb-8">
            Terima kasih sudah menjadi bagian dari ceritaku ♡
          </h2>
          <p className="text-xl md:text-2xl text-pink-700 leading-relaxed">
            Aku tidak meminta jawaban sekarang...
          </p>
          <p className="text-xl md:text-2xl text-pink-700 leading-relaxed">
            Yang penting kamu tahu apa yang kurasakan
          </p>
          <p className="text-2xl md:text-3xl text-pink-800 mt-8 font-light">
            Dan bahwa perasaan ini tulus dari hati
          </p>
        </div>
      </div>
    </div>
  );

  const stages = {
    envelope: renderEnvelope,
    introduction: renderIntroduction,
    story: renderStory,
    playlist: renderPlaylist,
    reflection: renderReflection,
    confession: renderConfession,
    final: renderFinal,
  };

  return stages[stage]();
}

export default App;
