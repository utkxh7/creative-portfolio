import React, { useState, useEffect, useRef } from 'react';

export default function RetroAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState('monsoon lo-fi');
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);
  const eqIntervalRef = useRef(null);
  const [eqHeights, setEqHeights] = useState([30, 60, 45, 80, 50, 70, 40]);

  const presets = [
    { id: 'monsoon lo-fi', label: 'monsoon lo-fi', freq: 196.0 }, // G3
    { id: 'gel-light night', label: 'gel-light night', freq: 220.0 }, // A3
    { id: 'bedroom tape', label: 'bedroom tape', freq: 174.61 } // F3
  ];

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const activePreset = presets.find(p => p.id === preset) || presets[0];

      // Oscillator for lo-fi warm synth chord
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(activePreset.freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.log('Web Audio context auto-play prevention or error:', e);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const changePreset = (newPresetId) => {
    setPreset(newPresetId);
    if (isPlaying) {
      stopAudio();
      setTimeout(() => {
        const activePreset = presets.find(p => p.id === newPresetId) || presets[0];
        if (audioCtxRef.current) {
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(activePreset.freq, audioCtxRef.current.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
          oscillatorRef.current = osc;
          gainRef.current = gain;
          setIsPlaying(true);
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      eqIntervalRef.current = setInterval(() => {
        setEqHeights(prev => prev.map(() => Math.floor(Math.random() * 75) + 20));
      }, 150);
    } else {
      clearInterval(eqIntervalRef.current);
      setEqHeights([20, 20, 20, 20, 20, 20, 20]);
    }
    return () => clearInterval(eqIntervalRef.current);
  }, [isPlaying]);

  return (
    <div className="audio-player-box">
      <div className="audio-display">
        <div className="audio-title">
          {isPlaying ? `▶ NOW PLAYING: [${preset}.wav]` : '❚❚ PAUSED: [radio_soundscape]'}
        </div>
        <div className="audio-eq">
          {eqHeights.map((h, idx) => (
            <div
              key={idx}
              className="eq-bar"
              style={{
                height: `${h}%`,
                backgroundColor: idx % 2 === 0 ? 'var(--amber)' : 'var(--hot-magenta)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="audio-controls-row">
        <button className={`audio-btn ${isPlaying ? 'active' : ''}`} onClick={togglePlay}>
          {isPlaying ? 'PAUSE SOUND' : 'PLAY SOUND'}
        </button>
      </div>

      <div className="audio-controls-row">
        {presets.map(p => (
          <button
            key={p.id}
            className={`audio-btn ${preset === p.id ? 'active' : ''}`}
            onClick={() => changePreset(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
