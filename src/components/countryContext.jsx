import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CountryContext = createContext();
export const ThemeContext = createContext({
  theme: '',
  setTheme: () => {},
});

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <CountryContext.Provider value={{ countries, setCountries, selectedCountry, setSelectedCountry, error, setError, loading, setLoading }}>
      {children}
    </CountryContext.Provider>
  );
};

CountryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
