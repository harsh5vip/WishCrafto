import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 'flute-1',
    name: 'Krishna Flute Raga',
    shortName: '1',
    src: '/audio/krasnoshchok-krishna-flute-hindu-music-450217.mp3',
  },
  {
    id: 'flute-2',
    name: 'Kanha Ki Bansuri',
    shortName: '2',
    src: '/audio/poorartistt-kanha-ki-bansuri-braj-krishna-bhajan-in-hindi-585862.mp3',
  }
];

export default function FestiveAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioElemRef = useRef(null);

  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0];

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
    if (currentTrackIndex === index && isPlaying) {
      stopAudio();
      return;
    }
    setCurrentTrackIndex(index);
    setTimeout(() => {
      if (audioElemRef.current) {
        audioElemRef.current.src = TRACKS[index].src;
        audioElemRef.current.load();
        startAudio();
      }
    }, 40);
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="festive-audio-widget purple-audio-theme" aria-label="Krishna Bansuri Flute Music">
      <audio
        ref={audioElemRef}
        src={currentTrack.src}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          if (currentTrackIndex === 0) {
            setCurrentTrackIndex(1);
          }
        }}
      />

      <div className="audio-purple-cluster">
        {/* Main Speaker / Play-Pause Icon Button */}
        <button
          type="button"
          className={`audio-speaker-btn ${isPlaying ? 'is-playing' : ''}`}
          onClick={toggleAudio}
          title={isPlaying ? `Pause Divine Flute (${currentTrack.name})` : `Play Divine Flute (${currentTrack.name})`}
          aria-label={isPlaying ? 'Pause Divine Flute' : 'Play Divine Flute'}
        >
          {isPlaying ? (
            <Volume2 size={16} className="speaker-icon sound-active" />
          ) : (
            <VolumeX size={16} className="speaker-icon" />
          )}

          {/* Mini Equalizer Bars when playing */}
          {isPlaying && (
            <span className="equalizer-bars mini-eq" aria-hidden="true">
              <span className="bar b1"></span>
              <span className="bar b2"></span>
              <span className="bar b3"></span>
            </span>
          )}
        </button>

        {/* Track 1 Button */}
        <button
          type="button"
          className={`audio-num-btn ${currentTrackIndex === 0 && isPlaying ? 'active-playing' : (currentTrackIndex === 0 ? 'selected-paused' : '')}`}
          onClick={() => handleSelectTrack(0)}
          title="Track 1: Krishna Flute Raga"
          aria-label="Track 1"
        >
          1
        </button>

        {/* Track 2 Button */}
        <button
          type="button"
          className={`audio-num-btn ${currentTrackIndex === 1 && isPlaying ? 'active-playing' : (currentTrackIndex === 1 ? 'selected-paused' : '')}`}
          onClick={() => handleSelectTrack(1)}
          title="Track 2: Kanha Ki Bansuri"
          aria-label="Track 2"
        >
          2
        </button>
      </div>
    </div>
  );
}
