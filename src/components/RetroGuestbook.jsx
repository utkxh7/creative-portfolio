import React, { useState, useEffect } from 'react';

export default function RetroGuestbook() {
  const defaultEntries = [
    { id: 1, name: 'visitor_99', date: '2000-08-19', msg: 'eyes on you... love the warm gel-light glow' },
    { id: 2, name: 'stargazer', date: '2000-08-20', msg: 'monsoon dusk / gotta go. sacred and grungy' },
    { id: 3, name: 'karsh_fan', date: '2000-08-20', msg: 'tuesday. world is crumbling but we stay warm' }
  ];

  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('karsh_guestbook');
      return saved ? JSON.parse(saved) : defaultEntries;
    } catch (e) {
      return defaultEntries;
    }
  });

  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('karsh_guestbook', JSON.stringify(entries));
    } catch (e) {}
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: name.trim().toLowerCase() || 'anonymous_wanderer',
      date: new Date().toISOString().split('T')[0],
      msg: msg.trim().toLowerCase()
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setMsg('');
  };

  return (
    <div className="guestbook-box">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--hot-magenta)' }}>
        [ guestbook.cgi ] — leave your trace in lower-case
      </div>

      <div className="guestbook-entries">
        {entries.map(entry => (
          <div key={entry.id} className="guestbook-card">
            <div className="guestbook-card-header">
              <span>{entry.name}</span>
              <span>{entry.date}</span>
            </div>
            <div className="guestbook-card-msg">
              "{entry.msg}"
            </div>
          </div>
        ))}
      </div>

      <form className="guestbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="guestbook-input"
          placeholder="your handle (e.g. night_wanderer)..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="guestbook-textarea"
          rows="2"
          placeholder="leave a short diary note..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="guestbook-btn">
          SIGN GUESTBOOK
        </button>
      </form>
    </div>
  );
}
