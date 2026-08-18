import React, { memo } from 'react';

function FloatingRakhiBackground() {
  return (
    <div className="floating-rakhi-bg" aria-hidden="true">
      {/* Silk Thread Waves */}
      <div className="silk-thread-wave wave-1" />
      <div className="silk-thread-wave wave-2" />

      {/* Floating Detailed SVG Rakhis */}
      <div className="floating-rakhi-item r1">
        <svg viewBox="0 0 160 160" width="120" height="120" fill="none">
          <path d="M 0 80 Q 40 65, 80 80 Q 120 95, 160 80" stroke="#ff385c" strokeWidth="4" strokeLinecap="round" />
          <path d="M 0 80 Q 40 95, 80 80 Q 120 65, 160 80" stroke="#ffb936" strokeWidth="2" strokeDasharray="4,4" />
          <circle cx="30" cy="77" r="4" fill="#ffd700" />
          <circle cx="50" cy="80" r="5" fill="#ff4d4d" />
          <circle cx="110" cy="80" r="5" fill="#ff4d4d" />
          <circle cx="130" cy="83" r="4" fill="#ffd700" />
          <circle cx="80" cy="80" r="32" fill="rgba(255, 185, 54, 0.15)" />
          <circle cx="80" cy="80" r="28" stroke="#ffb936" strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="80" cy="80" r="22" fill="#9e112d" stroke="#ffd700" strokeWidth="2.5" />
          <circle cx="80" cy="80" r="14" fill="#ffb936" />
          <circle cx="80" cy="80" r="8" fill="#ffd700" stroke="#7a0a1f" strokeWidth="1.5" />
          <circle cx="80" cy="80" r="3" fill="#ffffff" />
        </svg>
      </div>

      <div className="floating-rakhi-item r2">
        <svg viewBox="0 0 160 160" width="90" height="90" fill="none">
          <path d="M 10 80 Q 45 60, 80 80 Q 115 100, 150 80" stroke="#e78216" strokeWidth="3" />
          <circle cx="40" cy="75" r="4" fill="#ffb936" />
          <circle cx="120" cy="85" r="4" fill="#ffb936" />
          <circle cx="80" cy="80" r="24" fill="rgba(255, 215, 0, 0.2)" stroke="#ffb936" strokeWidth="1.5" />
          <circle cx="80" cy="80" r="18" fill="#800c24" stroke="#ffb936" strokeWidth="2" />
          <circle cx="80" cy="80" r="10" fill="#ffb936" />
          <circle cx="80" cy="80" r="4" fill="#ffd700" />
        </svg>
      </div>

      <div className="floating-rakhi-item r3">
        <svg viewBox="0 0 160 160" width="140" height="140" fill="none">
          <path d="M 0 80 Q 40 70, 80 80 Q 120 90, 160 80" stroke="#d91e36" strokeWidth="4" />
          <circle cx="80" cy="80" r="34" fill="rgba(255, 185, 54, 0.1)" stroke="#ffd700" strokeWidth="2" strokeDasharray="4,2" />
          <circle cx="80" cy="80" r="24" fill="#7a0a1f" stroke="#ffb936" strokeWidth="2" />
          <circle cx="80" cy="80" r="15" fill="#ffb936" />
          <circle cx="80" cy="80" r="7" fill="#ffd700" />
        </svg>
      </div>

      <div className="floating-rakhi-item r4">
        <svg viewBox="0 0 160 160" width="100" height="100" fill="none">
          <path d="M 0 80 Q 40 90, 80 80 Q 120 70, 160 80" stroke="#ff9f1c" strokeWidth="3" />
          <circle cx="80" cy="80" r="22" fill="#9e112d" stroke="#ffb936" strokeWidth="2" />
          <circle cx="80" cy="80" r="12" fill="#ffb936" />
          <circle cx="80" cy="80" r="5" fill="#ffffff" />
        </svg>
      </div>

      <div className="floating-rakhi-item r5">
        <svg viewBox="0 0 160 160" width="115" height="115" fill="none">
          <path d="M 0 80 Q 40 65, 80 80 Q 120 95, 160 80" stroke="#ff385c" strokeWidth="3.5" />
          <circle cx="80" cy="80" r="28" fill="rgba(255, 185, 54, 0.15)" stroke="#ffd700" strokeWidth="2" />
          <circle cx="80" cy="80" r="20" fill="#800c24" stroke="#ffb936" strokeWidth="2" />
          <circle cx="80" cy="80" r="11" fill="#ffb936" />
          <circle cx="80" cy="80" r="4" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}

export default memo(FloatingRakhiBackground);
