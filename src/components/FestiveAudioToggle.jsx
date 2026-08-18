import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, ChevronUp } from 'lucide-react';

const TRACKS = [
  {
    id: 'flute-1',
    name: 'Krishna Flute Raga',
    src: '/audio/krasnoshchok-krishna-flute-hindu-music-450217.mp3',
  },
  {
    id: 'flute-2',
    name: 'Kanha Ki Bansuri',
    src: '/audio/poorartistt-kanha-ki-bansuri-braj-krishna-bhajan-in-hindi-585862.mp3',
  },
  {
    id: 'default',
    name: 'Festive Flute',
    src: '/audio/festive_flute.mp3',
  }
];

export default function FestiveAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioElemRef = useRef(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const stopAudio = () => {
    if (audioElemRef.current) {
      audioElemRef.current.pause();
      audioElemRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const startAudio = () => {
    if (audioElemRef.current) {
      audioElemRef.current.volume = 0.55;
      const playPromise = audioElemRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Audio playback waiting for user interaction', err);
            setIsPlaying(false);
          });
      }
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
    setTimeout(() => {
      if (audioElemRef.current) {
        audioElemRef.current.src = TRACKS[index].src;
        audioElemRef.current.load();
        startAudio();
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="festive-audio-widget" aria-label="Festive Ambient Music Controller">
      {/* HTML5 Audio with zero preload so it causes ZERO website lag */}
      <audio
        ref={audioElemRef}
        src={currentTrack.src}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          // If first file fails, fallback to second file
          if (currentTrackIndex === 0) {
            setCurrentTrackIndex(1);
          }
        }}
      />

      {/* Playlist Popover (If user wants to switch between the 2 tracks) */}
      {showPlaylist && (
        <div className="audio-playlist-menu">
          <div className="playlist-title">Select Divine Track</div>
          {TRACKS.slice(0, 2).map((t, idx) => (
            <button
              key={t.id}
              className={`playlist-item-btn ${currentTrackIndex === idx ? 'active' : ''}`}
              onClick={() => handleSelectTrack(idx)}
            >
              <Music size={13} />
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="audio-pill-group">
        <button
          type="button"
          className={`audio-toggle-pill ${isPlaying ? 'playing' : ''}`}
          onClick={toggleAudio}
          title={isPlaying ? 'Pause Divine Flute Music' : 'Play Krishna Bansuri Flute'}
        >
          <span className="audio-icon-wrap">
            {isPlaying ? (
              <Volume2 size={16} className="speaker-icon sound-active" />
            ) : (
              <VolumeX size={16} className="speaker-icon" />
            )}
          </span>

          <span className="audio-label">
            {isPlaying ? (
              <>
                <span className="equalizer-bars" aria-hidden="true">
                  <span className="bar b1"></span>
                  <span className="bar b2"></span>
                  <span className="bar b3"></span>
                </span>
                <span>{currentTrack.name}</span>
              </>
            ) : (
              <>
                <Music size={13} className="mini-note" />
                <span>Bansuri Music</span>
              </>
            )}
          </span>
        </button>

        {/* Mini Track Switcher Button */}
        <button
          type="button"
          className="audio-track-switch-btn"
          onClick={() => setShowPlaylist(!showPlaylist)}
          title="Switch Flute Track"
        >
          <ChevronUp size={14} className={showPlaylist ? 'rotate-down' : ''} />
        </button>
      </div>
    </div>
  );
}
