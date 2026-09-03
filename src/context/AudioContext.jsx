import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  
  // Ambient Sound Mixers
  const [ambientType, setAmbientType] = useState('none'); // 'none' | 'bells' | 'river' | 'forest'
  const [ambientVolume, setAmbientVolume] = useState(0.3);

  const audioRef = useRef(null);
  const ambientAudioRef = useRef(null);

  // Initialize main audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';

    const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
    const handleDurationChange = () => setDuration(audioRef.current.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('durationchange', handleDurationChange);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('durationchange', handleDurationChange);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  // Initialize ambient audio element
  useEffect(() => {
    ambientAudioRef.current = new Audio();
    ambientAudioRef.current.loop = true;
    ambientAudioRef.current.volume = ambientVolume;

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
    };
  }, []);

  // Sync main track URL changes
  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;

    const wasPlaying = isPlaying;
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();
    setCurrentTime(0);

    if (wasPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  }, [currentTrack]);

  // Sync main volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sync playing state
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.log("Audio play failed:", e);
        setIsPlaying(false);
      });
      // Start ambient if set
      if (ambientType !== 'none' && ambientAudioRef.current) {
        ambientAudioRef.current.play().catch(e => console.log("Ambient play failed:", e));
      }
    } else {
      audioRef.current.pause();
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle ambient track changes
  useEffect(() => {
    if (!ambientAudioRef.current) return;

    if (ambientType === 'none') {
      ambientAudioRef.current.pause();
      ambientAudioRef.current.src = '';
    } else {
      let ambientUrl = '';
      if (ambientType === 'bells') {
        ambientUrl = 'https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav'; // temple bells vibe
      } else if (ambientType === 'river') {
        ambientUrl = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav'; // river stream vibe
      } else if (ambientType === 'forest') {
        ambientUrl = 'https://assets.mixkit.co/active_storage/sfx/1183/1183-84.wav'; // forest birds/wind vibe
      }

      ambientAudioRef.current.src = ambientUrl;
      ambientAudioRef.current.load();

      if (isPlaying) {
        ambientAudioRef.current.play().catch(e => console.log("Ambient play failed:", e));
      }
    }
  }, [ambientType, isPlaying]);

  // Sync ambient volume
  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = ambientVolume;
    }
  }, [ambientVolume]);

  const selectTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const playPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      setVolume,
      selectTrack,
      playPause,
      seek,
      ambientType,
      setAmbientType,
      ambientVolume,
      setAmbientVolume
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
