// topbar.js
import { useContext } from 'react';
import '../styles/topbar.scss';
import { CiDark } from 'react-icons/ci';
import { ThemeContext } from './countryContext';

const Topbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="topbar">
      <h3>Where in the world</h3>
      <div className="dam">
        <CiDark className={`starIcon ${theme === 'light' ? 'bgDark' : 'bgLight'}`} onClick={toggleTheme} />
        <h3>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</h3>
      </div>
    </div>
  );
};

export default Topbar;
