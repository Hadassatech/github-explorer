import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  // Toggle dark mode class on body
  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;