import React, { useState, useEffect } from 'react';
import './Countdown.css';

export default function Countdown() {
  // Target: Raksha Bandhan date (Next upcoming: August 28, 2026)
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-08-28T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section">
      <div className="container">
        <div className="countdown-wrapper glass-panel">
          <span className="countdown-tag">COUNTDOWN TO RAKSHA BANDHAN</span>
          <div className="timer-grid">
            <div className="time-block">
              <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="time-label">Days</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
